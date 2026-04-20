import React from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Sparkles } from '@react-three/drei';

export default function ProfileAvatarCanvas() {
  return (
    <Canvas
      gl={{ alpha: true, premultipliedAlpha: false }}
      style={{ background: 'transparent' }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <Stars
        radius={50}
        depth={30}
        count={900}
        factor={3}
        saturation={0}
        fade
        speed={2}
      />
      <Sparkles
        count={32}
        scale={8}
        size={2.5}
        speed={0.4}
        opacity={0.2}
        color='#00FFFF'
      />
    </Canvas>
  );
}
