import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Button from './Button';

const ExperienceCard = ({ exp, index, isPashto, isRtl, isLast }) => (
  <motion.article
    initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true, margin: '-50px' }}
    className={`relative flex gap-5 md:gap-7 group ${
      isRtl ? 'flex-row-reverse' : ''
    }`}
  >
    {/* Timeline rail + node */}
    <div className='relative z-10 flex w-4 flex-shrink-0 flex-col items-center self-stretch md:w-5'>
      {/* Segment below this node (skip on last) */}
      {!isLast ? (
        <span
          aria-hidden
          className='absolute top-[1.125rem] bottom-[-1.25rem] w-px bg-gradient-to-b from-accent via-accent/70 to-accent/35'
        />
      ) : null}

      <span
        className={`relative mt-4 flex h-3 w-3 items-center justify-center rounded-full border md:mt-[1.125rem] md:h-3.5 md:w-3.5 ${
          exp.isCurrent
            ? 'border-ink bg-accent shadow-[0_0_0_2px_rgba(215,255,0,0.22)] dark:border-white'
            : 'border-ink/35 bg-surface-alt dark:border-white/35'
        }`}
      >
        {exp.isCurrent ? (
          <span className='absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-accent/40 opacity-40' />
        ) : (
          <span className='h-1 w-1 rounded-full bg-ink/40 dark:bg-white/45' />
        )}
        {exp.isCurrent ? (
          <span className='relative h-1 w-1 rounded-full bg-ink dark:bg-black' />
        ) : null}
      </span>
    </div>

    <div className='min-w-0 flex-1 pb-1'>
      <div className='relative rounded-xl bg-panel p-4 transition-[box-shadow,background-color] duration-300 group-hover:bg-panel-hover group-hover:shadow-[0_0_0_0.5px_rgba(0,0,0,0.22)] md:p-5'>
        {/* Tick from card toward the timeline node */}
        <span
          aria-hidden
          className={`absolute top-[1.375rem] h-px w-3 bg-accent/50 md:top-[1.5rem] ${
            isRtl ? 'left-full' : 'right-full'
          }`}
        />

        <div className={`mb-1.5 ${isRtl ? 'text-right' : ''}`}>
          <span className='text-[10px] font-mono uppercase tracking-wider text-gray-600 dark:text-white/55'>
            {exp.duration}
          </span>
        </div>
        <h3
          className={`mb-0.5 font-sans1 text-lg font-bold tracking-tight text-ink md:text-xl ${
            isRtl ? 'text-right' : ''
          }`}
        >
          {exp.role}
        </h3>
        <p
          className={`mb-2 text-sm font-medium text-gray-600 dark:text-white/55 ${
            isRtl ? 'text-right' : ''
          }`}
        >
          {exp.company}
        </p>
        <p
          className={`font-sans3 text-sm leading-relaxed text-gray-700 dark:text-white/70 ${
            isRtl ? 'text-right' : ''
          }`}
        >
          {exp.description}
        </p>
      </div>
    </div>
  </motion.article>
);

const ExperienceSection = ({ locale = 'en' }) => {
  const isPashto = locale === 'ps';
  const isRtl = isPashto;
  const [showThird, setShowThird] = useState(false);

  const experiences = [
    {
      id: 1,
      role: isPashto ? 'سافټوېیر انجينر' : 'Software Engineer',
      company: 'Chamoy Labs',
      duration: 'Jul 2026',
      isCurrent: true,
      description: isPashto
        ? 'د محصول ایډیو په دوامداره او فکر شوي سافټوېیر بدلول — له مفهوم څخه تر سپارلو پورې پاک تطبیق او عملي قضاوت.'
        : 'Turning product ideas into durable, thoughtful software, clean implementation and practical judgment from concept to shipped product.',
    },
    {
      id: 2,
      role: isPashto ? 'سافټوېیر انجينر' : 'Software Engineer',
      company: 'Zapp studios',
      duration: 'Sept 2025',
      isCurrent: false,
      description: isPashto
        ? 'د Next.js او Supabase په مرسته د Full-Stack وېب پروګرامونو پراختيا.'
        : 'Full-stack web applications and Mobile applications using Next.js, Swift & Supabase.',
    },
    {
      id: 3,
      role: isPashto ? 'سافټوېیر انجينر' : 'Software Engineer',
      company: 'EvolvFit',
      duration: 'Aug 2025 - Oct 2025',
      isCurrent: false,
      description: isPashto
        ? 'د React Native او Node.js بیکېنډ په کارولو د موبايل پروګرامونو جوړول او پراختيا.'
        : 'Developing mobile apps with React Native & Node.js backend.',
    },
    {
      id: 4,
      role: isPashto ? 'د موبايل پروګرامونو انجينر' : 'Mobile App Developer',
      company: 'Himalbyte',
      duration: 'May 2025 - Jul 2025',
      isCurrent: false,
      description: isPashto
        ? 'د کراس پلېټفارم موبايل پروګرامونو پراختيا، په لوړ کارکردګۍ تمرکز سره.'
        : 'Cross-platform mobile development focused on performance.',
    },
  ];

  const visible = experiences.slice(0, 2);
  const hidden = experiences.slice(2);
  const lastVisibleIndex = showThird
    ? experiences.length - 1
    : visible.length - 1;

  return (
    <section
      id='experience-section'
      className='section-sep relative z-10 flex min-h-screen items-center overflow-hidden bg-surface-alt px-4 py-32 transition-colors duration-300 md:px-8'
    >
      <div className='relative z-10 mx-auto w-full max-w-4xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='mb-16 flex flex-col items-center'
        >
          <h2 className='text-center font-sans1 text-4xl font-bold uppercase tracking-tight text-ink md:text-5xl'>
            {isPashto ? 'تجربه' : 'EXPERIENCE'}
          </h2>
        </motion.div>

        <div className='relative'>
          <div className='space-y-5'>
            {visible.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={index}
                isPashto={isPashto}
                isRtl={isRtl}
                isLast={!showThird && index === lastVisibleIndex}
              />
            ))}

            <div
              className={`flex gap-5 md:gap-7 ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              <div className='relative flex w-4 flex-shrink-0 justify-center md:w-5'>
                <span
                  aria-hidden
                  className='absolute inset-y-0 w-px bg-gradient-to-b from-accent/70 via-accent/45 to-accent/25'
                />
              </div>
              <div className='flex flex-1 justify-center py-2'>
                <Button
                  type='button'
                  size='sm'
                  variant='primary'
                  icon={showThird ? <FaChevronUp /> : <FaChevronDown />}
                  onClick={() => setShowThird((v) => !v)}
                >
                  {showThird
                    ? isPashto
                      ? 'لږ وښيه'
                      : 'Show less'
                    : isPashto
                      ? 'نور تجربه وښيه'
                      : 'Show more experience'}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {showThird && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='space-y-5 overflow-hidden'
                >
                  {hidden.map((exp, index) => (
                    <ExperienceCard
                      key={exp.id}
                      exp={exp}
                      index={index}
                      isPashto={isPashto}
                      isRtl={isRtl}
                      isLast={index === hidden.length - 1}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
