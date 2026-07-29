import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Character-by-character scroll-reveal text.
 * Each char goes from opacity 0.2 → 1 as the paragraph scrolls through view.
 */
export default function AnimatedText({ text, className = '', style }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = Array.from(text);

  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => (
        <Char
          key={`${i}-${char}`}
          char={char}
          index={i}
          total={chars.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function Char({ char, index, total, progress }) {
  // Sweep across the string: each character lights up in sequence
  const start = index / total;
  const end = Math.min(1, start + Math.max(0.08, 1 / total));
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  if (char === ' ') {
    return <span className='inline-block'>&nbsp;</span>;
  }

  return (
    <span className='relative inline-block'>
      <span className='invisible' aria-hidden>
        {char}
      </span>
      <motion.span style={{ opacity }} className='absolute left-0 top-0'>
        {char}
      </motion.span>
    </span>
  );
}
