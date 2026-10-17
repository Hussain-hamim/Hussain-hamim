import React, { Component, lazy, Suspense, useEffect, useRef, useState } from 'react';
import observeVisibility from '../utils/observeVisibility';

const StickerPeeling = lazy(() => import('./StickerPeeling'));
const RETURN_DELAY = 350;

class StickerFallback extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export default function OnDemandSticker({ image, imageWidth = 36, imageHeight = 36, className = '', style, ...props }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [interaction, setInteraction] = useState({ hovered: false, pressed: false });

  useEffect(() => {
    const element = ref.current;
    const target = element.closest('a, button') || element;
    let visible = false;
    let timer;
    let hovering = false;
    let focused = false;
    let pressed = false;
    const update = () => {
      clearTimeout(timer);
      const active = hovering || focused || pressed;
      setInteraction({ hovered: visible && (hovering || focused), pressed: visible && pressed });
      if (visible && active && !document.hidden) setMounted(true);
      else if (!visible || document.hidden) setMounted(false);
      else timer = setTimeout(() => setMounted(false), RETURN_DELAY);
    };
    const listeners = {
      pointerenter: event => { if (event.pointerType !== 'touch') hovering = true; update(); },
      pointerleave: () => { hovering = false; pressed = false; update(); },
      pointerdown: () => { pressed = true; update(); },
      pointerup: () => { pressed = false; update(); },
      pointercancel: () => { pressed = false; hovering = false; update(); },
      focus: () => { focused = true; update(); },
      blur: () => { focused = false; update(); },
    };
    Object.entries(listeners).forEach(([name, listener]) => target.addEventListener(name, listener));
    const disconnect = observeVisibility(element, nextVisible => {
      visible = nextVisible;
      if (!visible) { hovering = false; focused = false; pressed = false; }
      update();
    });
    return () => {
      clearTimeout(timer);
      disconnect();
      Object.entries(listeners).forEach(([name, listener]) => target.removeEventListener(name, listener));
    };
  }, []);

  const src = typeof image === 'string' ? image : image?.src;
  const fallback = <img src={src} alt='' width={imageWidth} height={imageHeight} decoding='async' className='h-full w-full rounded-md object-contain' />;
  return (
    <span ref={ref} className={`relative inline-flex shrink-0 ${className}`} style={{ width: imageWidth, height: imageHeight, ...style }}>
      {mounted ? (
        <StickerFallback fallback={fallback}>
          <Suspense fallback={fallback}>
            <StickerPeeling {...props} {...interaction} image={image} imageWidth={imageWidth} imageHeight={imageHeight} />
          </Suspense>
        </StickerFallback>
      ) : fallback}
    </span>
  );
}
