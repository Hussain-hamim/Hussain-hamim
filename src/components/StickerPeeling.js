import { useEffect, useRef, useState, useCallback } from 'react';
import { useMotionValue, animate, useMotionValueEvent } from 'framer-motion';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  SkinnedMesh,
  MeshStandardMaterial,
  Texture,
  Vector3,
  Quaternion,
  Bone,
  Skeleton,
  Float32BufferAttribute,
  Uint16BufferAttribute,
  FrontSide,
  RepeatWrapping,
  LinearFilter,
  SRGBColorSpace,
  RGBAFormat,
  Color,
  DirectionalLight,
  AmbientLight,
  PlaneGeometry,
  Mesh,
  Group,
  ShadowMaterial,
  PCFSoftShadowMap,
} from 'three';

const DEFAULT_IMAGE =
  'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/cbf541e7-a558-45e7-11e8-7e63e9d1a800/w=800';

const resolveImageSource = (input) => {
  if (!input) return undefined;
  if (typeof input === 'string') return input.trim() || undefined;
  return input.src || undefined;
};

const CAMERA_DISTANCE = 1200;
const CAMERA_NEAR = 100;
const CAMERA_FAR = 2000;
const STICKER_DEPTH = 0.003;
const CANVAS_SCALE = 4;
const FIXED_CURL_RADIUS = 0.15;
const FIXED_CURL_FACTOR = 0.6;

const _scratchQuat = new Quaternion();
const _scratchRotAxis = new Vector3();

function calculateCameraFov(width, height, distance) {
  const aspect = width / height;
  return 2 * Math.atan(width / aspect / (2 * distance)) * (180 / Math.PI);
}

function mapLinear(value, inMin, inMax, outMin, outMax) {
  if (inMax === inMin) return outMin;
  const t = (value - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

function mapInternalRadiusToUIValue(ui) {
  const clamped = Math.max(0.1, Math.min(1, ui));
  return mapLinear(clamped, 0.1, 1, 0.05, 1 / Math.PI);
}

const cssVariableRegex =
  /var\s*\(\s*(--[\w-]+)(?:\s*,\s*((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*))?\s*\)/;

function extractDefaultValue(cssVar) {
  if (!cssVar || !cssVar.startsWith('var(')) return cssVar;
  const match = cssVariableRegex.exec(cssVar);
  if (!match) return cssVar;
  const fallback = (match[2] || '').trim();
  if (fallback.startsWith('var(')) return extractDefaultValue(fallback);
  return fallback || cssVar;
}

function resolveTokenColor(input) {
  if (typeof input !== 'string') return input;
  if (!input.startsWith('var(')) return input;
  return extractDefaultValue(input);
}

function parseColorToRgba(input) {
  if (!input) return { r: 0, g: 0, b: 0, a: 1 };
  const str = input.trim();
  const rgbaMatch = str.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i
  );
  if (rgbaMatch) {
    return {
      r: Math.max(0, Math.min(255, parseFloat(rgbaMatch[1]))) / 255,
      g: Math.max(0, Math.min(255, parseFloat(rgbaMatch[2]))) / 255,
      b: Math.max(0, Math.min(255, parseFloat(rgbaMatch[3]))) / 255,
      a:
        rgbaMatch[4] !== undefined
          ? Math.max(0, Math.min(1, parseFloat(rgbaMatch[4])))
          : 1,
    };
  }
  const hex = str.replace(/^#/, '');
  if (hex.length === 8) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: parseInt(hex.slice(6, 8), 16) / 255,
    };
  }
  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: 1,
    };
  }
  if (hex.length === 4) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: parseInt(hex[3] + hex[3], 16) / 255,
    };
  }
  if (hex.length === 3) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: 1,
    };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

function makeBackTextureViewConsistent(tex, frontTex) {
  if (!tex) return null;
  const out =
    tex === frontTex && typeof tex.clone === 'function' ? tex.clone() : tex;
  out.wrapS = RepeatWrapping;
  out.repeat.x = -1;
  out.offset.x = 1;
  out.needsUpdate = true;
  return out;
}

/**
 * Sticker peel hover effect adapted from Originkit.
 * @see https://www.originkit.dev/
 */
export default function StickerPeeling(__props) {
  const {
    image,
    imageWidth = 200,
    imageHeight = 200,
    curlRotation = 240,
    hoverPeel = 45,
    pressPeel = 64,
    transition = {
      type: 'tween',
      duration: 0.28,
      ease: 'easeOut',
    },
    backColor = '#000000',
    shadowEnabled = true,
    shadow,
    style,
    boneGridX = 16,
    boneGridY = 16,
    segmentsW = 32,
    segmentsH = 24,
    className = '',
  } = { ...COMPONENT_DEFAULTS, ...__props };

  const curlMode = 'semicircle';
  const shadowCfg = {
    opacity: 30,
    color: '#000000',
    x: -300,
    y: 140,
    ...shadow,
  };
  const castShadowOpacity = shadowEnabled ? shadowCfg.opacity : 0;
  const shadowColor = shadowCfg.color;
  const shadowPositionX = shadowCfg.x;
  const shadowPositionY = shadowCfg.y;

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const groupRef = useRef(null);
  const bonesRef = useRef([]);
  const bonesInitialPositionsRef = useRef([]);
  const loadedImageRef = useRef(null);
  const imageLoadAbortRef = useRef(false);
  const lightRef = useRef(null);
  const ambientLightRef = useRef(null);
  const backgroundPlaneRef = useRef(null);
  const curlRotationRef = useRef(curlRotation);
  const pendingUpdateRef = useRef(false);
  const animationControlsRef = useRef({});
  const isHoveringRef = useRef(false);
  const isPressedRef = useRef(false);
  const lastBuiltSizeRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const renderLoopIdRef = useRef(null);
  const updateBonesRef = useRef(() => {});

  const resolvedImageUrl = resolveImageSource(image) || DEFAULT_IMAGE;
  const hasContent = !!resolvedImageUrl;

  const curlAmountMotion = useMotionValue(0);
  const animatedCurlRef = useRef({ amount: 0 });

  const [textureLoaded, setTextureLoaded] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  const createStickerGeometry = useCallback(
    (width, height, gridX, gridY, segW, segH) => {
      const geometry = new BoxGeometry(
        width,
        height,
        STICKER_DEPTH,
        segW,
        segH,
        1
      );

      const position = geometry.attributes.position;
      const vertex = new Vector3();
      const skinIndexes = [];
      const skinWeights = [];

      for (let i = 0; i < position.count; i++) {
        vertex.fromBufferAttribute(position, i);
        const normalizedX = (vertex.x + width / 2) / width;
        const normalizedY = (vertex.y + height / 2) / height;
        const gridXPos = normalizedX * (gridX - 1);
        const gridYPos = normalizedY * (gridY - 1);
        const x0 = Math.floor(gridXPos);
        const y0 = Math.floor(gridYPos);
        const x1 = Math.min(x0 + 1, gridX - 1);
        const y1 = Math.min(y0 + 1, gridY - 1);
        const tx = gridXPos - x0;
        const ty = gridYPos - y0;

        skinIndexes.push(
          y0 * gridX + x0,
          y0 * gridX + x1,
          y1 * gridX + x0,
          y1 * gridX + x1
        );
        skinWeights.push(
          (1 - tx) * (1 - ty),
          tx * (1 - ty),
          (1 - tx) * ty,
          tx * ty
        );
      }

      geometry.setAttribute(
        'skinIndex',
        new Uint16BufferAttribute(skinIndexes, 4)
      );
      geometry.setAttribute(
        'skinWeight',
        new Float32BufferAttribute(skinWeights, 4)
      );
      geometry.computeVertexNormals();
      return geometry;
    },
    []
  );

  const renderFrame = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    const gl = rendererRef.current.getContext();
    if (!gl || gl.isContextLost()) return;

    if (meshRef.current?.skeleton) {
      meshRef.current.updateMatrixWorld(true);
      meshRef.current.skeleton.bones.forEach((bone) => {
        if (bone && typeof bone.updateMatrixWorld === 'function') {
          bone.updateMatrixWorld(true);
        }
      });
      meshRef.current.skeleton.update();
    }
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, []);

  const startRenderLoop = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    const loop = () => {
      if (!isAnimatingRef.current) return;
      renderFrame();
      renderLoopIdRef.current = requestAnimationFrame(loop);
    };
    renderLoopIdRef.current = requestAnimationFrame(loop);
  }, [renderFrame]);

  const stopRenderLoop = useCallback(() => {
    isAnimatingRef.current = false;
    if (renderLoopIdRef.current !== null) {
      cancelAnimationFrame(renderLoopIdRef.current);
      renderLoopIdRef.current = null;
    }
    requestAnimationFrame(() => renderFrame());
  }, [renderFrame]);

  const createBackTexture = useCallback((img, backColorValue) => {
    const backCanvas = document.createElement('canvas');
    backCanvas.width = img.width;
    backCanvas.height = img.height;
    const backCtx = backCanvas.getContext('2d');
    if (!backCtx) return null;

    const resolved = resolveTokenColor(backColorValue);
    const { r, g, b, a: backA } = parseColorToRgba(resolved);
    const backR = Math.round(r * 255);
    const backG = Math.round(g * 255);
    const backB = Math.round(b * 255);

    backCtx.drawImage(img, 0, 0);
    const imageData = backCtx.getImageData(0, 0, img.width, img.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
      const imgR = imageData.data[i];
      const imgG = imageData.data[i + 1];
      const imgB = imageData.data[i + 2];

      if (backA >= 1) {
        imageData.data[i] = backR;
        imageData.data[i + 1] = backG;
        imageData.data[i + 2] = backB;
      } else if (backA > 0) {
        imageData.data[i] = Math.round(backR * backA + imgR * (1 - backA));
        imageData.data[i + 1] = Math.round(backG * backA + imgG * (1 - backA));
        imageData.data[i + 2] = Math.round(backB * backA + imgB * (1 - backA));
      }
    }

    backCtx.putImageData(imageData, 0, 0);
    const tex = new Texture(backCanvas);
    tex.needsUpdate = true;
    tex.minFilter = LinearFilter;
    tex.colorSpace = SRGBColorSpace;
    tex.format = RGBAFormat;
    return tex;
  }, []);

  const buildMaterials = useCallback((backColorValue) => {
    const resolved = resolveTokenColor(backColorValue);
    const backColorRgba = parseColorToRgba(resolved);
    const frontMaterial = new MeshStandardMaterial({
      color: 0xffffff,
      side: FrontSide,
      transparent: true,
      roughness: 0.2,
      metalness: 0.4,
      emissive: 0xffffff,
      emissiveIntensity: 0.8,
    });
    const backMaterial = new MeshStandardMaterial({
      color: 0xffffff,
      side: FrontSide,
      transparent: true,
      roughness: 0.3,
      metalness: 0,
      emissive: 0xffffff,
      emissiveIntensity: 0.3,
    });
    const sideMaterial = new MeshStandardMaterial({
      color: new Color(backColorRgba.r, backColorRgba.g, backColorRgba.b),
      transparent: true,
      opacity: 1,
      roughness: 0.1,
      metalness: 0,
    });
    return [
      sideMaterial,
      sideMaterial,
      sideMaterial,
      sideMaterial,
      frontMaterial,
      backMaterial,
    ];
  }, []);

  const updateBones = useCallback(() => {
    if (
      !bonesRef.current.length ||
      !meshRef.current ||
      !bonesInitialPositionsRef.current.length
    )
      return;
    if (!meshRef.current.skeleton) return;

    const skeletonBones = meshRef.current.skeleton.bones;
    if (!skeletonBones?.length) return;

    meshRef.current.updateMatrixWorld(true);
    skeletonBones.forEach((bone) => {
      if (bone && typeof bone.updateMatrixWorld === 'function')
        bone.updateMatrixWorld(true);
    });
    meshRef.current.skeleton.update();

    const bones = bonesRef.current;
    const initialPositions = bonesInitialPositionsRef.current;
    const amount = Math.min(1, Math.max(0, animatedCurlRef.current.amount));
    const curlStart = 1 - amount;
    const curlFactor = amount <= 0 ? 1e-4 : FIXED_CURL_FACTOR;
    const r = mapInternalRadiusToUIValue(FIXED_CURL_RADIUS);

    const { geometry } = meshRef.current;
    const width = geometry.parameters.width;
    const height = geometry.parameters.height;

    const curlRotationRad = curlRotationRef.current * (Math.PI / 180);
    const dirX = Math.cos(curlRotationRad);
    const dirY = Math.sin(curlRotationRad);
    _scratchRotAxis.set(-dirY, dirX, 0).normalize();

    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const maxDistAlongDir = Math.max(
      halfWidth * dirX + halfHeight * dirY,
      halfWidth * dirX - halfHeight * dirY,
      -halfWidth * dirX + halfHeight * dirY,
      -halfWidth * dirX - halfHeight * dirY
    );
    const diagonalLength = Math.sqrt(width * width + height * height);
    const maxDistFromCenter = diagonalLength / 2;
    const foldOffset = -maxDistAlongDir + curlStart * 2 * maxDistAlongDir;

    const radiusWorld = r * maxDistFromCenter;
    const RPrime = radiusWorld / curlFactor;
    const arcLimit = Math.PI * radiusWorld;

    for (let i = 0; i < bones.length; i++) {
      const bone = bones[i];
      const initialPos = initialPositions[i];
      const distOnDir = initialPos.x * dirX + initialPos.y * dirY;
      const signedDist = distOnDir - foldOffset;

      if (signedDist > 0) {
        let xRel;
        let zRel;
        let finalAngle;

        if (curlMode === 'semicircle') {
          const angle_s = (signedDist * curlFactor) / radiusWorld;
          if (signedDist <= arcLimit) {
            xRel = RPrime * Math.sin(angle_s);
            zRel = RPrime * (1 - Math.cos(angle_s));
            finalAngle = angle_s;
          } else {
            const Phi = Math.PI * curlFactor;
            const xArcEnd = RPrime * Math.sin(Phi);
            const zArcEnd = RPrime * (1 - Math.cos(Phi));
            const extra = signedDist - arcLimit;
            xRel = xArcEnd + extra * Math.cos(Phi);
            zRel = zArcEnd + extra * Math.sin(Phi);
            finalAngle = Phi;
          }
        } else {
          const angle_sp = (signedDist * curlFactor) / radiusWorld;
          const effectiveR =
            radiusWorld * Math.pow(0.85, angle_sp / Math.PI);
          const effectiveRPrime = effectiveR / curlFactor;
          xRel = effectiveRPrime * Math.sin(angle_sp);
          zRel = effectiveRPrime * (1 - Math.cos(angle_sp));
          finalAngle = angle_sp;
        }

        const dx = xRel - signedDist;
        bone.position.x = initialPos.x + dx * dirX;
        bone.position.y = initialPos.y + dx * dirY;
        bone.position.z = initialPos.z + zRel;
        _scratchQuat.setFromAxisAngle(_scratchRotAxis, -finalAngle);
        bone.quaternion.copy(_scratchQuat);
      } else {
        bone.position.copy(initialPos);
        bone.quaternion.identity();
      }
    }

    meshRef.current.skeleton?.update();
  }, [curlMode]);

  updateBonesRef.current = updateBones;

  const scheduleBoneUpdate = useCallback(() => {
    if (pendingUpdateRef.current) return;
    pendingUpdateRef.current = true;
    requestAnimationFrame(() => {
      pendingUpdateRef.current = false;
      updateBonesRef.current();
    });
  }, []);

  useMotionValueEvent(curlAmountMotion, 'change', (latest) => {
    animatedCurlRef.current.amount = latest;
    scheduleBoneUpdate();
  });

  const applyTexturesToMesh = useCallback(
    (mesh, img, preserved = {}) => {
      const materials = mesh.material;
      if (!Array.isArray(materials)) return;

      const texture =
        preserved.front ||
        (() => {
          const t = new Texture(img);
          t.needsUpdate = true;
          t.minFilter = LinearFilter;
          t.colorSpace = SRGBColorSpace;
          t.format = RGBAFormat;
          return t;
        })();

      const backColorRgba = parseColorToRgba(resolveTokenColor(backColor));
      let rawBackTexture = preserved.back;
      if (!rawBackTexture) {
        rawBackTexture =
          backColorRgba.a <= 0 ? texture : createBackTexture(img, backColor);
      }
      const backTexture = makeBackTextureViewConsistent(
        rawBackTexture,
        texture
      );

      if (materials[4]) {
        materials[4].map = texture;
        materials[4].transparent = true;
        materials[4].alphaTest = 0.01;
        materials[4].emissiveMap = texture;
        materials[4].emissive = new Color(0xffffff);
        materials[4].emissiveIntensity = 0.8;
        materials[4].needsUpdate = true;
      }
      if (materials[5] && backTexture) {
        materials[5].map = backTexture;
        materials[5].transparent = true;
        materials[5].alphaTest = 0.01;
        if (backColorRgba.a <= 0) {
          materials[5].emissiveMap = texture;
          materials[5].emissive = new Color(0xffffff);
          materials[5].emissiveIntensity = 0.8;
        }
        materials[5].needsUpdate = true;
      }
      const sideTexture = preserved.side || texture;
      for (let i = 0; i < 4; i++) {
        if (materials[i] && sideTexture) {
          materials[i].map = sideTexture;
          materials[i].transparent = true;
          materials[i].alphaTest = 0.01;
          materials[i].emissiveMap = sideTexture;
          materials[i].emissive = new Color(0xffffff);
          materials[i].emissiveIntensity = 0.8;
          materials[i].needsUpdate = true;
        }
      }
    },
    [backColor, createBackTexture]
  );

  const setupScene = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return null;

    const meshW = imageWidth;
    const meshH = imageHeight;
    if (meshW <= 0 || meshH <= 0) return null;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasWidth = meshW * CANVAS_SCALE;
    const canvasHeight = meshH * CANVAS_SCALE;

    const scene = new Scene();
    sceneRef.current = scene;

    const camera = new PerspectiveCamera(
      calculateCameraFov(canvasWidth, canvasHeight, CAMERA_DISTANCE),
      canvasWidth / canvasHeight,
      CAMERA_NEAR,
      CAMERA_FAR
    );
    camera.position.set(0, 0, CAMERA_DISTANCE);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    if (rendererRef.current) {
      try {
        rendererRef.current.dispose();
      } catch (_) {
        /* ignore */
      }
      rendererRef.current = null;
    }

    let renderer;
    try {
      renderer = new WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      const gl = renderer.getContext();
      if (!gl || gl.isContextLost()) {
        setContextLost(true);
        renderer.dispose();
        return null;
      }
      renderer.setSize(
        Math.round(canvasWidth * dpr),
        Math.round(canvasHeight * dpr),
        false
      );
      renderer.setPixelRatio(1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = PCFSoftShadowMap;
      rendererRef.current = renderer;
    } catch (_) {
      setContextLost(true);
      return null;
    }

    canvasRef.current.style.width = `${canvasWidth}px`;
    canvasRef.current.style.height = `${canvasHeight}px`;

    const geometry = createStickerGeometry(
      meshW,
      meshH,
      boneGridX,
      boneGridY,
      segmentsW,
      segmentsH
    );

    const bones = [];
    const boneSpacingX = meshW / (boneGridX - 1);
    const boneSpacingY = meshH / (boneGridY - 1);
    for (let y = 0; y < boneGridY; y++) {
      for (let x = 0; x < boneGridX; x++) {
        const bone = new Bone();
        bone.position.x = -meshW / 2 + x * boneSpacingX;
        bone.position.y = -meshH / 2 + y * boneSpacingY;
        bone.position.z = 0;
        bones.push(bone);
      }
    }
    bonesRef.current = bones;
    bonesInitialPositionsRef.current = bones.map((b) => b.position.clone());

    const skeleton = new Skeleton(bones);
    const materials = buildMaterials(backColor);
    const mesh = new SkinnedMesh(geometry, materials);
    mesh.frustumCulled = false;
    bones.forEach((bone) => {
      mesh.add(bone);
      bone.updateMatrixWorld(true);
    });
    mesh.bind(skeleton);
    mesh.updateMatrixWorld(true);
    skeleton.update();
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    const group = new Group();
    groupRef.current = group;
    mesh.position.set(0, 0, 0);
    group.add(mesh);
    meshRef.current = mesh;
    lastBuiltSizeRef.current = { width: meshW, height: meshH };
    scene.add(group);

    const ambientLight = new AmbientLight(0xffffff, Math.max(1 - 0.6, 0.4));
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.3 + 1.7);
    directionalLight.position.set(shadowPositionX, shadowPositionY, 400);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 2000;
    directionalLight.shadow.bias = -0.00001;
    directionalLight.shadow.radius = 8;

    const baseShadowSize = Math.max(canvasWidth, canvasHeight);
    const shadowCameraSize = Math.max(
      baseShadowSize,
      baseShadowSize * (3.5 / CANVAS_SCALE)
    );
    const shadowOffsetX = shadowPositionX * 0.3;
    const shadowOffsetY = shadowPositionY * 0.3;
    directionalLight.shadow.camera.left =
      -shadowCameraSize / 2 + shadowOffsetX;
    directionalLight.shadow.camera.right =
      shadowCameraSize / 2 + shadowOffsetX;
    directionalLight.shadow.camera.top =
      shadowCameraSize / 2 + shadowOffsetY;
    directionalLight.shadow.camera.bottom =
      -shadowCameraSize / 2 + shadowOffsetY;
    lightRef.current = directionalLight;
    scene.add(directionalLight);

    const scRgba = parseColorToRgba(resolveTokenColor(shadowColor));
    const shadowMat = new ShadowMaterial({
      opacity: castShadowOpacity / 100,
      color: new Color(scRgba.r, scRgba.g, scRgba.b),
    });
    const planeGeometry = new PlaneGeometry(shadowCameraSize, shadowCameraSize);
    const backgroundPlane = new Mesh(planeGeometry, shadowMat);
    backgroundPlane.receiveShadow = true;
    backgroundPlane.position.set(0, 0, -1);
    backgroundPlaneRef.current = backgroundPlane;
    scene.add(backgroundPlane);

    renderer.render(scene, camera);
    setSceneReady(true);
    return { scene, camera, renderer, mesh, bones };
  }, [
    createStickerGeometry,
    buildMaterials,
    shadowPositionX,
    shadowPositionY,
    castShadowOpacity,
    shadowColor,
    backColor,
    imageWidth,
    imageHeight,
    boneGridX,
    boneGridY,
    segmentsW,
    segmentsH,
  ]);

  const loadTexture = useCallback(() => {
    if (!resolvedImageUrl || !meshRef.current) {
      setTextureLoaded(false);
      return;
    }
    setTextureLoaded(false);
    imageLoadAbortRef.current = false;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      if (imageLoadAbortRef.current || !meshRef.current) return;
      loadedImageRef.current = img;
      if (!meshRef.current?.material) return;

      applyTexturesToMesh(meshRef.current, img);
      setTextureLoaded(true);
      setSceneReady(true);

      if (!imageLoadAbortRef.current && meshRef.current) {
        requestAnimationFrame(() => {
          if (imageLoadAbortRef.current || !meshRef.current) return;
          meshRef.current.material.forEach((mat) => {
            if (mat) {
              mat.needsUpdate = true;
              if (mat.map) mat.map.needsUpdate = true;
            }
          });
          meshRef.current.updateMatrixWorld(true);
          meshRef.current.skeleton?.update();
          updateBonesRef.current();
          renderFrame();
        });
      }
    };

    img.onerror = () => {
      if (!imageLoadAbortRef.current) console.error('Texture loading error');
      setTextureLoaded(false);
      if (!imageLoadAbortRef.current && meshRef.current) renderFrame();
    };

    img.src = resolvedImageUrl;
  }, [resolvedImageUrl, applyTexturesToMesh, renderFrame]);

  const buildTransitionConfig = useCallback((transitionValue) => {
    const config = {
      ...(transitionValue?.type && { type: transitionValue.type }),
    };
    if (!transitionValue?.type || transitionValue.type === 'tween') {
      config.duration = transitionValue?.duration ?? 0.28;
      if (transitionValue?.ease) config.ease = transitionValue.ease;
      if (transitionValue?.delay !== undefined)
        config.delay = transitionValue.delay;
    }
    if (transitionValue?.type === 'spring') {
      ;[
        'stiffness',
        'damping',
        'mass',
        'bounce',
        'restDelta',
        'restSpeed',
        'duration',
      ].forEach((k) => {
        if (transitionValue[k] !== undefined) config[k] = transitionValue[k];
      });
    }
    return config;
  }, []);

  const animateCurlTo = useCallback(
    (targetNormalized) => {
      animationControlsRef.current.curlAmount?.stop();
      const cfg = buildTransitionConfig(transition);
      startRenderLoop();
      animationControlsRef.current.curlAmount = animate(
        curlAmountMotion,
        targetNormalized,
        {
          ...cfg,
          onComplete: () => stopRenderLoop(),
        }
      );
    },
    [
      transition,
      curlAmountMotion,
      buildTransitionConfig,
      startRenderLoop,
      stopRenderLoop,
    ]
  );

  const handlePointerEnter = useCallback(() => {
    if (isHoveringRef.current) return;
    isHoveringRef.current = true;
    if (containerRef.current) containerRef.current.style.cursor = 'pointer';
    if (!isPressedRef.current) {
      animateCurlTo(hoverPeel / 100);
    }
  }, [hoverPeel, animateCurlTo]);

  const handlePointerLeave = useCallback(() => {
    isHoveringRef.current = false;
    isPressedRef.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'auto';
    animateCurlTo(0);
  }, [animateCurlTo]);

  const handlePointerDown = useCallback(() => {
    isPressedRef.current = true;
    animateCurlTo(pressPeel / 100);
  }, [pressPeel, animateCurlTo]);

  const handlePointerUp = useCallback(() => {
    if (!isPressedRef.current) return;
    isPressedRef.current = false;
    if (isHoveringRef.current) {
      animateCurlTo(hoverPeel / 100);
    } else {
      animateCurlTo(0);
    }
  }, [hoverPeel, animateCurlTo]);

  const cleanupScene = useCallback(() => {
    stopRenderLoop();
    setSceneReady(false);
    if (meshRef.current) {
      const oldMesh = meshRef.current;
      groupRef.current?.remove(oldMesh);
      sceneRef.current?.remove(oldMesh);
      oldMesh.geometry?.dispose();
      if (Array.isArray(oldMesh.material)) {
        oldMesh.material.forEach((mat) => {
          mat.map?.dispose();
          mat.dispose();
        });
      } else if (oldMesh.material) {
        oldMesh.material.map?.dispose();
        oldMesh.material.dispose();
      }
      oldMesh.skeleton?.bones.forEach((bone) => bone.parent?.remove(bone));
      meshRef.current = null;
    }
    bonesRef.current = [];
    bonesInitialPositionsRef.current = [];
    groupRef.current = null;
    if (rendererRef.current) {
      try {
        rendererRef.current.dispose();
      } catch (_) {
        /* ignore */
      }
      rendererRef.current = null;
    }
    if (sceneRef.current) {
      try {
        while (sceneRef.current.children.length > 0) {
          const child = sceneRef.current.children[0];
          sceneRef.current.remove(child);
          child.dispose?.();
        }
        sceneRef.current.clear();
      } catch (_) {
        /* ignore */
      }
      sceneRef.current = null;
    }
    cameraRef.current = null;
    lightRef.current = null;
    ambientLightRef.current = null;
    backgroundPlaneRef.current = null;
    loadedImageRef.current = null;
    animationControlsRef.current.curlAmount?.stop();
    animationControlsRef.current = {};
    imageLoadAbortRef.current = true;
  }, [stopRenderLoop]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onLost = (e) => {
      e.preventDefault();
      setContextLost(true);
    };
    const onRestored = () => {
      setContextLost(false);
      setSceneReady(false);
      if (hasContent) {
        const s = setupScene();
        if (s && meshRef.current) {
          meshRef.current.skeleton?.update();
          updateBonesRef.current();
          renderFrame();
          loadTexture();
        }
      }
    };

    canvas.addEventListener('webglcontextlost', onLost, false);
    canvas.addEventListener('webglcontextrestored', onRestored, false);
    return () => {
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
    };
  }, [hasContent, setupScene, renderFrame, loadTexture]);

  useEffect(() => {
    if (!hasContent) {
      imageLoadAbortRef.current = true;
      setSceneReady(false);
      cleanupScene();
      return undefined;
    }

    imageLoadAbortRef.current = false;
    const sceneSetup = setupScene();

    if (!sceneSetup) {
      const t = setTimeout(() => {
        const retry = setupScene();
        if (retry && meshRef.current) {
          meshRef.current.skeleton?.update();
          updateBonesRef.current();
          renderFrame();
          loadTexture();
        }
      }, 100);
      return () => clearTimeout(t);
    }

    if (meshRef.current) {
      meshRef.current.skeleton?.update();
      updateBonesRef.current();
      renderFrame();
      loadTexture();
    }

    return () => {
      cleanupScene();
    };
  }, [hasContent, setupScene, loadTexture, renderFrame, cleanupScene]);

  useEffect(() => {
    curlRotationRef.current = curlRotation;
    if (!meshRef.current || !bonesRef.current.length) return;
    updateBonesRef.current();
    renderFrame();
  }, [curlRotation, renderFrame]);

  useEffect(() => {
    if (!meshRef.current?.material || !loadedImageRef.current) return;
    applyTexturesToMesh(meshRef.current, loadedImageRef.current);
    renderFrame();
  }, [backColor, applyTexturesToMesh, renderFrame]);

  if (!hasContent) {
    return (
      <div
        className={className}
        style={{
          position: 'relative',
          width: imageWidth,
          height: imageHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: 13,
          ...style,
        }}
      >
        Add an image
      </div>
    );
  }

  if (contextLost) {
    return (
      <img
        src={resolvedImageUrl}
        alt=''
        className={className}
        style={{ width: imageWidth, height: imageHeight, ...style }}
      />
    );
  }

  const offsetPercent = ((CANVAS_SCALE - 1) / 2) * 100;

  return (
    <div
      ref={containerRef}
      className={className}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{
        ...style,
        position: 'relative',
        width: imageWidth,
        height: imageHeight,
        overflow: 'visible',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        background: 'transparent',
      }}
    >
      {/* Fallback while WebGL boots */}
      {!sceneReady || !textureLoaded ? (
        <img
          src={resolvedImageUrl}
          alt=''
          style={{
            width: imageWidth,
            height: imageHeight,
            objectFit: 'contain',
            borderRadius: 8,
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        />
      ) : null}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: `-${offsetPercent}%`,
          left: `-${offsetPercent}%`,
          display: 'block',
          pointerEvents: 'none',
          cursor: 'auto',
          opacity: sceneReady ? 1 : 0,
          zIndex: 1,
        }}
      />
    </div>
  );
}

const COMPONENT_DEFAULTS = {
  image: { src: DEFAULT_IMAGE },
  imageWidth: 36,
  imageHeight: 36,
  hoverPeel: 45,
  pressPeel: 64,
  curlRotation: 240,
  transition: { type: 'tween', duration: 0.28, ease: 'easeOut' },
  shadowEnabled: true,
  shadow: {
    opacity: 30,
    color: '#000000',
    x: -300,
    y: 140,
  },
  backColor: '#111111',
  boneGridX: 16,
  boneGridY: 16,
  segmentsW: 32,
  segmentsH: 24,
};

export { PEEL_DIRECTIONS, PEEL_VARIATIONS } from './peelDirections';
