import { useEffect, useRef } from 'react';

const GLASS_LAYERS = [
  { blur: 0.5, from: 0, a: 12.5, b: 25, to: 37.5 },
  { blur: 0.83, from: 12.5, a: 25, b: 37.5, to: 50 },
  { blur: 1.66, from: 25, a: 37.5, b: 50, to: 62.5 },
  { blur: 3.31, from: 37.5, a: 50, b: 62.5, to: 75 },
  { blur: 6.63, from: 50, a: 62.5, b: 75, to: 87.5 },
  { blur: 13.25, from: 62.5, a: 75, b: 87.5, to: 100 },
  { blur: 26.5, from: 75, a: 87.5, b: 100, to: 100 },
  { blur: 53, from: 87.5, a: 100, b: 100, to: 100 },
];

function ProgressiveGlass() {
  return (
    <div
      className='pointer-events-none fixed inset-x-0 bottom-0 z-20 h-[132px] sm:h-[160px]'
      aria-hidden
    >
      {GLASS_LAYERS.map((layer, i) => (
        <div
          key={i}
          className='absolute inset-0'
          style={{
            zIndex: i + 1,
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: `linear-gradient(to bottom, transparent ${layer.from}%, black ${layer.a}%, black ${layer.b}%, transparent ${layer.to}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, transparent ${layer.from}%, black ${layer.a}%, black ${layer.b}%, transparent ${layer.to}%)`,
          }}
        />
      ))}
      <div
        className='absolute inset-0 z-[9] bg-gradient-to-b from-transparent via-black/10 to-black/45 dark:via-black/20 dark:to-black/70'
        aria-hidden
      />
    </div>
  );
}

export default function HeroAtmosphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles = [];
    let mx = -9999;
    let my = -9999;
    let lastW = 0;

    const mouseMove = (e) => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };

    const spawn = () => {
      const count = Math.max(160, Math.round((w * h) / 4200));
      particles = Array.from({ length: count }, () => {
        const topBias = Math.pow(Math.random(), 1.65);
        return {
          x: Math.random() * w,
          y: topBias * h * 0.92,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.12,
          r: Math.random() ** 2 * 1.8 + 0.35,
          a: Math.random() * 0.7 + 0.2,
        };
      });
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!particles.length || Math.abs(w - lastW) > 80) spawn();
      lastW = w;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const dark = document.documentElement.classList.contains('dark');
      for (const p of particles) {
        if (!reduced) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 110) {
            const force = ((110 - dist) / 110) * 0.55;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -4) p.x = w + 4;
          if (p.x > w + 4) p.x = -4;
          if (p.y < -4) p.y = h * 0.75;
          if (p.y > h * 0.78) p.y = -4;
        }
        ctx.beginPath();
        ctx.fillStyle = dark
          ? `rgba(255,255,255,${p.a})`
          : `rgba(10,10,10,${p.a * 0.35})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) draw();
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    const parent = canvas.parentElement;
    parent?.addEventListener('pointermove', mouseMove, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent?.removeEventListener('pointermove', mouseMove);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className='pointer-events-none absolute inset-0 z-0'
        aria-hidden
      />
      <ProgressiveGlass />
    </>
  );
}
