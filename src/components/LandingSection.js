import React, { useState, useEffect, lazy, Suspense } from 'react';
import OnDemandSticker from './OnDemandSticker';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Eye, MessageSquare } from 'lucide-react';
import Button from './Button';
import HeroProjectLink from './HeroProjectLink';
import BranchBackground from './BranchBackground';
import TextMorph from './TextMorph';
import { PEEL_VARIATIONS } from './peelDirections';
import { useTheme } from '../context/themeContext';
import { scrollToSection } from '../utils/sectionNavigation';
import heroPortrait from '../asset/hsn3-hero.webp';
import { getFeaturedBySlug } from '../data/featuredProjects';

const ParticleLetter = lazy(() => import('./ParticleLetter'));

// Brand-inspired shades with enough contrast in each site theme.
const projectLinkColors = {
  ideahunt: 'text-[#0f766e] dark:text-[#5eead4]',
  'aegnis-ai': 'text-[#1d4ed8] dark:text-[#60a5fa]',
  devsync: 'text-[#0e7490] dark:text-[#22d3ee]',
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

const LandingSection = ({ locale = 'en' }) => {
  const isPashto = locale === 'ps';
  const { isDark } = useTheme();
  const [showParticles, setShowParticles] = useState(false);
  const [portraitFormed, setPortraitFormed] = useState(false);
  const [visitors, setVisitors] = useState(null);

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
      : 'I’m building IdeaHunt, Aegnis AI, and DevSync as side projects. I’ve also launched a few apps on the App Store and delivered many client projects across mobile and web.',
    ctaSeeWork: isPashto ? 'زما کار وګورئ' : 'See what I make',
    ctaDropMessage: isPashto ? 'پیغام پریږدئ' : 'Say hello',
    morphWords: isPashto
      ? ['د AI پر بنسټ', 'Full-Stack', 'موبايل', 'Agent']
      : ['thoughtful', 'practical', 'hands-on', 'personal'],
  };

  return (
    <section
      className='relative isolate w-full min-h-screen overflow-hidden px-4 transition-colors duration-300 md:px-8'
    >
      <BranchBackground />
      <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-10 pb-16 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.5rem))] text-center md:flex-row md:items-center md:justify-center md:gap-12 lg:gap-16'>
        {visitorLabel ? (
          <div className='pointer-events-none absolute right-0 top-[max(5.25rem,calc(env(safe-area-inset-top)+4.75rem))] z-20 flex items-center gap-1.5 font-sans3 text-xs text-ink sm:text-sm'>
            <Eye className='h-3.5 w-3.5 shrink-0 text-ink-muted sm:h-4 sm:w-4' aria-hidden />
            <span className='tabular-nums' aria-label={`${visitorLabel} visitors`}>
              {visitorLabel}
            </span>
          </div>
        ) : null}
        <div className='relative z-10 flex w-full min-w-0 flex-col items-start justify-center text-left [container-type:inline-size]'>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className='mb-2 font-sans3 text-sm text-gray-600 dark:text-white/55 sm:mb-3 sm:text-base'
          >
            {copy.greeting}
          </motion.p>

          <h1 className='w-full whitespace-nowrap font-sans1 text-[clamp(0.875rem,6cqi,2.6rem)] font-bold leading-[1.15] tracking-tight text-ink'>
            <span>{copy.firstName}</span>{' '}
            <span className='relative inline-block'>
              <PaintStroke />
              <span className='relative z-10 text-[#0a0a0a]'>{copy.lastName}</span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6 }}
            className='mt-5 max-w-xl font-sans3 text-[clamp(1rem,2vw,1.25rem)] font-semibold leading-[1.5] tracking-tight text-ink sm:mt-6'
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
            {isPashto ? copy.subline : (
              <>
                I’m building{' '}
                {['ideahunt', 'aegnis-ai', 'devsync'].map((slug, index) => {
                  const project = getFeaturedBySlug(slug);
                  return (
                    <React.Fragment key={slug}>
                      {index === 2 ? ', and ' : index === 1 ? ', ' : ''}
                      <HeroProjectLink
                        project={project}
                        className={`font-semibold underline decoration-current/40 underline-offset-4 transition-colors hover:decoration-current focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${projectLinkColors[slug]}`}
                      />
                    </React.Fragment>
                  );
                })}
                {' '}as side projects. I’ve also launched a few apps on the App Store
                and delivered many client projects across mobile and web.
              </>
            )}
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
            { label: 'Email', href: 'mailto:mohammadhussainafghan83@gmail.com', img: require('../images/socials/email.webp') },
            { label: 'GitHub', href: 'https://github.com/Hussain-hamim', img: require('../images/socials/github.webp') },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hussain-hamim/', img: require('../images/socials/linkedin.webp') },
            { label: 'Twitter', href: 'https://x.com/erencode', img: require('../images/socials/twitter.webp') },
            { label: 'WhatsApp', href: 'https://wa.me/93780338261', img: require('../images/socials/whatsapp.webp') },
            { label: 'Instagram', href: 'https://www.instagram.com/hussainhamim_/', img: require('../images/socials/instagram.webp') },
          ].map(({ label, href, img }, index) => (
            <a
              key={label}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={label}
              className='group relative inline-flex h-5 w-5 items-center justify-center [filter:grayscale(0.55)]'
            >
              <span className='pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-1.5 py-0.5 font-sans3 text-[10px] font-medium text-surface opacity-0 transition-opacity duration-150 group-hover:opacity-100'>
                {label}
              </span>
              <OnDemandSticker
                image={img}
                imageWidth={20}
                imageHeight={20}
                hoverPeel={48}
                pressPeel={70}
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
