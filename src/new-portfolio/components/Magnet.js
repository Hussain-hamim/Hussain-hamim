import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Magnetic hover — element follows the cursor within a padding zone.
 */
export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
  style,
}) {
  const ref = useRef(null);
  const activeRef = useRef(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const update = useCallback(
    (clientX, clientY) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const near =
        clientX >= rect.left - padding &&
        clientX <= rect.right + padding &&
        clientY >= rect.top - padding &&
        clientY <= rect.bottom + padding;

      if (near) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        if (!activeRef.current) {
          activeRef.current = true;
          setActive(true);
        }
        setOffset({
          x: (clientX - cx) / strength,
          y: (clientY - cy) / strength,
        });
      } else if (activeRef.current) {
        activeRef.current = false;
        setActive(false);
        setOffset({ x: 0, y: 0 });
      }
    },
    [padding, strength]
  );

  useEffect(() => {
    const onMove = (e) => update(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [update]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: active ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
