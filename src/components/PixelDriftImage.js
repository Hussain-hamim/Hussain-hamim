import { useEffect, useRef } from 'react';

function cubicBezier(x1, y1, x2, y2) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 12; i++) {
      const mid = (lo + hi) / 2;
      const sx = sampleX(mid);
      if (Math.abs(sx - x) < 1e-6) {
        t = mid;
        break;
      }
      if (sx < x) lo = mid;
      else hi = mid;
      t = mid;
    }
    return sampleY(t);
  };
}

function resolveEasingFn(trans) {
  const linear = (t) => t;
  if (!trans || trans.type === 'spring') return linear;
  const ease = trans.ease;
  if (
    Array.isArray(ease) &&
    ease.length === 4 &&
    ease.every((v) => typeof v === 'number')
  ) {
    return cubicBezier(ease[0], ease[1], ease[2], ease[3]);
  }
  if (typeof ease === 'string') {
    switch (ease) {
      case 'easeIn':
        return (t) => t * t;
      case 'easeOut':
        return (t) => 1 - (1 - t) * (1 - t);
      case 'easeInOut':
        return (t) =>
          t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      default:
        return linear;
    }
  }
  return linear;
}

function resolveDuration(trans) {
  if (!trans || trans.type === 'spring') return 0.45;
  const d = trans.duration;
  return typeof d === 'number' && d > 0 ? d : 0.45;
}

/**
 * Pixel Drift — photo stays sharp; on hover image RGB samples drift with cursor.
 * @see https://www.originkit.dev/
 */
export default function PixelDriftImage({
  src,
  particleSize = 4,
  particleCount = 80,
  mouseEnabled = true,
  mouseRadius = 28,
  mouseForce = 24,
  transition = { type: 'tween', duration: 0.4, ease: 'easeOut' },
  activeOnlyOnHover = false,
  drawBaseImage = false,
  onlyDisplaced = false,
  className = '',
  style,
  alt = '',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const pointerRef = useRef({ x: -99999, y: -99999, active: false });
  const hoveringRef = useRef(false);
  const formValRef = useRef(activeOnlyOnHover ? 0 : 1);
  const lastFrameRef = useRef(null);
  const imgRef = useRef(null);

  const transitionKey = JSON.stringify(transition ?? {});

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !src) return undefined;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    let count = 0;
    let ox = new Float32Array(0);
    let oy = new Float32Array(0);
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let repX = new Float32Array(0);
    let repY = new Float32Array(0);
    let pr = new Uint8Array(0);
    let pg = new Uint8Array(0);
    let pb = new Uint8Array(0);
    let pa = new Uint8Array(0);

    let prevMx = -99999;
    let prevMy = -99999;
    let mouseSpeed = 0;
    let smoothX = -99999;
    let smoothY = -99999;

    let cssW = 0;
    let cssH = 0;
    let dpr = 1;
    let cancelled = false;
    let cell = Math.max(1, particleSize / 4);
    let sampled = false;

    const sampleImage = () => {
      const W = cssW;
      const H = cssH;
      const img = imgRef.current;
      if (W <= 0 || H <= 0 || !img || !img.complete) return;

      const off = document.createElement('canvas');
      off.width = Math.max(1, Math.floor(W * dpr));
      off.height = Math.max(1, Math.floor(H * dpr));
      const offCtx = off.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;
      offCtx.scale(dpr, dpr);

      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      const scale = Math.max(W / iw, H / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      offCtx.clearRect(0, 0, W, H);
      offCtx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);

      const imgData = offCtx.getImageData(
        0,
        0,
        Math.floor(W * dpr),
        Math.floor(H * dpr)
      );
      const data = imgData.data;

      const cx = W / 2;
      const cy = H / 2;
      const radius = Math.min(W, H) / 2;
      const radiusSq = radius * radius;

      const pCount = Math.max(1, Math.min(100, particleCount));
      // Higher count → tighter grid (stride 1 at top end for denser photo pixels)
      const stride = Math.max(1, Math.round(90 / pCount));
      cell = Math.max(stride * 0.92, Math.max(1, particleSize / 4));

      let candidates = 0;
      for (let y = 0; y < H; y += stride) {
        for (let x = 0; x < W; x += stride) {
          const dxp = x - cx;
          const dyp = y - cy;
          if (dxp * dxp + dyp * dyp > radiusSq) continue;
          const ix = Math.floor(x * dpr);
          const iy = Math.floor(y * dpr);
          const idx = (iy * imgData.width + ix) * 4;
          if (data[idx + 3] > 20) candidates++;
        }
      }

      const downsample =
        candidates > 60000 ? Math.ceil(candidates / 60000) : 1;
      const allocCount = Math.min(candidates, 60000);

      const newOx = new Float32Array(allocCount);
      const newOy = new Float32Array(allocCount);
      const newPx = new Float32Array(allocCount);
      const newPy = new Float32Array(allocCount);
      const newR = new Uint8Array(allocCount);
      const newG = new Uint8Array(allocCount);
      const newB = new Uint8Array(allocCount);
      const newA = new Uint8Array(allocCount);

      let i = 0;
      let seen = 0;
      for (let y = 0; y < H && i < allocCount; y += stride) {
        for (let x = 0; x < W && i < allocCount; x += stride) {
          const dxp = x - cx;
          const dyp = y - cy;
          if (dxp * dxp + dyp * dyp > radiusSq) continue;
          const ix = Math.floor(x * dpr);
          const iy = Math.floor(y * dpr);
          const idx = (iy * imgData.width + ix) * 4;
          if (data[idx + 3] > 20) {
            if (seen % downsample === 0) {
              newOx[i] = x;
              newOy[i] = y;
              newPx[i] = x;
              newPy[i] = y;
              newR[i] = data[idx];
              newG[i] = data[idx + 1];
              newB[i] = data[idx + 2];
              newA[i] = data[idx + 3];
              i++;
            }
            seen++;
          }
        }
      }

      count = i;
      ox = newOx;
      oy = newOy;
      px = newPx;
      py = newPy;
      repX = new Float32Array(allocCount);
      repY = new Float32Array(allocCount);
      pr = newR;
      pg = newG;
      pb = newB;
      pa = newA;
      sampled = true;
      lastFrameRef.current = null;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      if (w <= 0 || h <= 0) return;
      dpr = Math.max(
        1,
        Math.min(
          2,
          typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
        )
      );
      cssW = w;
      cssH = h;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sampleImage();
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (cancelled) return;
      imgRef.current = img;
      resize();
    };
    img.src = src;

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);

    const onEnter = () => {
      hoveringRef.current = true;
    };
    const onLeavePointer = () => {
      pointerRef.current.x = -99999;
      pointerRef.current.y = -99999;
      pointerRef.current.active = false;
      prevMx = -99999;
      prevMy = -99999;
      mouseSpeed = 0;
      smoothX = -99999;
      smoothY = -99999;
    };
    const onContainerLeave = () => {
      hoveringRef.current = false;
      onLeavePointer();
    };
    const onMove = (e) => {
      if (!mouseEnabled) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = rect.width > 0 ? cssW / rect.width : 1;
      const scaleY = rect.height > 0 ? cssH / rect.height : 1;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;
      if (prevMx > -9000) {
        mouseSpeed = Math.hypot(mx - prevMx, my - prevMy);
      }
      prevMx = mx;
      prevMy = my;
      pointerRef.current.x = mx;
      pointerRef.current.y = my;
      pointerRef.current.active = true;
    };

    container.addEventListener('pointerenter', onEnter);
    container.addEventListener('pointerleave', onContainerLeave);
    container.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointermove', onMove);

    const easeFn = resolveEasingFn(transition);
    const formMs = Math.max(0, resolveDuration(transition) * 1000);
    const mcRadius = typeof mouseRadius === 'number' ? mouseRadius : 28;
    const mcForce = typeof mouseForce === 'number' ? mouseForce : 24;
    const colorBuckets = new Map();
    const displaceMin = 0.6;

    const drawFrame = () => {
      ctx.clearRect(0, 0, cssW, cssH);
      if (!sampled) return;

      if (
        activeOnlyOnHover &&
        !hoveringRef.current &&
        formValRef.current <= 0.001
      ) {
        return;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(cssW / 2, cssH / 2, Math.min(cssW, cssH) / 2, 0, Math.PI * 2);
      ctx.clip();

      if (drawBaseImage && imgRef.current) {
        const img = imgRef.current;
        const iw = img.naturalWidth || img.width;
        const ih = img.naturalHeight || img.height;
        const scale = Math.max(cssW / iw, cssH / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        ctx.drawImage(img, (cssW - dw) / 2, (cssH - dh) / 2, dw, dh);
      }

      const prPtr = pointerRef.current;
      const half = cell / 2;

      const now = typeof performance !== 'undefined' ? performance.now() : 0;
      const last = lastFrameRef.current ?? now;
      const dt = Math.min(64, Math.max(0, now - last));
      lastFrameRef.current = now;

      const target = hoveringRef.current ? 1 : 0;
      let v = formValRef.current;
      if (formMs <= 0) v = target;
      else {
        const stepv = dt / formMs;
        if (v < target) v = Math.min(target, v + stepv);
        else if (v > target) v = Math.max(target, v - stepv);
      }
      formValRef.current = v;
      const driftStrength = easeFn(v);

      const hitSpeed = mouseSpeed;
      mouseSpeed *= 0.88;
      const active =
        mouseEnabled &&
        prPtr.active &&
        hoveringRef.current &&
        driftStrength > 0.05;

      if (active) {
        const lerpFactor = Math.max(0.08, 0.3 - hitSpeed * 0.006);
        if (smoothX < -9000) {
          smoothX = prPtr.x;
          smoothY = prPtr.y;
        } else {
          smoothX += (prPtr.x - smoothX) * lerpFactor;
          smoothY += (prPtr.y - smoothY) * lerpFactor;
        }
      } else {
        smoothX = -99999;
        smoothY = -99999;
      }

      const mx = smoothX;
      const my = smoothY;
      const repCutoff = Math.max(1, mcRadius);
      const repCutoffSq = repCutoff * repCutoff;
      const rF = mcForce;

      colorBuckets.clear();

      for (let i = 0; i < count; i++) {
        const oxi = ox[i];
        const oyi = oy[i];

        let inZone = false;
        if (active) {
          const dx = oxi - mx;
          const dy = oyi - my;
          const distSq = dx * dx + dy * dy;
          if (distSq > 0 && distSq < repCutoffSq) {
            const dist = Math.sqrt(distSq);
            const nx = dx / dist;
            const ny = dy / dist;
            const falloff = 1 - dist / repCutoff;
            const push = falloff * hitSpeed * rF * 0.05 * driftStrength;
            repX[i] += nx * push;
            repY[i] += ny * push;
            const targetRepX = nx * (repCutoff - dist) * driftStrength;
            const targetRepY = ny * (repCutoff - dist) * driftStrength;
            repX[i] += (targetRepX - repX[i]) * 0.08;
            repY[i] += (targetRepY - repY[i]) * 0.08;
            inZone = true;
          }
        }
        if (!inZone) {
          repX[i] *= hoveringRef.current ? 0.9 : 0.75;
          repY[i] *= hoveringRef.current ? 0.9 : 0.75;
        }

        px[i] = oxi + repX[i];
        py[i] = oyi + repY[i];

        // Keep sharp photo visible: only paint pixels that actually moved
        if (onlyDisplaced) {
          const mag = Math.hypot(repX[i], repY[i]);
          if (mag < displaceMin) continue;
        }

        const key = (pr[i] << 16) | (pg[i] << 8) | pb[i];
        let bucket = colorBuckets.get(key);
        if (!bucket) {
          bucket = [];
          colorBuckets.set(key, bucket);
        }
        bucket.push(i);
      }

      for (const [key, bucket] of colorBuckets) {
        const r = (key >> 16) & 255;
        const g = (key >> 8) & 255;
        const b = key & 255;
        const a0 = pa[bucket[0]] / 255;
        ctx.fillStyle = `rgba(${r},${g},${b},${a0})`;
        for (let k = 0; k < bucket.length; k++) {
          const i = bucket[k];
          ctx.fillRect(px[i] - half, py[i] - half, cell, cell);
        }
      }

      ctx.restore();
    };

    const loop = () => {
      drawFrame();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelled = true;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      container.removeEventListener('pointerenter', onEnter);
      container.removeEventListener('pointerleave', onContainerLeave);
      container.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointermove', onMove);
      ro.disconnect();
    };
  }, [
    src,
    particleSize,
    particleCount,
    mouseEnabled,
    mouseRadius,
    mouseForce,
    transitionKey,
    transition,
    activeOnlyOnHover,
    drawBaseImage,
    onlyDisplaced,
  ]);

  return (
    <div
      ref={containerRef}
      className={className}
      role='img'
      aria-label={alt}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}
