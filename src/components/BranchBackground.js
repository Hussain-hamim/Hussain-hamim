import React, { useEffect, useRef } from 'react';

// Anthony Fu's ArtPlum, adapted from antfu/antfu.me and the antfu-site prototype.
// Original code: https://github.com/antfu/antfu.me/blob/main/src/components/ArtPlum.vue
// MIT license: public/licenses/antfu-ArtPlum-LICENSE.txt
const FRAME_INTERVAL = 1000 / 40;
const MASK = 'radial-gradient(circle, transparent, black)';
const MAX_CANVAS_PIXELS = 4_000_000;
const MAX_CANVAS_SIDE = 8192;

export default function BranchBackground({ className = '-z-10' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!container || !ctx) return undefined;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const { random } = Math;
    let width = 0;
    let height = 0;
    let dpi = 1;
    let steps = [];
    let frameId = null;
    let resizeTimer;
    let lastTime = 0;
    let inView = false;
    let needsRedraw = true;

    function pixelRatio() {
      // Bound memory for long project pages while keeping smaller sections sharp.
      return Math.min(
        window.devicePixelRatio || 1,
        2,
        Math.sqrt(MAX_CANVAS_PIXELS / Math.max(1, width * height)),
        MAX_CANVAS_SIDE / Math.max(1, width, height)
      );
    }

    function branch(x, y, angle, counter = { value: 0 }) {
      const length = random() * 6;
      counter.value += 1;
      const nx = x + length * Math.cos(angle);
      const ny = y + length * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      const left = angle + random() * Math.PI / 12;
      const right = angle - random() * Math.PI / 12;
      if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100) return;

      const rate = counter.value <= 30 ? 0.8 : 0.5;
      if (random() < rate) steps.push(() => branch(nx, ny, left, counter));
      if (random() < rate) steps.push(() => branch(nx, ny, right, counter));
    }

    function grow() {
      const previous = steps;
      steps = [];
      previous.forEach((step) => {
        if (random() < 0.5) steps.push(step);
        else step();
      });
    }

    function pause() {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
    }

    function resume() {
      if (frameId !== null || !steps.length || !inView || document.hidden || motion.matches) return;
      frameId = requestAnimationFrame(frame);
    }

    function frame(time) {
      frameId = null;
      if (!inView || document.hidden || motion.matches) return;
      if (time - lastTime >= FRAME_INTERVAL) {
        lastTime = time;
        grow();
      }
      resume();
    }

    function start() {
      pause();
      width = container.clientWidth;
      height = container.clientHeight;
      steps = [];
      if (!width || !height) return;
      dpi = pixelRatio();
      needsRedraw = false;

      canvas.width = Math.round(width * dpi);
      canvas.height = Math.round(height * dpi);
      ctx.setTransform(dpi, 0, 0, dpi, 0, 0);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(215, 255, 0, 0.14)';
      const middle = () => random() * 0.6 + 0.2;
      steps = [
        () => branch(middle() * width, -5, Math.PI / 2),
        () => branch(middle() * width, height + 5, -Math.PI / 2),
        () => branch(-5, middle() * height, 0),
        () => branch(width + 5, middle() * height, Math.PI),
      ];
      if (width < 500) steps = steps.slice(0, 2);
      lastTime = performance.now();

      if (motion.matches) {
        // Keep a still drawing when the visitor prefers less motion.
        for (let n = 0; n < 160 && steps.length; n += 1) grow();
        steps = [];
      } else {
        resume();
      }
    }

    function syncSize() {
      if (!inView) return;
      if (
        needsRedraw || width !== container.clientWidth ||
        height !== container.clientHeight || dpi !== pixelRatio()
      ) start();
      else resume();
    }

    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(syncSize, 200);
    }

    function motionChange() {
      needsRedraw = true;
      syncSize();
    }

    function visibilityChange() {
      if (document.hidden) pause();
      else resume();
    }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) syncSize();
      else pause();
    });

    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', visibilityChange);
    motion.addEventListener('change', motionChange);

    return () => {
      pause();
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibilityChange);
      motion.removeEventListener('change', motionChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden='true'
      className={`pointer-events-none absolute inset-0 overflow-hidden print:hidden ${className}`}
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
    >
      <canvas ref={canvasRef} className='block h-full w-full' />
    </div>
  );
}
