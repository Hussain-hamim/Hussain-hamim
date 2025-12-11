import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const LogarithmicDepthScene = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const NEAR = 1e-6;
    const FAR = 1e27;
    let SCREEN_WIDTH = containerRef.current.clientWidth;
    let SCREEN_HEIGHT = containerRef.current.clientHeight;
    const mouse = [0.5, 0.5];
    let zoompos = -100;
    let minzoomspeed = 0.015;
    let zoomspeed = minzoomspeed;

    const labeldata = [
      { size: 0.01, scale: 0.0001, label: 'microscopic (1µm)' },
      { size: 0.01, scale: 0.1, label: 'minuscule (1mm)' },
      { size: 0.01, scale: 1.0, label: 'tiny (1cm)' },
      { size: 1, scale: 1.0, label: 'child-sized (1m)' },
      { size: 10, scale: 1.0, label: 'tree-sized (10m)' },
      { size: 100, scale: 1.0, label: 'building-sized (100m)' },
      { size: 1000, scale: 1.0, label: 'medium (1km)' },
      { size: 10000, scale: 1.0, label: 'city-sized (10km)' },
      { size: 3400000, scale: 1.0, label: 'moon-sized (3,400 Km)' },
      { size: 12000000, scale: 1.0, label: 'planet-sized (12,000 km)' },
      { size: 1400000000, scale: 1.0, label: 'sun-sized (1,400,000 km)' },
      { size: 7.47e12, scale: 1.0, label: 'solar system-sized (50Au)' },
      { size: 9.4605284e15, scale: 1.0, label: 'gargantuan (1 light year)' },
      { size: 3.08567758e16, scale: 1.0, label: 'ludicrous (1 parsec)' },
      { size: 1e19, scale: 1.0, label: 'mind boggling (1000 light years)' },
    ];

    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0x777777));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(100, 100, 100);
    scene.add(light);

    const camera = new THREE.PerspectiveCamera(
      50,
      SCREEN_WIDTH / SCREEN_HEIGHT,
      NEAR,
      FAR
    );
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    const materialargs = {
      color: 0xffffff,
      specular: 0x050505,
      shininess: 50,
      emissive: 0x000000,
    };

    const geometry = new THREE.SphereGeometry(0.5, 24, 12);

    // Load font from CDN
    const loader = new FontLoader();
    loader.load(
      'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
      function (font) {
        for (let i = 0; i < labeldata.length; i++) {
          const scale = labeldata[i].scale || 1;

          const labelgeo = new TextGeometry(labeldata[i].label, {
            font: font,
            size: labeldata[i].size,
            depth: labeldata[i].size / 2,
          });

          labelgeo.computeBoundingSphere();
          labelgeo.translate(-labelgeo.boundingSphere.radius, 0, 0);

          materialargs.color = new THREE.Color().setHSL(
            Math.random(),
            0.5,
            0.5
          );

          const material = new THREE.MeshPhongMaterial(materialargs);

          const group = new THREE.Group();
          group.position.z = -labeldata[i].size * scale;
          scene.add(group);

          const textmesh = new THREE.Mesh(labelgeo, material);
          textmesh.scale.set(scale, scale, scale);
          textmesh.position.z = -labeldata[i].size * scale;
          textmesh.position.y = (labeldata[i].size / 4) * scale;
          group.add(textmesh);

          const dotmesh = new THREE.Mesh(geometry, material);
          dotmesh.position.y = (-labeldata[i].size / 4) * scale;
          dotmesh.scale.multiplyScalar(labeldata[i].size * scale);
          group.add(dotmesh);
        }
      },
      undefined,
      function (error) {
        console.error('Error loading font:', error);
        // Fallback: create spheres without text if font fails
        for (let i = 0; i < labeldata.length; i++) {
          const scale = labeldata[i].scale || 1;
          materialargs.color = new THREE.Color().setHSL(
            Math.random(),
            0.5,
            0.5
          );
          const material = new THREE.MeshPhongMaterial(materialargs);
          const dotmesh = new THREE.Mesh(geometry, material);
          dotmesh.position.z = -labeldata[i].size * scale;
          dotmesh.scale.multiplyScalar(labeldata[i].size * scale);
          scene.add(dotmesh);
        }
      }
    );

    function onMouseMove(ev) {
      const rect = containerRef.current.getBoundingClientRect();
      mouse[0] = (ev.clientX - rect.left) / rect.width;
      mouse[1] = (ev.clientY - rect.top) / rect.height;
    }

    function onMouseWheel(ev) {
      ev.preventDefault();
      const amount = ev.deltaY;
      if (amount === 0) return;
      const dir = amount / Math.abs(amount);
      zoomspeed = dir / 10;
      minzoomspeed = 0.001;
    }

    function render() {
      if (!sceneRef.current || !cameraRef.current) return;

      const minzoom =
        labeldata[0].size * labeldata[0].scale * 1;
      const maxzoom =
        labeldata[labeldata.length - 1].size *
        labeldata[labeldata.length - 1].scale *
        100;
      let damping =
        Math.abs(zoomspeed) > minzoomspeed ? 0.95 : 1.0;

      const zoom = THREE.MathUtils.clamp(
        Math.pow(Math.E, zoompos),
        minzoom,
        maxzoom
      );
      zoompos = Math.log(zoom);

      if (
        (zoom === minzoom && zoomspeed < 0) ||
        (zoom === maxzoom && zoomspeed > 0)
      ) {
        damping = 0.85;
      }

      zoompos += zoomspeed;
      zoomspeed *= damping;

      cameraRef.current.position.x =
        Math.sin(0.5 * Math.PI * (mouse[0] - 0.5)) * zoom;
      cameraRef.current.position.y =
        Math.sin(0.25 * Math.PI * (mouse[1] - 0.5)) * zoom;
      cameraRef.current.position.z =
        Math.cos(0.5 * Math.PI * (mouse[0] - 0.5)) * zoom;
      cameraRef.current.lookAt(sceneRef.current.position);

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);
      render();
    }

    animate();

    window.addEventListener('mousemove', onMouseMove);
    containerRef.current.addEventListener('wheel', onMouseWheel, {
      passive: false,
    });

    function handleResize() {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current)
        return;
      SCREEN_WIDTH = containerRef.current.clientWidth;
      SCREEN_HEIGHT = containerRef.current.clientHeight;
      cameraRef.current.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeEventListener('wheel', onMouseWheel);
        if (rendererRef.current.domElement) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-2xl overflow-hidden"
      style={{ touchAction: 'none', width: '100%', height: '100%' }}
    />
  );
};

export default LogarithmicDepthScene;

