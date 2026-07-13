import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, MessageSquare } from 'lucide-react';
import Button from './Button';
import MeshText from './MeshText';

const scrollToSection = (anchor) => {
  const el = document.getElementById(`${anchor}-section`);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/** Default 30 min Cal.com booking — override with REACT_APP_BOOKING_URL if needed */
const DEFAULT_CAL_BOOKING_URL = 'https://cal.com/hussain-hamim-fp9qc6/30min';

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
        {/* Brush / ink stroke — roughly text-height, irregular painted edges */}
        <svg
          className='pointer-events-none absolute left-[-3%] top-1/2 h-[88%] w-[106%] -translate-y-1/2 -rotate-[0.8deg]'
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
  const bookingUrl = (
    process.env.REACT_APP_BOOKING_URL || DEFAULT_CAL_BOOKING_URL
  ).trim();

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
  };

  return (
    <section className='relative w-full min-h-screen overflow-hidden bg-[#EFEFEF]'>
      <div className='relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-start justify-center px-6 pb-20 pt-[max(6rem,calc(env(safe-area-inset-top)+4.5rem))] text-left sm:px-8 md:px-10'>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className='mb-2 font-sans3 text-sm text-gray-600 sm:mb-3 sm:text-base'
        >
          {copy.greeting}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className='w-full max-w-2xl'
        >
          <span className='sr-only'>
            {copy.greeting} {copy.firstName} {copy.lastName}
          </span>
          <div
            className='h-[clamp(2.75rem,10vw,4.5rem)] w-full sm:h-16 md:h-20'
            aria-hidden='true'
          >
            <MeshText
              text={copy.firstName}
              color='#0a0a0a'
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
          <HighlightedMeshText text={copy.lastName} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.6 }}
          className='mt-6 max-w-3xl font-sans1 text-[clamp(1.15rem,3.2vw,1.65rem)] font-bold uppercase leading-[1.15] tracking-tight text-[#0a0a0a] sm:mt-8'
        >
          {isPashto ? (
            copy.headline
          ) : (
            <>
              I build{' '}
              <span className='bg-accent px-1.5 text-[#0a0a0a]'>AI-powered</span>{' '}
              products for{' '}
              <span className='text-[#0a0a0a]/55'>startups that need to</span>{' '}
              ship.
            </>
          )}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='mt-4 max-w-xl font-sans3 text-sm leading-relaxed text-gray-600 sm:mt-5 sm:text-base'
        >
          {copy.subline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55 }}
          className='mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-start'
        >
          {bookingUrl ? (
            <Button
              href={bookingUrl}
              target='_blank'
              rel='noopener noreferrer'
              icon={<Calendar />}
            >
              {copy.ctaBook}
            </Button>
          ) : null}
          <Button
            variant='secondary'
            onClick={() => scrollToSection('projects')}
            icon={<ArrowRight />}
          >
            {copy.ctaSeeWork}
          </Button>
          <Button
            variant='outline'
            onClick={() => scrollToSection('contactme')}
            icon={<MessageSquare />}
            className='!text-[#0a0a0a]'
          >
            {copy.ctaDropMessage}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingSection;
