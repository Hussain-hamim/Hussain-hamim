import React, { useEffect, useState } from 'react';
import LazyWhenVisible from './LazyWhenVisible';

function StarsLottie() {
  const [Lottie, setLottie] = useState(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      import('lottie-react'),
      import('../assets/Stars.json'),
    ]).then(([lottieMod, starsMod]) => {
      if (cancelled) return;
      setLottie(() => lottieMod.default);
      setAnimationData(starsMod.default || starsMod);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!Lottie || !animationData) {
    return <div className='absolute inset-0 bg-[#0a0a0a]' aria-hidden />;
  }

  return (
    <div className='absolute inset-0 z-0 h-full w-full'>
      <Lottie
        animationData={animationData}
        loop
        rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
        style={{ width: '100%', height: '100%', minHeight: '100%' }}
      />
      <div className='absolute inset-0 bg-black/60' aria-hidden />
    </div>
  );
}

const ContactFooterWrap = ({ children }) => {
  return (
    <div className='relative overflow-hidden bg-[#0a0a0a]'>
      <LazyWhenVisible
        rootMargin='240px 0px'
        className='absolute inset-0 z-0 h-full w-full'
        fallback={<div className='absolute inset-0 bg-[#0a0a0a]' aria-hidden />}
      >
        <StarsLottie />
      </LazyWhenVisible>

      <div className='relative z-10'>{children}</div>
    </div>
  );
};

export default ContactFooterWrap;
