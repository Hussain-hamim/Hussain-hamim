import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const GLITCH_CHARS_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const GLITCH_CHARS_LOWER = 'abcdefghijklmnopqrstuvwxyz';

function cubicBezier(x1, y1, x2, y2) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const sampleDX = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (x) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const dx = sampleX(t) - x;
      const d = sampleDX(t);
      if (Math.abs(dx) < 1e-6) break;
      if (d === 0) break;
      t -= dx / d;
    }
    return sampleY(Math.max(0, Math.min(1, t)));
  };
}

function makeEaseFn(ease) {
  if (Array.isArray(ease) && ease.length === 4) {
    return cubicBezier(ease[0], ease[1], ease[2], ease[3]);
  }
  switch (ease) {
    case 'linear':
      return (t) => t;
    case 'easeIn':
      return (t) => t * t;
    case 'easeOut':
      return (t) => 1 - (1 - t) * (1 - t);
    case 'easeInOut':
      return (t) => (t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t));
    case 'circIn':
      return (t) => 1 - Math.sqrt(1 - t * t);
    case 'circOut':
      return (t) => Math.sqrt(1 - (t - 1) * (t - 1));
    default:
      return (t) => 1 - (1 - t) * (1 - t);
  }
}

const DEFAULTS = {
  words: 'Scramble Text',
  enterAnimation: {
    mode: 'oneLine',
    restState: 'solid',
    replay: false,
    scrambleIntensity: 100,
    ease: { type: 'tween', duration: 1.6, ease: 'linear' },
    flickerEnabled: true,
    flickerColor: '#333333',
    flickerIntensity: 70,
    flickerSpeed: 10,
  },
  color: '#0a0a0a',
  className: '',
  style: undefined,
  onComplete: undefined,
  fontFamily: 'Daisyogre, sans-serif',
  fontSize: 'clamp(2rem, 9vw, 4.5rem)',
  fontWeight: 700,
};

/**
 * Scramble Text — Originkit-style glitch reveal (enter only, once).
 * Hover effects intentionally omitted.
 * @see https://www.originkit.dev/
 */
export default function ScrambleText(props) {
  const merged = {
    ...DEFAULTS,
    ...props,
    enterAnimation: {
      ...DEFAULTS.enterAnimation,
      ...(props.enterAnimation || {}),
      ease: {
        ...DEFAULTS.enterAnimation.ease,
        ...(props.enterAnimation?.ease || {}),
      },
    },
  };

  const {
    words,
    enterAnimation,
    color,
    className = '',
    style,
    onComplete,
    fontFamily = 'Daisyogre, sans-serif',
    fontSize = 'clamp(2rem, 9vw, 4.5rem)',
    fontWeight = 700,
  } = merged;

  const enterMode = enterAnimation?.mode ?? 'oneLine';
  const enterDuration = enterAnimation?.ease?.duration ?? 1.6;
  const enterEaseCurve = enterAnimation?.ease?.ease ?? 'linear';
  const enterScrambleIntensity = enterAnimation?.scrambleIntensity ?? 100;
  const enterFlickerEnabled = enterAnimation?.flickerEnabled ?? true;
  const enterFlickerColor = enterAnimation?.flickerColor ?? '#333333';
  const enterFlickerIntensity = enterAnimation?.flickerIntensity ?? 70;
  const enterFlickerSpeed = enterAnimation?.flickerSpeed ?? 10;

  const paragraphs = useMemo(
    () =>
      String(words ?? '')
        .split('\n')
        .map((line) => {
          const tokens = line.match(/\s+|\S+/g) ?? [];
          const out = [];
          let pendingGap = '';
          for (const tok of tokens) {
            if (/^\s+$/.test(tok)) pendingGap += tok;
            else {
              out.push({ text: tok, gap: pendingGap });
              pendingGap = '';
            }
          }
          return out;
        })
        .filter((p) => p.length > 0),
    [words]
  );

  const allWords = useMemo(() => {
    const list = [];
    paragraphs.forEach((paraWords, pi) => {
      paraWords.forEach(({ text, gap }, wiInPara) => {
        list.push({
          text,
          gap,
          pi,
          wiInPara,
          globalWi: list.length,
        });
      });
    });
    return list;
  }, [paragraphs]);

  const containerRef = useRef(null);
  const ghostRefs = useRef([]);
  const hasPlayedRef = useRef(false);
  const enterAnimStartedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [lineGroups, setLineGroups] = useState([]);
  const [displays, setDisplays] = useState({});
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [enterAnimComplete, setEnterAnimComplete] = useState(false);

  const detectLines = useCallback(() => {
    const allLines = [];
    paragraphs.forEach((_, pi) => {
      const paraEntries = allWords.filter((w) => w.pi === pi);
      const measured = paraEntries
        .map((w) => ({
          globalWi: w.globalWi,
          top: ghostRefs.current[w.globalWi]
            ? Math.round(
                ghostRefs.current[w.globalWi].getBoundingClientRect().top
              )
            : -1,
        }))
        .filter((m) => m.top >= 0);
      const tops = [...new Set(measured.map((m) => m.top))].sort(
        (a, b) => a - b
      );
      tops.forEach((top) =>
        allLines.push(
          measured.filter((m) => m.top === top).map((m) => m.globalWi)
        )
      );
    });
    setLineGroups(allLines);
  }, [paragraphs, allWords]);

  useLayoutEffect(() => {
    detectLines();
  }, [detectLines]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const obs = new ResizeObserver(() => detectLines());
    obs.observe(el);
    return () => obs.disconnect();
  }, [detectLines]);

  // Play once when visible
  useEffect(() => {
    if (enterMode === 'none') return;
    if (hasPlayedRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedRef.current) {
          hasPlayedRef.current = true;
          setShouldAnimate(true);
          obs.disconnect();
        }
      },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [enterMode]);

  useEffect(() => {
    if (enterMode === 'none' || !shouldAnimate || lineGroups.length === 0) {
      return undefined;
    }
    // One-shot only — resize / prop identity changes must not restart
    if (enterAnimStartedRef.current) return undefined;
    enterAnimStartedRef.current = true;

    let cancelled = false;
    setDisplays({});
    setEnterAnimComplete(false);

    const durationMs = enterDuration * 1000;
    const sequentialSteps = Math.max(
      1,
      allWords.reduce((s, w) => s + w.text.length, 0)
    );
    const animStart = performance.now();
    const animEndTime = animStart + durationMs;
    const easeFn = makeEaseFn(enterEaseCurve);
    const targetAt = (step) =>
      animStart + durationMs * easeFn(step / sequentialSteps);
    const speedMult = 10 / Math.max(1, Math.min(20, enterFlickerSpeed));

    const wordToLine = new Map();
    lineGroups.forEach((g, li) =>
      g.forEach((gWi) => wordToLine.set(gWi, li))
    );
    const lineEndTimes = [];
    if (enterMode === 'oneLine') {
      let cum = 0;
      for (const group of lineGroups) {
        cum += group.reduce((s, gWi) => s + allWords[gWi].text.length, 0);
        lineEndTimes.push(targetAt(cum));
      }
    }
    const lineEndForChar = (gWi) =>
      enterMode === 'oneLine'
        ? lineEndTimes[wordToLine.get(gWi) ?? 0] ?? animEndTime
        : animEndTime;

    const sleep = (ms) =>
      new Promise((r) => setTimeout(r, Math.max(0, ms)));

    const nextGlitchChar = (char) => {
      if (/\d/.test(char)) {
        return String(Math.floor(Math.random() * 10));
      }
      const isLower =
        char === char.toLowerCase() && char !== char.toUpperCase();
      const pool = isLower ? GLITCH_CHARS_LOWER : GLITCH_CHARS_UPPER;
      return pool[Math.floor(Math.random() * pool.length)];
    };

    const maybeFlicker = async (id, endTime) => {
      const intensity = Math.max(0, Math.min(100, enterFlickerIntensity));
      if (!enterFlickerEnabled || intensity === 0) return;
      if (Math.random() > intensity / 100) return;
      if (performance.now() >= endTime) return;
      const maxFlickers = Math.max(1, Math.round(intensity / 8));
      const flickers = Math.max(
        1,
        Math.round(maxFlickers / 2) +
          Math.floor(Math.random() * (maxFlickers / 2 + 1))
      );
      for (let i = 0; i < flickers; i++) {
        await sleep((40 + Math.random() * 80) * speedMult);
        if (cancelled) return;
        if (performance.now() >= endTime) {
          setDisplays((p) =>
            p[id] ? { ...p, [id]: { ...p[id], flickering: false } } : p
          );
          return;
        }
        setDisplays((p) =>
          p[id] ? { ...p, [id]: { ...p[id], flickering: true } } : p
        );
        await sleep((30 + Math.random() * 60) * speedMult);
        if (cancelled) return;
        setDisplays((p) =>
          p[id] ? { ...p, [id]: { ...p[id], flickering: false } } : p
        );
      }
    };

    const animateChar = async (globalWi, ci, char, targetEnd) => {
      if (cancelled) return;
      const id = `${globalWi}-${ci}`;
      const flickerEndTime = lineEndForChar(globalWi);
      if (char === '.' || char === ' ') {
        setDisplays((p) => ({
          ...p,
          [id]: { char, locked: true, flickering: false },
        }));
        await sleep(targetEnd - performance.now());
        maybeFlicker(id, flickerEndTime);
        return;
      }
      const scrambleIntensity = Math.max(
        0,
        Math.min(100, enterScrambleIntensity)
      );
      const desiredFrames =
        scrambleIntensity === 0
          ? 0
          : 1 + Math.floor(Math.random() * Math.round(scrambleIntensity / 7));
      const windowMs = targetEnd - performance.now();
      const minDelay = 15;
      const maxFitFrames = Math.max(1, Math.floor((windowMs * 0.8) / minDelay));
      const glitchFrames = Math.min(desiredFrames, maxFitFrames);
      const glitchDelay =
        glitchFrames > 0
          ? Math.max(minDelay, Math.floor((windowMs * 0.8) / glitchFrames))
          : minDelay;
      if (glitchFrames > 0) {
        for (let i = 0; i < glitchFrames; i++) {
          if (cancelled) return;
          setDisplays((p) => ({
            ...p,
            [id]: {
              char: nextGlitchChar(char),
              locked: false,
              flickering: false,
            },
          }));
          await sleep(glitchDelay);
          if (cancelled) return;
        }
      }
      setDisplays((p) => ({
        ...p,
        [id]: { char, locked: true, flickering: false },
      }));
      await sleep(targetEnd - performance.now());
      maybeFlicker(id, flickerEndTime);
    };

    const shuffle = (arr) => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    const animateWordInsert = async (gWi, getTargetEnd) => {
      const word = allWords[gWi].text;
      for (const ci of shuffle(word.split('').map((_, i) => i))) {
        if (cancelled) return;
        await animateChar(gWi, ci, word[ci], getTargetEnd());
      }
    };

    const run = async () => {
      if (enterMode === 'oneLine') {
        let idx = 0;
        for (const group of lineGroups) {
          for (const gWi of group) {
            if (cancelled) return;
            idx += 1;
            const step = idx;
            await animateWordInsert(gWi, () => targetAt(step));
          }
        }
      } else if (enterMode === 'multiLine') {
        await Promise.all(
          lineGroups.map(async (group) => {
            const lineSteps = group.reduce(
              (s, gWi) => s + allWords[gWi].text.length,
              0
            );
            let li = 0;
            const targetAtScaled = (step, total) =>
              animStart + durationMs * easeFn(step / Math.max(1, total));
            for (const gWi of group) {
              if (cancelled) return;
              li += 1;
              const step = li;
              await animateWordInsert(gWi, () =>
                targetAtScaled(step, lineSteps)
              );
            }
          })
        );
      } else {
        const all = [];
        allWords.forEach((w) =>
          w.text.split('').forEach((char, ci) =>
            all.push({ globalWi: w.globalWi, ci, char })
          )
        );
        for (let i = all.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [all[i], all[j]] = [all[j], all[i]];
        }
        let idx = 0;
        for (const { globalWi, ci, char } of all) {
          if (cancelled) return;
          idx += 1;
          await animateChar(globalWi, ci, char, targetAt(idx));
        }
      }
    };

    (async () => {
      await run();
      if (!cancelled) {
        setEnterAnimComplete(true);
        onCompleteRef.current?.();
      }
    })();

    return () => {
      cancelled = true;
    };
    // lineGroups.length (not identity) — start once measured; ref blocks replays
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAnimate, enterMode, words, lineGroups.length]);

  const isInsertEnter = enterMode === 'oneLine' || enterMode === 'multiLine';

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'transparent',
        overflow: 'hidden',
        userSelect: 'none',
        ...style,
      }}
      aria-label={String(words ?? '')}
    >
      {paragraphs.map((_, pi) => {
        const paraEntries = allWords.filter((w) => w.pi === pi);
        return (
          <p
            key={pi}
            style={{
              position: 'relative',
              width: '100%',
              margin: 0,
              padding: 0,
              fontFamily,
              fontWeight,
              fontSize,
              lineHeight: 1,
              letterSpacing: '0.02em',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                visibility: 'hidden',
                pointerEvents: 'none',
                textAlign: 'left',
              }}
              aria-hidden
            >
              {paraEntries.map((wordEntry) => (
                <Fragment key={wordEntry.globalWi}>
                  {wordEntry.gap ? (
                    <span style={{ whiteSpace: 'pre' }}>{wordEntry.gap}</span>
                  ) : null}
                  <span
                    ref={(el) => {
                      ghostRefs.current[wordEntry.globalWi] = el;
                    }}
                    style={{
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {wordEntry.text}
                  </span>
                </Fragment>
              ))}
            </span>

            <span style={{ width: '100%', textAlign: 'left', display: 'block' }}>
              {paraEntries.map((wordEntry) => (
                <Fragment key={wordEntry.globalWi}>
                  {wordEntry.gap ? (
                    <span style={{ color, whiteSpace: 'pre' }}>
                      {wordEntry.gap}
                    </span>
                  ) : null}
                  <span
                    style={{
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {wordEntry.text.split('').map((char, ci) => {
                      const id = `${wordEntry.globalWi}-${ci}`;
                      const enterState = displays[id];
                      let displayChar = char;
                      let charColor = color;

                      if (enterMode !== 'none') {
                        if (!enterState) {
                          charColor =
                            !shouldAnimate ? color : 'transparent';
                        } else {
                          displayChar = enterState.char;
                          charColor = enterState.flickering
                            ? enterFlickerEnabled
                              ? enterFlickerColor
                              : color
                            : enterState.locked
                              ? color
                              : color;
                        }
                      }

                      const hideChar =
                        isInsertEnter &&
                        shouldAnimate &&
                        !enterAnimComplete &&
                        !enterState;

                      return (
                        <span
                          key={ci}
                          style={{
                            color: charColor,
                            display: hideChar ? 'none' : undefined,
                          }}
                        >
                          {displayChar}
                        </span>
                      );
                    })}
                  </span>
                </Fragment>
              ))}
            </span>
          </p>
        );
      })}
    </div>
  );
}
