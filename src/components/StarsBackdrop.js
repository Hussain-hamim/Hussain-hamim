import React from 'react';
import Lottie from 'lottie-react';
import starsAnimation from '../assets/Stars.json';

export default function StarsBackdrop() {
  return (
    <div className='fixed top-0 left-0 right-0 h-screen min-h-screen z-0 pointer-events-none'>
      <div style={{ transform: 'scaleY(-1)', width: '100%', height: '100%' }}>
        <Lottie
          animationData={starsAnimation}
          loop
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          style={{ width: '100%', height: '100%', minHeight: '100%' }}
        />
      </div>
      <div className='absolute inset-0 bg-black/40' aria-hidden />
    </div>
  );
}
