import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLS_SRC =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

/**
 * Mux HLS background video with hls.js fallback to native.
 */
export default function HlsVideo({ className = '', style, flipped = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let hls;
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  return (
    <video
      ref={ref}
      className={`${className} ${flipped ? 'scale-y-[-1]' : ''}`}
      style={style}
      autoPlay
      muted
      loop
      playsInline
    />
  );
}
