import { useEffect, useRef } from 'react';

function shortestAngle(a, b) {
  let d = (b - a) % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

/**
 * Smooth custom cursor from hpbrn-cc:
 * spring-follow, rotate to travel direction, squash-stretch, hand on clickables.
 */
export default function SmoothCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const STIFFNESS = 900;
    const DAMPING = 55;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let vx = 0;
    let vy = 0;
    let angle = 0;
    let angleV = 0;
    let targetAngle = 0;
    let scale = 1;
    let visible = false;
    let last = performance.now();
    let raf = 0;

    function onMove(e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        x = tx;
        y = ty;
        el.style.opacity = '1';
      }
    }
    function onLeave() {
      el.style.opacity = '0';
    }
    function onEnter() {
      if (visible) el.style.opacity = '1';
    }
    function syncCursorMode(target) {
      const isHand = Boolean(
        target?.closest("a, button, [data-clickable], [role='button']")
      );
      el.classList.toggle('is-hand', isHand);
    }
    function onPointerOver(e) {
      syncCursorMode(e.target);
    }
    function onPointerOut(e) {
      syncCursorMode(e.relatedTarget);
    }

    function frame(now) {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      const FIXED = 1 / 360;
      const sub = Math.max(1, Math.ceil(dt / FIXED));
      const h = dt / sub;

      const preSpeed = Math.hypot(vx, vy);
      if (preSpeed > 35) {
        const raw = (Math.atan2(vy, vx) * 180) / Math.PI + 90;
        targetAngle = angle + shortestAngle(angle, raw);
      }

      const R_STIFFNESS = 300;
      const R_DAMPING = 60;
      for (let i = 0; i < sub; i++) {
        const ax = STIFFNESS * (tx - x) - DAMPING * vx;
        const ay = STIFFNESS * (ty - y) - DAMPING * vy;
        vx += ax * h;
        vy += ay * h;
        x += vx * h;
        y += vy * h;

        const ra = R_STIFFNESS * (targetAngle - angle) - R_DAMPING * angleV;
        angleV += ra * h;
        angle += angleV * h;
      }

      const speed = Math.hypot(vx, vy);
      const stretch = Math.min(speed / 4200, 0.32);
      const targetScale = 1 + stretch;
      scale += (targetScale - scale) * (1 - Math.exp(-14 * dt));
      const sx = 1 - stretch * 0.42;

      el.style.transform = `translate3d(${x - 12.5}px, ${y - 2.5}px, 0) rotate(${angle}deg) scale(${sx}, ${scale})`;
      raf = requestAnimationFrame(frame);
    }

    document.documentElement.classList.add('has-smooth-cursor');
    window.addEventListener('mousemove', onMove);
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(frame);

    return () => {
      document.documentElement.classList.remove('has-smooth-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className='smooth-cursor' aria-hidden>
      <svg
        className='cursor-arrow'
        xmlns='http://www.w3.org/2000/svg'
        width={25}
        height={27}
        viewBox='0 0 50 54'
        fill='none'
      >
        <path
          d='M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z'
          fill='var(--cursor-fill)'
          stroke='var(--cursor-stroke)'
          strokeWidth={4.5}
          strokeLinejoin='round'
          strokeLinecap='round'
        />
      </svg>
      <svg
        className='cursor-hand'
        xmlns='http://www.w3.org/2000/svg'
        width={27}
        height={27}
        viewBox='0 0 54 54'
        fill='none'
      >
        <path
          d='M20.5 31V10.5C20.5 6.5 23 4 26 4C29 4 31.5 6.5 31.5 10.5V22V15C31.5 11.5 34 9.5 37 9.5C40 9.5 42 12 42 15.5V24V18C42 14.5 44.5 12.5 47.5 12.5C50.5 12.5 51.5 15 51.5 18.5V33C51.5 45 43 52 32 52H28C21.5 52 17 48.5 13 44L4.5 34.5C1.5 31 2 27.5 4.5 25C7 22.5 10.5 23 13 25.5L20.5 33Z'
          fill='var(--cursor-fill)'
          stroke='var(--cursor-stroke)'
          strokeWidth={4.5}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
}
