import React, { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { registerDeferredContent } from '../utils/sectionNavigation';

function Ready({ children, onReady }) {
  useLayoutEffect(onReady, [onReady]);
  return children;
}

/** Mount heavy content near the viewport while retaining its layout fallback. */
export default function LazyWhenVisible({
  children,
  eager = false,
  rootMargin = '400px 0px',
  minHeight,
  className = '',
  fallback = null,
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(eager);
  const ready = useRef(false);
  const waiters = useRef([]);
  const finish = useCallback(() => {
    ready.current = true;
    waiters.current.splice(0).forEach(resolve => resolve());
  }, []);
  const reveal = useCallback(() => {
    if (ready.current) return Promise.resolve();
    setShow(true);
    return new Promise(resolve => waiters.current.push(resolve));
  }, []);

  useLayoutEffect(() => {
    const pending = waiters.current;
    const unregister = registerDeferredContent(ref.current, reveal);
    return () => {
      unregister();
      pending.splice(0).forEach(resolve => resolve());
    };
  }, [reveal]);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShow(true);
        io.disconnect();
      }
    }, { rootMargin, threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, show]);

  return (
    <div ref={ref} className={className} style={minHeight && !show ? { minHeight } : undefined}>
      {show ? <Suspense fallback={fallback}><Ready onReady={finish}>{children}</Ready></Suspense> : fallback}
    </div>
  );
}
