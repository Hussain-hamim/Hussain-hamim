import { motion } from 'framer-motion';

/**
 * Fade-in on scroll via whileInView.
 * `as` = DOM tag name (div, p, h1, …).
 */
export default function FadeIn({
  as = 'div',
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  style,
}) {
  const Comp = motion[as] || motion.div;

  return (
    <Comp
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0.01 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </Comp>
  );
}
