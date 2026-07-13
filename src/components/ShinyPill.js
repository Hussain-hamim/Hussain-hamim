import { useEffect } from 'react';

const KEYFRAMES_CSS = `
@keyframes shinyPillBgSweep {
  0% { transform: translateX(-120%) skewX(-16deg); }
  100% { transform: translateX(220%) skewX(-16deg); }
}
`;

let keyframesInjected = false;

function ensureKeyframes() {
  if (keyframesInjected || typeof document === 'undefined') return;
  if (document.getElementById('shiny-pill-keyframes')) {
    keyframesInjected = true;
    return;
  }
  const style = document.createElement('style');
  style.id = 'shiny-pill-keyframes';
  style.textContent = KEYFRAMES_CSS;
  document.head.appendChild(style);
  keyframesInjected = true;
}

/**
 * Full-button shiny sheen adapted from Originkit Shiny Pill.
 * Sweeps across the entire pill background (not just text).
 * @see https://www.originkit.dev/
 */
export default function ShinyPill({
  as: Comp = 'span',
  children,
  text,
  shineColor = '#C1E311',
  speed = 1.8,
  shineOpacity = 0.45,
  className = '',
  style,
  ...rest
}) {
  useEffect(() => {
    ensureKeyframes();
  }, []);

  const content = children ?? text;

  return (
    <Comp
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        ...style,
      }}
      {...rest}
    >
      {/* Shine sweeps full button surface */}
      <span
        aria-hidden='true'
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden',
          borderRadius: 'inherit',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '-30%',
            left: 0,
            width: '42%',
            height: '160%',
            background: `linear-gradient(
              90deg,
              transparent 0%,
              ${shineColor} 42%,
              ${shineColor} 58%,
              transparent 100%
            )`,
            opacity: shineOpacity,
            filter: 'blur(8px)',
            animation: `shinyPillBgSweep ${speed}s ease-in-out infinite`,
          }}
        />
      </span>

      <span
        className='relative z-[2] inline-flex w-full items-center justify-center'
        style={{ gap: 'inherit' }}
      >
        {content}
      </span>
    </Comp>
  );
}
