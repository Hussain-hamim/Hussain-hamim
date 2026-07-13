import { useId, useMemo } from 'react';

function mapEaseToCSS(ease) {
  if (Array.isArray(ease) && ease.length === 4) {
    return `cubic-bezier(${ease.join(',')})`;
  }
  switch (ease) {
    case 'linear':
      return 'linear';
    case 'easeIn':
      return 'ease-in';
    case 'easeOut':
      return 'ease-out';
    case 'easeInOut':
      return 'ease-in-out';
    case 'circIn':
      return 'cubic-bezier(0.6, 0.04, 0.98, 0.335)';
    case 'circOut':
      return 'cubic-bezier(0.075, 0.82, 0.165, 1)';
    case 'circInOut':
      return 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';
    case 'backIn':
      return 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';
    case 'backOut':
      return 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    case 'backInOut':
      return 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    default:
      return 'ease-in-out';
  }
}

const COMPONENT_DEFAULTS = {
  words: 'TEXT\nMORPH',
  transition: {
    type: 'tween',
    duration: 1,
    delay: 1,
    ease: 'easeInOut',
  },
  color: '#0a0a0a',
  className: '',
  style: undefined,
};

/**
 * Text Morph — Originkit-style word morph with blur/scale.
 * @see https://www.originkit.dev/
 */
export default function TextMorph(props) {
  const merged = { ...COMPONENT_DEFAULTS, ...props };
  const {
    words,
    color,
    transition,
    className = '',
    style,
  } = merged;

  const morph = Math.max(0.1, transition?.duration ?? 1);
  const hold = Math.max(0, transition?.delay ?? 1);
  const easeCSS = mapEaseToCSS(transition?.ease ?? 'easeInOut');

  const wordList = useMemo(() => {
    if (Array.isArray(words)) {
      return words.map((w) => String(w).trim()).filter(Boolean);
    }
    return String(words ?? '')
      .split(/\r?\n|,/)
      .map((w) => w.trim())
      .filter(Boolean);
  }, [words]);

  const rawId = useId();
  const safeId = rawId.replace(/[:]/g, '');
  const filterId = `tm-thr-${safeId}`;
  const animName = `tm-rot-${safeId}`;

  const count = Math.max(1, wordList.length);
  const slot = morph + hold;
  const cycle = slot * count;
  const pct = (s) => Math.min(100, (s / cycle) * 100).toFixed(4);
  const mIn = pct(morph);
  const mHold = pct(morph + hold);
  const mOut = pct(2 * morph + hold);

  const keyframes = `
@keyframes ${animName} {
  0% {
    opacity: 0;
    filter: blur(12px);
    transform: translate(-50%, -50%) scale(0.85);
  }
  ${mIn}% {
    opacity: 1;
    filter: blur(0px);
    transform: translate(-50%, -50%) scale(1);
  }
  ${mHold}% {
    opacity: 1;
    filter: blur(0px);
    transform: translate(-50%, -50%) scale(1);
  }
  ${mOut}%, 100% {
    opacity: 0;
    filter: blur(12px);
    transform: translate(-50%, -50%) scale(1.15);
  }
}
`;

  const longest = wordList.reduce(
    (acc, w) => (w.length > acc.length ? w : acc),
    ''
  );

  return (
    <span
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        userSelect: 'none',
        verticalAlign: 'baseline',
        ...style,
      }}
    >
      <style>{keyframes}</style>

      <svg
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
        aria-hidden
      >
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in='SourceGraphic'
              type='matrix'
              values='1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 25 -9'
              result='goo'
            />
            <feComposite in='SourceGraphic' in2='goo' operator='atop' />
          </filter>
        </defs>
      </svg>

      <span
        style={{
          position: 'relative',
          filter: `url(#${filterId})`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1.15,
          minHeight: '1.15em',
        }}
      >
        <span
          style={{
            visibility: 'hidden',
            whiteSpace: 'nowrap',
            display: 'inline-block',
          }}
          aria-hidden
        >
          {longest || ' '}
        </span>

        {wordList.map((word, i) => (
          <span
            key={`${word}-${i}`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0,
              color,
              whiteSpace: 'nowrap',
              animation: `${animName} ${cycle}s ${(slot * i).toFixed(3)}s infinite ${easeCSS}`,
              willChange: 'opacity, filter, transform',
            }}
          >
            {word}
          </span>
        ))}
      </span>

      {/* Accessible: announce first word; morph is decorative */}
      <span className='sr-only'>{wordList[0] || ''}</span>
    </span>
  );
}
