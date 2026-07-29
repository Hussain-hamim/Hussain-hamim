import { useEffect, useRef } from 'react';

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55;

/**
 * Video with manual rAF crossfade loop (no CSS transitions, no loop attr).
 */
export default function FadingVideo({ src, className = '', style }) {
  const videoRef = useRef(null);
  const rafRef = useRef(0);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const cancelFade = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    const fadeTo = (target, duration = FADE_MS) => {
      cancelFade();
      const start = performance.now();
      const from = parseFloat(video.style.opacity || '0') || 0;

      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const next = from + (target - from) * t;
        video.style.opacity = String(next);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = 0;
          video.style.opacity = String(target);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const onLoadedData = () => {
      video.style.opacity = '0';
      const playPromise = video.play();
      if (playPromise?.catch) playPromise.catch(() => {});
      fadeTo(1);
    };

    const onTimeUpdate = () => {
      if (fadingOutRef.current) return;
      const { duration, currentTime } = video;
      if (!duration || !Number.isFinite(duration)) return;
      const remaining = duration - currentTime;
      if (remaining <= FADE_OUT_LEAD && remaining > 0) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const onEnded = () => {
      video.style.opacity = '0';
      window.setTimeout(() => {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise?.catch) playPromise.catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    video.style.opacity = '0';
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    return () => {
      cancelFade();
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ opacity: 0, ...style }}
      autoPlay
      muted
      playsInline
      preload='auto'
    />
  );
}
