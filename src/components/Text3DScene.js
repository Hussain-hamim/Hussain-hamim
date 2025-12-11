import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

const Text3DScene = ({ initialText = "three.js", texts = null }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const groupRef = useRef(null);
  const textMesh1Ref = useRef(null);
  const textMesh2Ref = useRef(null);
  const animationFrameRef = useRef(null);
  const textRef = useRef(initialText);
  const firstLetterRef = useRef(true);
  const pointLightRef = useRef(null);

  const [text, setText] = useState(initialText);

  const bevelEnabledRef = useRef(true);
  const fontRef = useRef(null);
  const fontNameRef = useRef("optimer");
  const fontWeightRef = useRef("bold");
  const materialsRef = useRef(null);
  const shadowMaterialRef = useRef(null);

  const targetRotationRef = useRef(0);
  const targetRotationOnPointerDownRef = useRef(0);
  const pointerXRef = useRef(0);
  const pointerXOnPointerDownRef = useRef(0);
  const windowHalfXRef = useRef(0);
  const initialSpinCompleteRef = useRef(false);
  const initialSpinTargetRef = useRef(0);
  const finalAngleRef = useRef(0.4); // Slight angle for nice 3D look (about 23 degrees)

  const depth = 20;
  const size = 70;
  const hover = 30;
  const curveSegments = 4;
  const bevelThickness = 2;
  const bevelSize = 1.5;
  const mirror = true;

  useEffect(() => {
    if (!containerRef.current) return;

    windowHalfXRef.current = containerRef.current.clientWidth / 2;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      30,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      1,
      1500
    );
    camera.position.set(0, 400, 700);
    const cameraTarget = new THREE.Vector3(0, 150, 0);
    cameraRef.current = camera;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    // No fog - transparent background
    sceneRef.current = scene;

    // LIGHTS - better lighting for depth and shadows
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(0, 0, 1).normalize();
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffffff, 5, 0, 0);
    pointLight.color.setHSL(0.15, 1, 0.6); // Golden/yellow tint
    pointLight.position.set(0, 100, 90);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    // Additional light for better depth
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-1, -0.5, -0.5).normalize();
    scene.add(fillLight);

    // More metallic golden material - will update on hover for shine
    function createMaterials(hovered = false) {
      const metalness = hovered ? 1.0 : 0.8;
      const roughness = hovered ? 0.1 : 0.2;
      const emissive = hovered ? 0x664400 : 0x000000;
      const emissiveIntensity = hovered ? 0.5 : 0;

      return [
        new THREE.MeshStandardMaterial({
          color: 0xffd700,
          metalness: metalness,
          roughness: roughness,
          emissive: emissive,
          emissiveIntensity: emissiveIntensity,
          flatShading: true,
        }), // front - golden metallic
        new THREE.MeshStandardMaterial({
          color: 0xffd700,
          metalness: metalness,
          roughness: roughness,
          emissive: emissive,
          emissiveIntensity: emissiveIntensity,
        }), // side - golden metallic
      ];
    }

    materialsRef.current = createMaterials(false);

    // Dark shadow/outline material
    shadowMaterialRef.current = new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.1,
      roughness: 0.9,
    });

    const group = new THREE.Group();
    group.position.y = 100;
    scene.add(group);
    groupRef.current = group;

    // No plane - transparent background

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load font
    function loadFont() {
      const loader = new FontLoader();
      const fontPath = `https://threejs.org/examples/fonts/${fontNameRef.current}_${fontWeightRef.current}.typeface.json`;

      loader.load(
        fontPath,
        function (response) {
          fontRef.current = response;
          refreshText();

          // Start initial spin animation after text is created (only once)
          if (!initialSpinCompleteRef.current) {
            // Start from 0, spin to half rotation (180 degrees)
            groupRef.current.rotation.y = 0;
            targetRotationRef.current = Math.PI; // Half spin (180 degrees)

            // After half spin, go back to final angle
            setTimeout(() => {
              targetRotationRef.current = finalAngleRef.current; // Go back to slight angle

              // Mark as complete after returning
              setTimeout(() => {
                initialSpinCompleteRef.current = true;
              }, 1500); // After returning animation completes
            }, 2000); // After 2 seconds of half spin
          }
        },
        undefined,
        function (error) {
          console.error("Error loading font:", error);
          // Try fallback font
          fontNameRef.current = "helvetiker";
          const fallbackPath = `https://threejs.org/examples/fonts/${fontNameRef.current}_${fontWeightRef.current}.typeface.json`;
          loader.load(fallbackPath, function (response) {
            fontRef.current = response;
            refreshText();

            // Start initial spin animation after text is created (only once)
            if (!initialSpinCompleteRef.current) {
              // Start from 0, spin to half rotation (180 degrees)
              groupRef.current.rotation.y = 0;
              targetRotationRef.current = Math.PI; // Half spin (180 degrees)

              // After half spin, go back to final angle
              setTimeout(() => {
                targetRotationRef.current = finalAngleRef.current; // Go back to slight angle

                // Mark as complete after returning
                setTimeout(() => {
                  initialSpinCompleteRef.current = true;
                }, 1500); // After returning animation completes
              }, 2000); // After 2 seconds of half spin
            }
          });
        }
      );
    }

    function createText() {
      if (!fontRef.current || !textRef.current) return;

      const textGeo = new TextGeometry(textRef.current, {
        font: fontRef.current,
        size: size,
        depth: depth,
        curveSegments: curveSegments,
        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelEnabled: bevelEnabledRef.current,
      });

      textGeo.computeBoundingBox();
      const centerOffset =
        -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

      // Create shadow/outline mesh (offset behind and to the right)
      const shadowGeo = textGeo.clone();
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterialRef.current);
      shadowMesh.position.x = centerOffset + 3; // Offset to the right
      shadowMesh.position.y = hover - 2; // Offset down
      shadowMesh.position.z = -2; // Behind the main text
      shadowMesh.rotation.x = 0;
      shadowMesh.rotation.y = Math.PI * 2;
      groupRef.current.add(shadowMesh);

      // Main text mesh
      const textMesh1 = new THREE.Mesh(textGeo, materialsRef.current);
      textMesh1.position.x = centerOffset;
      textMesh1.position.y = hover;
      textMesh1.position.z = 0;
      textMesh1.rotation.x = 0;
      textMesh1.rotation.y = Math.PI * 2;
      groupRef.current.add(textMesh1);
      textMesh1Ref.current = textMesh1;

      // Reflection/mirror text (below, inverted)
      if (mirror) {
        const reflectionMaterial = materialsRef.current[0].clone();
        reflectionMaterial.opacity = 0.4;
        reflectionMaterial.transparent = true;

        const textMesh2 = new THREE.Mesh(textGeo, reflectionMaterial);
        textMesh2.position.x = centerOffset;
        textMesh2.position.y = -hover - 5; // Position below with gap
        textMesh2.position.z = depth;
        textMesh2.rotation.x = Math.PI;
        textMesh2.rotation.y = Math.PI * 2;
        groupRef.current.add(textMesh2);
        textMesh2Ref.current = textMesh2;
      }
    }

    function refreshText() {
      // Remove all meshes from group (including shadow)
      while (groupRef.current.children.length > 0) {
        const child = groupRef.current.children[0];
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
        groupRef.current.remove(child);
      }
      textMesh1Ref.current = null;
      textMesh2Ref.current = null;
      if (!textRef.current) return;
      createText();
    }

    loadFont();

    // Event handlers
    function onPointerDown(event) {
      if (event.isPrimary === false) return;
      pointerXOnPointerDownRef.current = event.clientX - windowHalfXRef.current;
      targetRotationOnPointerDownRef.current = targetRotationRef.current;
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    }

    function onPointerMove(event) {
      if (event.isPrimary === false) return;
      pointerXRef.current = event.clientX - windowHalfXRef.current;
      targetRotationRef.current =
        targetRotationOnPointerDownRef.current +
        (pointerXRef.current - pointerXOnPointerDownRef.current) * 0.02;
    }

    function onPointerUp(event) {
      if (event.isPrimary === false) return;
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    }

    function onDocumentKeyDown(event) {
      if (firstLetterRef.current) {
        firstLetterRef.current = false;
        textRef.current = "";
        setText("");
        return;
      }
      const keyCode = event.keyCode;
      // backspace
      if (keyCode === 8) {
        event.preventDefault();
        textRef.current = textRef.current.substring(
          0,
          textRef.current.length - 1
        );
        setText(textRef.current);
        refreshText();
        return false;
      }
    }

    function onDocumentKeyPress(event) {
      const keyCode = event.which;
      // backspace
      if (keyCode === 8) {
        event.preventDefault();
      } else {
        const ch = String.fromCharCode(keyCode);
        textRef.current = textRef.current + ch;
        setText(textRef.current);
        refreshText();
      }
    }

    function handleResize() {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current)
        return;
      windowHalfXRef.current = containerRef.current.clientWidth / 2;
      cameraRef.current.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    }

    containerRef.current.style.touchAction = "none";
    containerRef.current.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keypress", onDocumentKeyPress);
    document.addEventListener("keydown", onDocumentKeyDown);
    window.addEventListener("resize", handleResize);

    function animate() {
      if (!groupRef.current || !sceneRef.current || !cameraRef.current) return;

      animationFrameRef.current = requestAnimationFrame(animate);

      // Smooth rotation interpolation - slower during initial spin for smoother effect
      const rotationSpeed = initialSpinCompleteRef.current ? 0.05 : 0.04;
      groupRef.current.rotation.y +=
        (targetRotationRef.current - groupRef.current.rotation.y) *
        rotationSpeed;
      cameraRef.current.lookAt(cameraTarget);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

    animate();

    // Initial text setup
    const startText = texts && texts.length > 0 ? texts[0] : initialText;
    textRef.current = startText;
    setText(startText);

    // Text cycling effect if texts array is provided
    let textCycleInterval = null;
    if (texts && texts.length > 0) {
      let currentIndex = 0;
      textCycleInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % texts.length;
        textRef.current = texts[currentIndex];
        setText(texts[currentIndex]);
        if (fontRef.current) {
          refreshText();
        }
      }, 30000); // Change text every 30 seconds
    }

    // Hover shine effect removed - keeping only transform effect from CSS

    return () => {
      if (textCycleInterval) {
        clearInterval(textCycleInterval);
      }
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keypress", onDocumentKeyPress);
      document.removeEventListener("keydown", onDocumentKeyDown);
      if (containerRef.current) {
        containerRef.current.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        if (rendererRef.current && rendererRef.current.domElement) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (textMesh1Ref.current && textMesh1Ref.current.geometry) {
        textMesh1Ref.current.geometry.dispose();
      }
      if (textMesh2Ref.current && textMesh2Ref.current.geometry) {
        textMesh2Ref.current.geometry.dispose();
      }
      if (materialsRef.current) {
        materialsRef.current.forEach((mat) => mat.dispose());
      }
    };
  }, [texts, initialText]);

  // Update text ref when text state changes (for external updates)
  useEffect(() => {
    textRef.current = text;
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ touchAction: "none" }}
    />
  );
};

export default Text3DScene;
