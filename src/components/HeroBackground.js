import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const AnimatedSphere = () => {
  const sphereRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock, mouse }) => {
    if (sphereRef.current) {
      // Basic rotation
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;

      // Mouse interaction - subtle tilt based on pointer position
      const x = (mouse.x * 0.5);
      const y = (mouse.y * 0.5);
      
      sphereRef.current.rotation.x += y;
      sphereRef.current.rotation.y += x;
    }
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={1} 
      floatIntensity={2}
      floatingRange={[-0.2, 0.2]}
    >
      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        {/* Inner solid core */}
        <Sphere args={[1, 100, 100]} scale={2.4} ref={sphereRef}>
          <MeshDistortMaterial
            color={hovered ? "#14b8a6" : "#222"} // Teal on hover, dark otherwise
            attach="material"
            distort={hovered ? 0.6 : 0.4} // More distortion on hover
            speed={hovered ? 4 : 2}
            roughness={0.4}
            metalness={0.8}
            wireframe
          />
        </Sphere>

        {/* Outer glowing aura */}
        <Sphere args={[1, 100, 100]} scale={2.5} position={[0, 0, -0.1]}>
          <MeshDistortMaterial
            color={hovered ? "#D7FF00" : "#D7FF00"}
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={1}
            opacity={hovered ? 0.5 : 0.3}
            transparent
          />
        </Sphere>
      </group>
    </Float>
  );
};

// Scene component to access useThree hooks
const SceneContent = () => {
  const groupRef = useRef();
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    // Make the sphere follow the mouse position completely
    if (groupRef.current) {
        // Convert normalized mouse coordinates (-1 to 1) to viewport coordinates
        const x = (mouse.x * viewport.width) / 2;
        const y = (mouse.y * viewport.height) / 2;
        
        // Lerp for smooth movement, but follow the mouse across the entire screen
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, 0.1);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <AnimatedSphere />
    </group>
  );
};

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#D7FF00" intensity={0.5} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default HeroBackground;
