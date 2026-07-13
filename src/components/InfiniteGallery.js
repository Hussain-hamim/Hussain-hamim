import { useMotionValue } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';

const DEFAULT_IMAGES = [
  {
    src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/612d1402-0ad9-4135-3bbc-a30a6a252b00/w=800',
    alt: 'Gallery 1',
  },
  {
    src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/6d2ad64a-102d-4eab-0efe-31479e34b500/w=800',
    alt: 'Gallery 2',
  },
  {
    src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/be854dd1-37aa-4fc7-f569-fdb948109300/w=800',
    alt: 'Gallery 3',
  },
  {
    src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/51984031-9176-484b-f5e0-4af9a8e9ed00/w=800',
    alt: 'Gallery 4',
  },
];

function hash3(cx, cy, cz, salt) {
  let h = (cx | 0) * 0x8da6b343;
  h ^= Math.imul(cy | 0, 0xd8163841);
  h ^= Math.imul(cz | 0, 0xcb1ab31f);
  h ^= salt | 0;
  h ^= h >>> 16;
  h = Math.imul(h, 0x7feb352d);
  h ^= h >>> 15;
  h = Math.imul(h, 0x846ca68b);
  h ^= h >>> 16;
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

const PX_PER_UNIT = 6;
const CELL_SIZE = 110;
const MAX_RANGE = 20;

/**
 * Infinite Gallery / Infinity Canvas adapted from Originkit.
 * @see https://www.originkit.dev/
 */
export default function InfiniteGallery(props) {
  const merged = { ...COMPONENT_DEFAULTS, ...props };
  const {
    width,
    height,
    className,
    images,
    density,
    imageWidth,
    imageHeight,
    rounded,
    dragSpeed,
    driftAmount,
    friction,
    backgroundColor,
    style,
    initialX,
    initialY,
    initialZoom,
  } = merged;

  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  const safeImages =
    Array.isArray(images) && images.length > 0 ? images : DEFAULT_IMAGES;
  const safeDensity = Math.max(1, Math.min(15, Math.floor(density || 5)));
  const safeImageWidth = Math.max(8, Math.min(4000, imageWidth || 150));
  const safeImageHeight = Math.max(8, Math.min(4000, imageHeight || 150));
  const safeRounded = Math.max(0, Math.min(20, rounded ?? 3));
  const safeDragSpeed = Math.max(0.1, Math.min(5, (dragSpeed || 20) / 20));
  const safeDriftAmount = Math.max(0, Math.min(20, driftAmount ?? 8));
  const safeFriction =
    1 - (Math.max(1, Math.min(20, friction ?? 10)) / 20) * 0.3;

  // Start mid-cell + slightly zoomed out so several tiles fill the frame
  // (camera 0,0 sits on a cell corner and often shows one image in a corner).
  const startX =
    typeof initialX === 'number' && Number.isFinite(initialX)
      ? initialX
      : CELL_SIZE * 0.55;
  const startY =
    typeof initialY === 'number' && Number.isFinite(initialY)
      ? initialY
      : CELL_SIZE * 0.45;
  const startZoom =
    typeof initialZoom === 'number' && Number.isFinite(initialZoom)
      ? initialZoom
      : -0.42;

  const targetX = useMotionValue(startX);
  const targetY = useMotionValue(startY);
  const camX = useMotionValue(startX);
  const camY = useMotionValue(startY);
  const velX = useMotionValue(0);
  const velY = useMotionValue(0);

  const targetLogZoom = useMotionValue(startZoom);
  const logZoom = useMotionValue(startZoom);
  const velLogZoom = useMotionValue(0);

  const driftTX = useMotionValue(0);
  const driftTY = useMotionValue(0);
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);

  const subN = Math.max(1, Math.ceil(Math.sqrt(safeDensity)));
  const subSize = CELL_SIZE / subN;
  const SUBCELL_INNER_PAD = 0.1;
  const effectivePerCell = Math.min(safeDensity, subN * subN);
  const imagesCount = safeImages.length;
  const SCALE_MIN = 0.45;
  const SCALE_MAX = 1.6;

  const generateCell = useMemo(() => {
    return (gx, gy, octave) => {
      const seed = hash3(gx, gy, octave | 0, 0x9e3779b1);
      const rand = mulberry32(seed);

      const totalSubs = subN * subN;
      const subs = new Array(totalSubs);
      for (let i = 0; i < totalSubs; i++) subs[i] = i;
      for (let i = totalSubs - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        const tmp = subs[i];
        subs[i] = subs[j];
        subs[j] = tmp;
      }

      const tiles = [];
      const count = Math.min(effectivePerCell, totalSubs);
      const pad = subSize * SUBCELL_INNER_PAD;
      const innerRange = Math.max(0, subSize - pad * 2);
      const cellX0 = gx * CELL_SIZE;
      const cellY0 = gy * CELL_SIZE;
      const wWorld = safeImageWidth / PX_PER_UNIT;
      const hWorld = safeImageHeight / PX_PER_UNIT;

      for (let slot = 0; slot < count; slot++) {
        const subIdx = subs[slot];
        const sx = subIdx % subN;
        const sy = Math.floor(subIdx / subN);
        const wx = cellX0 + sx * subSize + pad + rand() * innerRange;
        const wy = cellY0 + sy * subSize + pad + rand() * innerRange;
        const bakedScale = SCALE_MIN + rand() * (SCALE_MAX - SCALE_MIN);
        const imgIdx =
          imagesCount > 0
            ? Math.floor(rand() * imagesCount) % imagesCount
            : 0;

        tiles.push({
          wx,
          wy,
          cx: gx,
          cy: gy,
          slot,
          octave,
          imgIdx,
          w: wWorld,
          h: hWorld,
          rot: 0,
          bakedScale,
        });
      }

      return tiles;
    };
  }, [
    imagesCount,
    safeImageWidth,
    safeImageHeight,
    subN,
    subSize,
    effectivePerCell,
  ]);

  useEffect(() => {
    const scene = sceneRef.current;
    const container = containerRef.current;
    if (!scene) return undefined;

    let cW = container ? container.clientWidth || 900 : 900;
    let cH = container ? container.clientHeight || 600 : 600;
    const ro = new ResizeObserver(() => {
      if (container) {
        cW = container.clientWidth || cW;
        cH = container.clientHeight || cH;
      }
    });
    if (container) ro.observe(container);

    const layerPools = new Map();

    const getPool = (octave) => {
      let pool = layerPools.get(octave);
      if (!pool) {
        pool = { tileEls: new Map(), imgEls: new Map() };
        layerPools.set(octave, pool);
      }
      return pool;
    };

    const disposeLayer = (octave) => {
      const pool = layerPools.get(octave);
      if (!pool) return;
      pool.tileEls.forEach((el) => {
        if (el.parentNode === scene) scene.removeChild(el);
      });
      pool.tileEls.clear();
      pool.imgEls.clear();
      layerPools.delete(octave);
    };

    const disposeAllLayers = () => {
      Array.from(layerPools.keys()).forEach(disposeLayer);
    };

    const removeTile = (octave, key) => {
      const pool = layerPools.get(octave);
      if (!pool) return;
      const el = pool.tileEls.get(key);
      if (el && el.parentNode === scene) scene.removeChild(el);
      pool.tileEls.delete(key);
      pool.imgEls.delete(key);
    };

    const ensureTile = (t) => {
      const pool = getPool(t.octave);
      const key = `${t.cx},${t.cy},${t.slot}`;
      let el = pool.tileEls.get(key);
      if (!el) {
        el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.left = '50%';
        el.style.top = '50%';
        el.style.transformOrigin = '0 0';
        el.style.willChange = 'transform, opacity';
        el.style.pointerEvents = 'none';
        el.dataset.tileKey = key;

        const img = document.createElement('img');
        const src = safeImages[t.imgIdx];
        img.src = src?.src || '';
        if (src?.srcSet) img.srcset = src.srcSet;
        img.alt = src?.alt || '';
        img.draggable = false;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.display = 'block';
        img.style.pointerEvents = 'none';
        img.style.userSelect = 'none';
        el.appendChild(img);

        scene.appendChild(el);
        pool.tileEls.set(key, el);
        pool.imgEls.set(key, img);
      }
      return el;
    };

    const projectLayer = (
      octave,
      layerScale,
      layerAlpha,
      layerZBase,
      cx,
      cy
    ) => {
      const pool = getPool(octave);
      const camCellX = Math.floor(cx / CELL_SIZE);
      const camCellY = Math.floor(cy / CELL_SIZE);

      const worldHalfX = cW / 2 / (PX_PER_UNIT * layerScale);
      const worldHalfY = cH / 2 / (PX_PER_UNIT * layerScale);
      const rangeX = Math.min(
        MAX_RANGE,
        Math.ceil(worldHalfX / CELL_SIZE) + 1
      );
      const rangeY = Math.min(
        MAX_RANGE,
        Math.ceil(worldHalfY / CELL_SIZE) + 1
      );

      const visibleKeys = new Set();
      const tilesThisFrame = [];

      for (let dy = -rangeY; dy <= rangeY; dy++) {
        for (let dx = -rangeX; dx <= rangeX; dx++) {
          const tiles = generateCell(camCellX + dx, camCellY + dy, octave);
          for (let i = 0; i < tiles.length; i++) {
            tilesThisFrame.push(tiles[i]);
          }
        }
      }

      const orderKeys = new Array(tilesThisFrame.length);
      const orderScale = new Array(tilesThisFrame.length);

      for (let i = 0; i < tilesThisFrame.length; i++) {
        const t = tilesThisFrame[i];
        const key = `${t.cx},${t.cy},${t.slot}`;
        visibleKeys.add(key);

        const dxPx = (t.wx - cx) * layerScale * PX_PER_UNIT;
        const dyPx = (t.wy - cy) * layerScale * PX_PER_UNIT;
        const s = t.bakedScale * layerScale;

        const el = ensureTile(t);
        const img = pool.imgEls.get(key);

        const wPx = t.w * PX_PER_UNIT;
        const hPx = t.h * PX_PER_UNIT;

        el.style.transform = `translate3d(${dxPx}px, ${dyPx}px, 0) scale(${s}) rotate(${t.rot}deg) translate(${-wPx / 2}px, ${-hPx / 2}px)`;
        el.style.width = `${wPx}px`;
        el.style.height = `${hPx}px`;
        el.style.opacity = String(layerAlpha);

        if (img) {
          const radiusPx = (safeRounded / 20) * (Math.min(wPx, hPx) / 2);
          img.style.borderRadius = `${radiusPx}px`;
        }

        orderKeys[i] = key;
        orderScale[i] = t.bakedScale;
      }

      for (const key of Array.from(pool.tileEls.keys())) {
        if (!visibleKeys.has(key)) removeTile(octave, key);
      }

      const idxs = orderKeys.map((_, i) => i);
      idxs.sort((a, b) => orderScale[a] - orderScale[b]);
      for (let k = 0; k < idxs.length; k++) {
        const el = pool.tileEls.get(orderKeys[idxs[k]]);
        if (el) el.style.zIndex = String(layerZBase + k);
      }
    };

    let lastOctaves = new Set();

    const project = () => {
      const cx = camX.get();
      const cy = camY.get();
      const lz = logZoom.get();

      const octave = Math.floor(lz);
      const frac = lz - octave;

      const scaleCurrent = Math.pow(2, frac);
      const scaleNext = Math.pow(2, frac - 1);

      const alphaCurrent = 1 - frac;
      const alphaNext = frac;

      projectLayer(octave, scaleCurrent, alphaCurrent, 0, cx, cy);
      projectLayer(octave + 1, scaleNext, alphaNext, 100000, cx, cy);

      const nowOctaves = new Set([octave, octave + 1]);
      for (const o of Array.from(lastOctaves)) {
        if (!nowOctaves.has(o)) disposeLayer(o);
      }
      for (const o of Array.from(layerPools.keys())) {
        if (!nowOctaves.has(o)) disposeLayer(o);
      }
      lastOctaves = nowOctaves;
    };

    project();

    let raf = 0;
    const loop = () => {
      const tx = targetX.get() + velX.get();
      const ty = targetY.get() + velY.get();
      targetX.set(tx);
      targetY.set(ty);
      velX.set(velX.get() * safeFriction);
      velY.set(velY.get() * safeFriction);

      const vlz = velLogZoom.get();
      if (vlz !== 0) {
        targetLogZoom.set(targetLogZoom.get() + vlz);
        velLogZoom.set(vlz * safeFriction);
      }

      driftX.set(lerp(driftX.get(), driftTX.get() * safeDriftAmount, 0.08));
      driftY.set(lerp(driftY.get(), driftTY.get() * safeDriftAmount, 0.08));

      camX.set(lerp(camX.get(), targetX.get() + driftX.get(), 0.18));
      camY.set(lerp(camY.get(), targetY.get() + driftY.get(), 0.18));
      logZoom.set(lerp(logZoom.get(), targetLogZoom.get(), 0.18));

      project();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      disposeAllLayers();
    };
  }, [
    generateCell,
    safeFriction,
    safeDriftAmount,
    safeRounded,
    safeImages,
    camX,
    camY,
    logZoom,
    targetX,
    targetY,
    targetLogZoom,
    velX,
    velY,
    velLogZoom,
    driftX,
    driftY,
    driftTX,
    driftTY,
  ]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    let dragging = false;
    let lastPX = 0;
    let lastPY = 0;
    let lastT = 0;
    let pid = null;

    const onDown = (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      dragging = true;
      pid = e.pointerId;
      lastPX = e.clientX;
      lastPY = e.clientY;
      lastT = e.timeStamp;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      el.style.cursor = 'grabbing';
    };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      driftTX.set(Math.max(-1, Math.min(1, nx)));
      driftTY.set(Math.max(-1, Math.min(1, ny)));

      if (!dragging || e.pointerId !== pid) return;

      const dpx = e.clientX - lastPX;
      const dpy = e.clientY - lastPY;

      const lz = logZoom.get();
      const frac = lz - Math.floor(lz);
      const effScale =
        (1 - frac) * Math.pow(2, frac) + frac * Math.pow(2, frac - 1);
      const dWorldX = (-dpx / (PX_PER_UNIT * effScale)) * safeDragSpeed;
      const dWorldY = (-dpy / (PX_PER_UNIT * effScale)) * safeDragSpeed;
      targetX.set(targetX.get() + dWorldX);
      targetY.set(targetY.get() + dWorldY);

      const dt = Math.max(1, e.timeStamp - lastT);
      const k = 16 / dt;
      velX.set(dWorldX * k);
      velY.set(dWorldY * k);

      lastPX = e.clientX;
      lastPY = e.clientY;
      lastT = e.timeStamp;
    };

    const onUp = (e) => {
      if (!dragging || e.pointerId !== pid) return;
      dragging = false;
      pid = null;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      el.style.cursor = 'grab';
    };

    const onCancel = (e) => onUp(e);

    const onWheel = (e) => {
      e.preventDefault();
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;
      else if (e.deltaMode === 2) delta *= 400;
      const step = -delta * 0.0015 * safeDragSpeed;
      velLogZoom.set(velLogZoom.get() + step);
    };

    const onLeave = () => {
      driftTX.set(0);
      driftTY.set(0);
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onCancel);
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('pointerleave', onLeave);
    el.style.cursor = 'grab';

    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onCancel);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [
    safeDragSpeed,
    targetX,
    targetY,
    velX,
    velY,
    velLogZoom,
    logZoom,
    driftTX,
    driftTY,
  ]);

  const resolveDim = (v, fallback) => {
    if (v == null) return fallback;
    if (typeof v === 'number') return `${v}px`;
    return v;
  };

  const wrapperStyle = {
    position: 'relative',
    width: resolveDim(width, '100%'),
    height: resolveDim(height, '100%'),
    minWidth: 0,
    minHeight: 0,
    overflow: 'hidden',
    backgroundColor,
    touchAction: 'none',
    userSelect: 'none',
    cursor: 'grab',
    ...style,
  };

  return (
    <div ref={containerRef} className={className} style={wrapperStyle}>
      <div
        ref={sceneRef}
        style={{
          position: 'absolute',
          inset: 0,
        }}
      />
    </div>
  );
}

const COMPONENT_DEFAULTS = {
  width: '100%',
  height: '100%',
  className: '',
  images: DEFAULT_IMAGES,
  density: 5,
  imageWidth: 150,
  imageHeight: 150,
  rounded: 3,
  dragSpeed: 20,
  driftAmount: 20,
  friction: 10,
  backgroundColor: '#000000',
  initialX: CELL_SIZE * 0.55,
  initialY: CELL_SIZE * 0.45,
  initialZoom: -0.42,
};
