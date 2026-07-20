import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  Vector2,
  TextureLoader,
} from 'three';
import { gsap } from 'gsap';

const CAMERA_FOV = 35;
const PLANE_SEGMENTS = 128;

const vertexShader = `
varying vec2 vUv;
void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    vUv = uv;
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uProgress;
uniform vec2 uSize;
uniform vec2 uImageSize;
uniform sampler2D uTexture;
uniform int uBlobCount;
uniform float uFitCover;
#define PI 3.1415926538
#define TWO_PI 6.28318530718

float noise(vec2 point) {
    float frequency = 1.0;
    float angle = atan(point.y, point.x) + uProgress * PI;
    float w0 = (cos(angle * frequency) + 1.0) / 2.0;
    float w1 = (sin(2.0 * angle * frequency) + 1.0) / 2.0;
    float w2 = (cos(3.0 * angle * frequency) + 1.0) / 2.0;
    return (w0 + w1 + w2) / 3.0;
}

float softMax(float a, float b, float k) {
    return log(exp(k * a) + exp(k * b)) / k;
}

float softMin(float a, float b, float k) {
    return -softMax(-a, -b, k);
}

float circleSDF(vec2 pos, float rad) {
    float a = sin(uProgress * 0.2) * 0.25;
    float amt = 0.5 + a;
    float circle = length(pos);
    circle += noise(pos) * rad * amt;
    return circle;
}

void main() {
    vec4 bg = vec4(0.0);
    vec2 coverUV = vUv;
    if (uSize.x > 0.0 && uSize.y > 0.0 && uImageSize.x > 0.0 && uImageSize.y > 0.0) {
        float containerAspect = uSize.x / uSize.y;
        float imageAspect = uImageSize.x / uImageSize.y;
        vec2 scale = vec2(1.0);
        if (uFitCover > 0.5) {
            if (containerAspect > imageAspect) scale.y = imageAspect / containerAspect;
            else scale.x = containerAspect / imageAspect;
        } else {
            if (containerAspect > imageAspect) scale.x = containerAspect / imageAspect;
            else scale.y = imageAspect / containerAspect;
        }
        coverUV = (vUv - 0.5) * scale + 0.5;
    }

    vec4 texture = texture2D(uTexture, coverUV);
    if (uFitCover < 0.5 &&
        (coverUV.x < 0.0 || coverUV.x > 1.0 || coverUV.y < 0.0 || coverUV.y > 1.0)) {
        texture = vec4(0.0);
    }

    vec2 coords = vUv * uSize;
    vec2 center = vec2(0.5) * uSize;
    float t = pow(uProgress, 2.5);
    float maxDim = sqrt(uSize.x * uSize.x + uSize.y * uSize.y);
    float rad = t * maxDim;
    float c1 = circleSDF(coords - center, rad);
    float k = 50.0 / max(uSize.x, uSize.y);
    float circle = c1;

    int extraBlobs = uBlobCount - 1;
    for (int i = 0; i < 20; i++) {
        if (i >= extraBlobs) break;
        float idx = float(i);
        float total = float(extraBlobs);
        float baseAngle = idx * TWO_PI / max(total, 1.0);
        float jitter = fract(sin(idx * 127.1 + 311.7) * 43758.5453) * 0.5 - 0.25;
        float angle = baseAngle + jitter;
        float distRatio = 0.25 + 0.2 * fract(sin(idx * 43.3) * 12345.6);
        vec2 offset = vec2(cos(angle), sin(angle)) * distRatio * min(uSize.x, uSize.y);
        float blobDist = length(coords - center - offset);
        float blobNoise = noise(coords - center - offset) * rad * 0.4;
        float blob = blobDist + blobNoise;
        circle = softMin(circle, blob, k);
    }

    circle = step(circle, rad);
    gl_FragColor = mix(bg, texture, circle);
}
`;

const NAMED_EASES = {
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
};

function cameraDistance(height, fov) {
  const h = Math.max(height, 1);
  const r = (fov * Math.PI) / 360;
  return h / 2 / Math.tan(r) || 1;
}

function fitCamera(camera, width, height) {
  const w = Math.max(width, 1);
  const h = Math.max(height, 1);
  camera.aspect = w / h;
  camera.fov = CAMERA_FOV;
  camera.position.set(0, 0, cameraDistance(h, camera.fov));
  camera.updateProjectionMatrix();
}

function resolveImageSrc(image) {
  if (!image) return undefined;
  if (typeof image === 'string') return image.trim() || undefined;
  return image.src || undefined;
}

function cubicBezierEase(x1, y1, x2, y2) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const dX = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (p) => {
    let t = p;
    for (let i = 0; i < 8; i++) {
      const x = sampleX(t) - p;
      const d = dX(t);
      if (Math.abs(x) < 1e-4 || Math.abs(d) < 1e-6) break;
      t -= x / d;
    }
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    return sampleY(t);
  };
}

function easeToGsap(ease) {
  if (Array.isArray(ease) && ease.length === 4) {
    return cubicBezierEase(ease[0], ease[1], ease[2], ease[3]);
  }
  const b = (typeof ease === 'string' && NAMED_EASES[ease]) || NAMED_EASES.easeOut;
  return cubicBezierEase(b[0], b[1], b[2], b[3]);
}

/**
 * Fluid Image Reveal — Originkit blob mask.
 * @see https://www.originkit.dev/
 */
export default function BlobReveal({
  image,
  fit = 'cover',
  blobCount = 20,
  startAlign = 'bottom',
  replay = false,
  transition = { duration: 2, ease: 'easeOut' },
  className = '',
  style,
  alt = '',
}) {
  const trDuration =
    typeof transition?.duration === 'number' ? transition.duration : 2;
  const easeKey = JSON.stringify(transition?.ease ?? null);
  const ease = useMemo(
    () => easeToGsap(transition?.ease),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [easeKey]
  );

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const zoomProbeRef = useRef(null);
  const sizeStateRef = useRef({ width: 0, height: 0, zoom: 0 });
  const rafIdRef = useRef(null);
  const isRenderingRef = useRef(false);
  const scrollTweenRef = useRef(null);

  const [inView, setInView] = useState(false);
  const [offScreen, setOffScreen] = useState(false);
  const [textureReady, setTextureReady] = useState(false);

  const resolvedImage = resolveImageSrc(image);
  const hasImage = !!resolvedImage;

  const initThree = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return null;
    const container = containerRef.current;
    const width = container.clientWidth || container.offsetWidth || 1;
    const height = container.clientHeight || container.offsetHeight || 1;

    const scene = new Scene();
    sceneRef.current = scene;

    const camera = new PerspectiveCamera(CAMERA_FOV, width / height, 0.1, 2000);
    fitCamera(camera, width, height);
    cameraRef.current = camera;

    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      powerPreference: 'default',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    rendererRef.current = renderer;

    const iw = Math.max(1, width);
    const ih = Math.max(1, height);
    const geometry = new PlaneGeometry(iw, ih, PLANE_SEGMENTS, PLANE_SEGMENTS);
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uProgress: { value: 0 },
        uSize: { value: new Vector2(iw, ih) },
        uImageSize: { value: new Vector2(1, 1) },
        uTexture: { value: null },
        uBlobCount: {
          value: Math.min(20, Math.max(1, Math.round(blobCount))),
        },
        uFitCover: { value: fit === 'contain' ? 0 : 1 },
      },
    });
    const mesh = new Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);
    return { scene, camera, renderer, mesh };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blobCount]);

  const loadTexture = useCallback(() => {
    if (!resolvedImage || !meshRef.current) {
      setTextureReady(false);
      return;
    }
    setTextureReady(false);
    new TextureLoader().load(
      resolvedImage,
      (texture) => {
        if (!meshRef.current?.material) return;
        const material = meshRef.current.material;
        if (texture.image) {
          material.uniforms.uImageSize.value.set(
            texture.image.width || 1,
            texture.image.height || 1
          );
        }
        material.uniforms.uTexture.value = texture;
        setTextureReady(true);
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      },
      undefined,
      (err) => {
        console.error('BlobReveal texture error:', err);
        setTextureReady(false);
      }
    );
  }, [resolvedImage]);

  const resize = useCallback((width, height) => {
    if (!cameraRef.current || !rendererRef.current) return;
    fitCamera(cameraRef.current, width, height);
    rendererRef.current.setSize(width, height, false);
    rendererRef.current.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 2)
    );
    const mesh = meshRef.current;
    if (mesh) {
      const iw = Math.max(1, width);
      const ih = Math.max(1, height);
      if (mesh.geometry) mesh.geometry.dispose();
      mesh.geometry = new PlaneGeometry(
        iw,
        ih,
        PLANE_SEGMENTS,
        PLANE_SEGMENTS
      );
      if (mesh.material?.uniforms?.uSize) {
        mesh.material.uniforms.uSize.value.set(iw, ih);
      }
    }
  }, []);

  const renderOnce = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, []);

  const renderLoop = useCallback(() => {
    renderOnce();
    rafIdRef.current = isRenderingRef.current
      ? requestAnimationFrame(renderLoop)
      : null;
  }, [renderOnce]);

  const startLoop = useCallback(() => {
    isRenderingRef.current = true;
    if (rafIdRef.current == null) {
      rafIdRef.current = requestAnimationFrame(renderLoop);
    }
  }, [renderLoop]);

  const stopLoop = useCallback(() => {
    isRenderingRef.current = false;
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!hasImage) {
      setTextureReady(false);
      stopLoop();
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
        sceneRef.current = null;
      }
      meshRef.current = null;
      return undefined;
    }
    setTextureReady(false);
    initThree();
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      renderOnce();
    }
    const t = setTimeout(() => loadTexture(), 0);
    return () => {
      clearTimeout(t);
      stopLoop();
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
        sceneRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasImage, resolvedImage, initThree, loadTexture, stopLoop, renderOnce]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const measure = () => {
      const w = container.clientWidth || container.offsetWidth || 1;
      const h = container.clientHeight || container.offsetHeight || 1;
      const s = sizeStateRef.current;
      if (Math.abs(w - s.width) > 1 || Math.abs(h - s.height) > 1) {
        s.width = w;
        s.height = h;
        resize(w, h);
        renderOnce();
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    const zoomTimer = setInterval(() => {
      const probeW =
        zoomProbeRef.current?.getBoundingClientRect().width ?? 20;
      const s = sizeStateRef.current;
      if (Math.abs(probeW - s.zoom) > 0.5) {
        s.zoom = probeW;
        measure();
      }
    }, 250);
    return () => {
      observer.disconnect();
      clearInterval(zoomTimer);
    };
  }, [resize, renderOnce]);

  useEffect(() => {
    if (!meshRef.current?.material) return;
    meshRef.current.material.uniforms.uBlobCount.value = Math.min(
      20,
      Math.max(1, Math.round(blobCount))
    );
    renderOnce();
  }, [blobCount, renderOnce]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh?.material?.uniforms?.uFitCover) return;
    mesh.material.uniforms.uFitCover.value = fit === 'contain' ? 0 : 1;
    renderOnce();
  }, [fit, renderOnce]);

  useEffect(() => {
    let raf = null;
    const check = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const edge =
        startAlign === 'top'
          ? rect.top
          : startAlign === 'center'
            ? rect.top + rect.height / 2
            : rect.bottom;
      setInView(edge <= vh && rect.bottom >= 0);
      setOffScreen(rect.top > vh || rect.bottom < 0);
    };
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', check);
    };
  }, [startAlign]);

  useEffect(() => {
    if (
      !textureReady ||
      !meshRef.current?.material ||
      !meshRef.current.material.uniforms.uTexture.value
    ) {
      return;
    }
    const material = meshRef.current.material;
    const progress = material.uniforms.uProgress.value;
    if (offScreen) {
      if (scrollTweenRef.current) {
        scrollTweenRef.current.kill();
        scrollTweenRef.current = null;
        stopLoop();
      }
      if (replay && progress > 0.01) {
        material.uniforms.uProgress.value = 0;
        renderOnce();
      }
      return;
    }
    if (inView && progress < 0.99) {
      if (scrollTweenRef.current) return;
      startLoop();
      scrollTweenRef.current = gsap.to(material.uniforms.uProgress, {
        value: 1,
        duration: trDuration,
        ease,
        onUpdate: renderOnce,
        onComplete: () => {
          renderOnce();
          stopLoop();
          scrollTweenRef.current = null;
        },
      });
    }
  }, [
    inView,
    offScreen,
    replay,
    textureReady,
    trDuration,
    ease,
    renderOnce,
    startLoop,
    stopLoop,
  ]);

  useEffect(() => {
    return () => {
      if (scrollTweenRef.current) {
        scrollTweenRef.current.kill();
        scrollTweenRef.current = null;
      }
      stopLoop();
    };
  }, [stopLoop]);

  if (!hasImage) {
    return (
      <div
        className={className}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          ...style,
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'block',
        margin: 0,
        padding: 0,
        ...style,
      }}
      role='img'
      aria-label={alt || undefined}
    >
      <div
        ref={zoomProbeRef}
        style={{
          position: 'absolute',
          width: 20,
          height: 20,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}
