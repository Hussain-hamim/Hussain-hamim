import React, { useLayoutEffect, useRef, useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Eye, MessageSquare } from 'lucide-react';
import Button from './Button';
import MeshText from './MeshText';
import TextMorph from './TextMorph';
import { PEEL_VARIATIONS } from './peelDirections';
import { useTheme } from '../context/themeContext';
import heroPortrait from '../asset/hsn3-hero.jpg';

const ParticleLetter = lazy(() => import('./ParticleLetter'));
const StickerPeeling = lazy(() => import('./StickerPeeling'));

const scrollToSection = (anchor) => {
  const el = document.getElementById(`${anchor}-section`);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

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
      className='relative flex h-[clamp(2.15rem,5.5vw,2.75rem)] w-full items-center justify-start sm:h-12 md:h-14'
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
            force={0}
            interactive={false}
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
  const [showParticles, setShowParticles] = useState(false);
  const [portraitFormed, setPortraitFormed] = useState(false);
  const [visitors, setVisitors] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

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

  useEffect(() => {
    if (!showParticles || portraitFormed) return undefined;
    const id = window.setTimeout(() => setPortraitFormed(true), 1000);
    return () => window.clearTimeout(id);
  }, [showParticles, portraitFormed]);

  const visitorLabel =
    visitors != null && Number.isFinite(visitors)
      ? new Intl.NumberFormat(isPashto ? 'ps' : 'en', {
          notation: visitors >= 1000 ? 'compact' : 'standard',
          maximumFractionDigits: 1,
        }).format(visitors)
      : null;

  const copy = {
    greeting: isPashto ? 'سلام، زه یم' : "Hey, I'm",
    firstName: isPashto ? 'محمد حسین' : 'HUSSAIN',
    lastName: isPashto ? 'حمیم' : 'HAMIM',
    headline: isPashto
      ? 'زه د سټارټ اپونو لپاره د AI پر بنسټ وېب او موبايل پروډکټونه جوړوم، له MVP څخه تر لانچ پورې.'
      : 'I build thoughtful products for people with an idea they care about.',
    subline: isPashto
      ? 'Full-Stack، موبايل پروګرامونه، او د AI اېجنټ سيستمونه چې په ژر وخت کې رښتينې پايلې راوړي.'
      : 'I work on web, mobile, and AI, and I like staying close until a product feels ready.',
    ctaSeeWork: isPashto ? 'زما کار وګورئ' : 'See what I make',
    ctaDropMessage: isPashto ? 'پیغام پریږدئ' : 'Say hello',
    morphWords: isPashto
      ? ['د AI پر بنسټ', 'Full-Stack', 'موبايل', 'Agent']
      : ['thoughtful', 'practical', 'hands-on', 'personal'],
  };

  return (
    <section
      className='section-sep relative w-full min-h-screen overflow-hidden bg-surface-alt transition-colors duration-300'
    >
      {visitorLabel ? (
        <div className='pointer-events-none absolute right-4 top-[max(5.25rem,calc(env(safe-area-inset-top)+4.75rem))] z-20 flex items-center gap-1.5 font-sans3 text-xs text-ink sm:right-6 sm:text-sm md:right-8 lg:right-10'>
          <Eye className='h-3.5 w-3.5 shrink-0 text-ink-muted sm:h-4 sm:w-4' aria-hidden />
          <span className='tabular-nums' aria-label={`${visitorLabel} visitors`}>
            {visitorLabel}
          </span>
        </div>
      ) : null}
      <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-10 px-6 pb-16 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.5rem))] text-center sm:px-8 md:flex-row md:items-center md:justify-center md:gap-12 md:px-10 lg:gap-16'>
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
              className='h-[clamp(2.15rem,5.5vw,2.75rem)] w-full sm:h-12 md:h-14'
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
                force={0}
                interactive={false}
                textAlign='left'
              />
            </div>
            <HighlightedMeshText text={copy.lastName} color='#0a0a0a' />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6 }}
            className='mt-5 max-w-xl font-sans1 text-[clamp(0.92rem,2vw,1.15rem)] font-bold uppercase leading-[1.3] tracking-tight text-ink sm:mt-6'
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
                products for people with an idea they{' '}
                <span className='text-ink-muted'>care about</span>.
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
            <Button
              variant='secondary'
              onClick={() => scrollToSection('projects')}
              icon={<ArrowRight />}
              className='w-full sm:w-auto'
            >
              {copy.ctaSeeWork}
            </Button>
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

        <div className='flex w-full max-w-[14rem] shrink-0 flex-col items-center md:max-w-[20rem] lg:max-w-[22rem]'>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className='relative flex h-[min(38vw,14rem)] w-full items-center justify-center md:h-[min(42vh,20rem)] lg:h-[min(46vh,22rem)]'
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
                assembled={portraitFormed}
                hoverEnabled
                hoverConfig={{
                  hoverType: 'roam',
                  transition: { duration: 4, ease: 'easeOut' },
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
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className='mt-4 flex items-center justify-center gap-2.5'
        >
          {[
            { label: 'Email', href: 'mailto:mohammadhussainafghan83@gmail.com', img: require('../images/socials/email.png') },
            { label: 'GitHub', href: 'https://github.com/Hussain-hamim', img: require('../images/socials/github.png') },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hussain-hamim/', img: require('../images/socials/linkedin.png') },
            { label: 'Twitter', href: 'https://x.com/erencode', img: require('../images/socials/twitter.png') },
            { label: 'WhatsApp', href: 'https://wa.me/93780338261', img: require('../images/socials/whatsapp.png') },
            { label: 'Instagram', href: 'https://www.instagram.com/hussainhamim_/', img: require('../images/socials/instagram.png') },
          ].map(({ label, href, img }, index) => (
            <a
              key={label}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={label}
              onMouseEnter={() => setHoveredSocial(label)}
              onMouseLeave={() => setHoveredSocial(null)}
              className='group relative inline-flex h-5 w-5 items-center justify-center [filter:grayscale(0.55)]'
            >
              <span className='pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-1.5 py-0.5 font-sans3 text-[10px] font-medium text-surface opacity-0 transition-opacity duration-150 group-hover:opacity-100'>
                {label}
              </span>
              <Suspense
                fallback={
                  <img src={img} alt='' className='h-[18px] w-[18px] rounded-md object-contain' />
                }
              >
                <StickerPeeling
                  image={img}
                  imageWidth={20}
                  imageHeight={20}
                  hoverPeel={48}
                  pressPeel={70}
                  hovered={hoveredSocial === label}
                  curlRotation={PEEL_VARIATIONS[index % PEEL_VARIATIONS.length]}
                  backColor='#0a0a0a'
                  shadowEnabled
                  shadow={{
                    opacity: 28,
                    color: '#000000',
                    x: -220,
                    y: 120,
                  }}
                  transition={{
                    type: 'tween',
                    duration: 0.28,
                    ease: 'easeOut',
                  }}
                />
              </Suspense>
            </a>
          ))}
        </motion.div>
        </div>
      </div>
      <button
        type='button'
        onClick={() => scrollToSection('projects')}
        aria-label={isPashto ? 'ښکته' : 'Scroll down'}
        className='absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-20 -translate-x-1/2 text-ink'
      >
        <ChevronDown className='h-6 w-6 animate-bounce' aria-hidden />
      </button>
    </section>
  );
};

export default LandingSection;
