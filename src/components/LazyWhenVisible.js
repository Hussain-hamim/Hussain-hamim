import React, { useEffect, useRef, useState } from 'react';

/**
 * Mounts children only when near the viewport (or after idle if rootMargin is huge).
 * Keeps initial JS/paint light for below-the-fold heavy sections.
 */
export default function LazyWhenVisible({
  children,
  rootMargin = '400px 0px',
  minHeight,
  className = '',
  fallback = null,
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, show]);

  return (
    <div
      ref={ref}
      className={className}
      style={minHeight && !show ? { minHeight } : undefined}
    >
      {show ? children : fallback}
    </div>
  );
}
