import React from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Stars, Sparkles } from "@react-three/drei";

const SpaceGame = () => {
  return (
    <div className="absolute inset-0 z-0 bg-black w-full h-full min-h-screen">
      <Canvas style={{ width: "100%", height: "100%" }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <color attach="background" args={["#050505"]} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Beautiful Background - KEPT AS REQUESTED */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={2}
        />
        <Sparkles
          count={100}
          scale={12}
          size={4}
          speed={0.4}
          opacity={0.1}
          color="#00FFFF"
        />

        {/* Grid Floor Effect for depth */}
        <gridHelper
          args={[100, 50, 0x222222, 0x111111]}
          position={[0, -5, 0]}
          rotation={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
};

export default SpaceGame;
