import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const WORDS = ['Design', 'Create', 'Ship'];
const DURATION_MS = 2700;

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let done = false;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      const next = Math.floor(t * 100);
      setCount(next);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!done) {
        done = true;
        setCount(100);
        window.setTimeout(() => onComplete?.(), 400);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className='bg-studio fixed inset-0 z-[9999] flex flex-col justify-between p-6 md:p-10'>
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className='text-studio-muted text-xs uppercase tracking-[0.3em]'
      >
        Portfolio
      </motion.p>

      <div className='flex flex-1 items-center justify-center'>
        <AnimatePresence mode='wait'>
          <motion.span
            key={WORDS[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className='font-display text-4xl italic text-white/80 md:text-6xl lg:text-7xl'
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className='space-y-6'>
        <p className='font-display text-studio text-right text-6xl tabular-nums md:text-8xl lg:text-9xl'>
          {String(count).padStart(3, '0')}
        </p>
        <div className='h-[3px] w-full overflow-hidden rounded-full bg-white/10'>
          <div
            className='accent-gradient h-full origin-left'
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
