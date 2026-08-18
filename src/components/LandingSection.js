import React, { useLayoutEffect, useRef, useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, MessageSquare, Eye } from 'lucide-react';
import Button from './Button';
import MeshText from './MeshText';
import TextMorph from './TextMorph';
import ScrambleText from './ScrambleText';
import { useTheme } from '../context/themeContext';
import heroPortrait from '../asset/hsn3-hero.jpg';

const ParticleLetter = lazy(() => import('./ParticleLetter'));

const scrollToSection = (anchor) => {
  const el = document.getElementById(`${anchor}-section`);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/** Default 30 min Cal.com booking — override with REACT_APP_BOOKING_URL if needed */
const DEFAULT_CAL_BOOKING_URL = 'https://cal.com/hussain-hamim-fp9qc6/30min';

/** Irregular ink/paint accent behind text (same mark as HAMIM). */
function PaintStroke({ className = '' }) {
  return (
    <svg
      className={`pointer-events-none absolute left-[-4%] top-1/2 h-[92%] w-[108%] -translate-y-1/2 -rotate-[0.8deg] ${className}`}
      viewBox='0 0 320 72'
      preserveAspectRatio='none'
      aria-hidden='true'
    >
      <path
        fill='#D7FF00'
        d='M3.5 34.2
           C16 12.4, 34 18.6, 52 10.8
           C78 1.2, 98 16.4, 126 8.2
           C152 0.6, 172 14.8, 200 6.4
           C226 -1.2, 250 12.6, 278 5.8
           C294 2.2, 308 10.4, 317 6.1
           L315.6 58.4
           C298 68.2, 276 60.4, 252 66.8
           C224 74.2, 200 61.6, 172 69.4
           C144 76.8, 118 63.2, 90 70.6
           C62 77.4, 38 64.8, 18 71.2
           C10 73.8, 4.8 64.2, 3.5 34.2 Z'
      />
    </svg>
  );
}

function PaintedTextMorph({ words, color, transition }) {
  return (
    <span className='relative inline-flex items-center px-1.5 py-0.5 align-baseline'>
      <PaintStroke />
      <TextMorph
        words={words}
        color={color}
        className='relative z-10'
        transition={transition}
      />
    </span>
  );
}

/** Painted accent stroke behind the name — inked highlight, not a solid box. */
function HighlightedMeshText({ text, color = '#0a0a0a' }) {
  const shellRef = useRef(null);
  const [widthPx, setWidthPx] = useState(null);

  useLayoutEffect(() => {
    let cancelled = false;
    const measure = async () => {
      const shell = shellRef.current;
      if (!shell) return;
      const height = shell.clientHeight || 80;
      const fontSize = Math.max(12, height * 0.78);
      const fontStr = `normal 700 ${fontSize}px Daisyogre, sans-serif`;
      try {
        if (document.fonts?.load) await document.fonts.load(fontStr);
        if (document.fonts?.ready) await document.fonts.ready;
      } catch {
        /* ignore */
      }
      if (cancelled) return;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.font = fontStr;
      const metrics = ctx.measureText(String(text ?? ''));
      const pad = Math.max(10, fontSize * 0.12);
      setWidthPx(Math.ceil(metrics.width + pad * 2));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (shellRef.current) ro.observe(shellRef.current);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [text]);

  return (
    <div
      ref={shellRef}
      className='relative flex h-[clamp(2.75rem,10vw,4.5rem)] w-full items-center justify-start sm:h-16 md:h-20'
      aria-hidden='true'
    >
      <div
        className='relative h-full'
        style={{
          width: widthPx ? `${widthPx}px` : 'min(100%, 16rem)',
          maxWidth: '100%',
        }}
      >
        <div
          className='pointer-events-none absolute inset-0 z-0 overflow-hidden'
          aria-hidden='true'
        >
          <PaintStroke />
        </div>

        <div className='relative z-10 h-full w-full'>
          <MeshText
            text={text}
            color={color}
            font={{
              fontFamily: 'Daisyogre',
              variant: 'Bold',
              fontSize: 160,
            }}
            colorSplit
            customColors={['#D7FF00', '#2DD4BF']}
            force={18}
            textAlign='left'
          />
        </div>
      </div>
    </div>
  );
}

const LandingSection = ({ locale = 'en' }) => {
  const isPashto = locale === 'ps';
  const { isDark } = useTheme();
  const ink = isDark ? '#F3F1E6' : '#0a0a0a';
  const bookingUrl = (
    process.env.REACT_APP_BOOKING_URL || DEFAULT_CAL_BOOKING_URL
  ).trim();
  const [heroHovered, setHeroHovered] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [visitors, setVisitors] = useState(null);
  const [visitorScrambleDone, setVisitorScrambleDone] = useState(false);
  const [visitorScrambleText, setVisitorScrambleText] = useState(null);
  const onVisitorScrambleComplete = useCallback(() => {
    setVisitorScrambleDone(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/visitors')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.visitors != null) {
          setVisitors(Number(data.visitors));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let idleId;
    let timeoutId;
    const enable = () => setShowParticles(true);
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(enable, 400);
    }
    return () => {
      if (idleId != null && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) window.clearTimeout(timeoutId);
    };
  }, []);

  const visitorLabel =
    visitors != null && Number.isFinite(visitors)
      ? new Intl.NumberFormat(isPashto ? 'ps' : 'en', {
          notation: visitors >= 1000 ? 'compact' : 'standard',
          maximumFractionDigits: 1,
        }).format(visitors)
      : null;

  useEffect(() => {
    if (visitorLabel && visitorScrambleText == null) {
      setVisitorScrambleText(visitorLabel);
    }
  }, [visitorLabel, visitorScrambleText]);

  const copy = {
    greeting: isPashto ? 'سلام، زه یم' : "Hey, I'm",
    firstName: isPashto ? 'محمد حسین' : 'HUSSAIN',
    lastName: isPashto ? 'حمیم' : 'HAMIM',
    headline: isPashto
      ? 'زه د سټارټ اپونو لپاره د AI پر بنسټ وېب او موبايل پروډکټونه جوړوم، له MVP څخه تر لانچ پورې.'
      : 'I build AI-powered products for startups that need to ship.',
    subline: isPashto
      ? 'Full-Stack، موبايل پروګرامونه، او د AI اېجنټ سيستمونه چې په ژر وخت کې رښتينې پايلې راوړي.'
      : 'Full-stack web, mobile apps, and AI agent systems that ship fast and drive real results.',
    ctaSeeWork: isPashto ? 'زما کار وګورئ' : 'See my work',
    ctaBook: isPashto ? 'د لیدنې وخت وټاکئ' : 'Book a call',
    ctaDropMessage: isPashto ? 'پیغام پریږدئ' : 'Drop a message',
    morphWords: isPashto
      ? ['د AI پر بنسټ', 'Full-Stack', 'موبايل', 'Agent']
      : ['AI-powered', 'full-stack', 'mobile-first', 'agent-driven'],
  };

  return (
    <section
      className='section-sep relative w-full min-h-screen overflow-hidden bg-hero transition-colors duration-300'
      onMouseEnter={() => setHeroHovered(true)}
      onMouseLeave={() => setHeroHovered(false)}
    >
      {visitorLabel ? (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className='pointer-events-none absolute right-4 top-[max(1.25rem,calc(env(safe-area-inset-top)+0.75rem))] z-20 flex flex-col items-end gap-1.5 font-sans3 text-xs text-ink sm:right-6 sm:text-sm md:right-8 lg:right-10'
        >
          {visitorScrambleText ? (
            <div
              className='flex items-center gap-1.5'
              aria-label={`${visitorLabel || visitorScrambleText} visitors`}
            >
              <Eye
                className='h-3.5 w-3.5 shrink-0 text-ink-muted sm:h-4 sm:w-4'
                aria-hidden
              />
              {visitorScrambleDone ? (
                <span className='tabular-nums'>
                  {visitorLabel || visitorScrambleText}
                </span>
              ) : (
                <ScrambleText
                  words={visitorScrambleText}
                  color={ink}
                  fontFamily='inherit'
                  fontSize='inherit'
                  fontWeight={500}
                  className='!h-auto !w-auto tabular-nums'
                  style={{ width: 'auto', height: 'auto', overflow: 'visible' }}
                  enterAnimation={{
                    mode: 'oneLine',
                    scrambleIntensity: 90,
                    ease: { type: 'tween', duration: 0.85, ease: 'linear' },
                    flickerEnabled: true,
                    flickerColor: isDark ? '#888888' : '#555555',
                    flickerIntensity: 65,
                    flickerSpeed: 12,
                  }}
                  onComplete={onVisitorScrambleComplete}
                />
              )}
            </div>
          ) : null}
        </motion.div>
      ) : null}
      <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-10 px-6 pb-28 pt-[max(3.5rem,calc(env(safe-area-inset-top)+2rem))] text-center sm:px-8 md:flex-row md:items-center md:justify-center md:gap-12 md:px-10 lg:gap-16'>
        <div className='relative z-10 flex w-full min-w-0 max-w-xl flex-col items-start justify-center text-left'>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className='mb-2 font-sans3 text-sm text-gray-600 dark:text-white/55 sm:mb-3 sm:text-base'
          >
            {copy.greeting}
          </motion.p>

          <h1 className='w-full'>
            <span className='sr-only'>
              {copy.greeting} {copy.firstName} {copy.lastName}
            </span>
            <div
              className='h-[clamp(2.75rem,10vw,4.5rem)] w-full sm:h-16 md:h-20'
              aria-hidden='true'
            >
              <MeshText
                text={copy.firstName}
                color={ink}
                font={{
                  fontFamily: 'Daisyogre',
                  variant: 'Bold',
                  fontSize: 160,
                }}
                colorSplit
                customColors={['#D7FF00', '#2DD4BF']}
                force={18}
                textAlign='left'
              />
            </div>
            <HighlightedMeshText text={copy.lastName} color='#0a0a0a' />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6 }}
            className='mt-12 max-w-xl font-sans1 text-[clamp(1.15rem,3.2vw,1.65rem)] font-bold uppercase leading-[1.15] tracking-tight text-ink sm:mt-14'
          >
            {isPashto ? (
              <>
                زه د سټارټ اپونو لپاره{' '}
                <PaintedTextMorph
                  words={copy.morphWords}
                  color='#0a0a0a'
                  transition={{ duration: 0.85, delay: 1.4, ease: 'easeInOut' }}
                />{' '}
                وېب او موبايل پروډکټونه جوړوم.
              </>
            ) : (
              <>
                I build{' '}
                <PaintedTextMorph
                  words={copy.morphWords}
                  color='#0a0a0a'
                  transition={{ duration: 0.85, delay: 1.4, ease: 'easeInOut' }}
                />{' '}
                products for{' '}
                <span className='text-ink-muted'>startups that need to</span>{' '}
                ship.
              </>
            )}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className='mt-4 max-w-md font-sans3 text-sm leading-relaxed text-gray-600 dark:text-white/55 sm:mt-5 sm:text-base'
          >
            {copy.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.55 }}
            className='mt-8 flex w-full max-w-md flex-col items-stretch justify-start gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-start'
          >
            <div className='flex w-full flex-row items-center gap-3 sm:w-auto'>
              {bookingUrl ? (
                <Button
                  href={bookingUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  icon={<Calendar />}
                  className='min-w-0 flex-1 sm:flex-none'
                >
                  {copy.ctaBook}
                </Button>
              ) : null}
              <Button
                variant='secondary'
                onClick={() => scrollToSection('projects')}
                icon={<ArrowRight />}
                className='min-w-0 flex-1 sm:flex-none'
              >
                {copy.ctaSeeWork}
              </Button>
            </div>
            <Button
              variant='outline'
              onClick={() => scrollToSection('contactme')}
              icon={<MessageSquare />}
              className='!text-ink w-full sm:w-auto'
            >
              {copy.ctaDropMessage}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className='relative flex h-[min(38vw,14rem)] w-full max-w-[14rem] shrink-0 items-center justify-center md:h-[min(42vh,20rem)] md:max-w-[20rem] lg:h-[min(46vh,22rem)] lg:max-w-[22rem]'
        >
          {showParticles ? (
            <Suspense
              fallback={
                <div className='h-full w-full rounded-lg bg-panel/60' aria-hidden />
              }
            >
              <ParticleLetter
                letter='H'
                src={heroPortrait}
                objectPosition='center top'
                imageFillLetter
                colorBrightness={isDark ? 1.18 : 0.82}
                particleCount={70}
                particleSize={4}
                particleShape='square'
                particleColor='original'
                assembled={heroHovered}
                hoverEnabled
                hoverConfig={{
                  hoverType: 'roam',
                  transition: { duration: 0.8, ease: 'easeInOut' },
                  roamOpacity: 0.55,
                  roamShape: 'rectangle',
                }}
                repulsionEnabled
                repulsionConfig={{
                  repulsionMode: 'outside',
                  repulsionForce: 10,
                  repulsionRadius: 55,
                }}
                onClick={() => scrollToSection('about')}
                className='h-full w-full'
              />
            </Suspense>
          ) : (
            <div className='h-full w-full rounded-lg bg-panel/60' aria-hidden />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LandingSection;
