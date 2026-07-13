import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Button from './Button';

const ExperienceCard = ({ exp, index, isPashto, isRtl }) => (
  <motion.article
    initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true, margin: '-50px' }}
    className='relative flex gap-4 md:gap-5 group'
  >
    <div className='relative z-10 flex-shrink-0 mt-1'>
      <div className='w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#F3F1E6] border-2 border-black flex items-center justify-center'>
        {exp.isCurrent && (
          <div className='w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#D7FF00] border border-black' />
        )}
      </div>
    </div>
    <div className='flex-1 min-w-0'>
      <div
        className='relative rounded-xl p-4 md:p-5 bg-[#EDEBE0] transition-[box-shadow,background-color] duration-300 group-hover:bg-[#E9E7DB] group-hover:shadow-[0_0_0_0.5px_rgba(0,0,0,0.22)]'
      >
        <div className='flex flex-wrap items-center gap-2 mb-1.5'>
          <span className='text-[10px] font-mono text-gray-600 uppercase tracking-wider'>
            {exp.duration}
          </span>
          {exp.isCurrent && (
            <span
              className='text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-black bg-[#D7FF00] border border-black'
              aria-label={isPashto ? 'اوسنۍ دنده' : 'Current role'}
            >
              {isPashto ? 'اوس' : 'Present'}
            </span>
          )}
        </div>
        <h3 className='text-lg md:text-xl font-bold font-sans1 text-[#0a0a0a] mb-0.5 tracking-tight'>
          {exp.role}
        </h3>
        <p className='text-gray-600 text-sm font-medium mb-2'>{exp.company}</p>
        <p className='text-gray-700 text-sm leading-relaxed font-sans3'>
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
        : 'Turning product ideas into durable, thoughtful software — clean implementation and practical judgment from concept to shipped product.',
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

  return (
    <section
      id='experience-section'
      className='relative z-10 py-32 px-4 md:px-8 overflow-hidden min-h-screen flex items-center bg-[#F3F1E6]'
    >
      <div className='max-w-4xl mx-auto relative z-10 w-full'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='flex flex-col items-center mb-16'
        >
          <h2 className='text-center text-4xl md:text-5xl font-bold font-sans1 text-[#0a0a0a] tracking-tight uppercase'>
            {isPashto ? 'تجربه' : 'EXPERIENCE'}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className='relative'>
          {/* Vertical line */}
          <div
            className='absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-black/40 via-black/15 to-transparent'
            aria-hidden
          />

          <div className='space-y-5'>
            {experiences.slice(0, 2).map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={index}
                isPashto={isPashto}
                isRtl={isRtl}
              />
            ))}

            {/* Toggle for third experience */}
            <div className='flex gap-4 md:gap-5'>
              <div className='w-4 md:w-5 flex-shrink-0' />
              <div className='flex-1 flex justify-center py-2'>
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
                  className='overflow-hidden space-y-5'
                >
                  {experiences.slice(2).map((exp, index) => (
                    <ExperienceCard
                      key={exp.id}
                      exp={exp}
                      index={index}
                      isPashto={isPashto}
                      isRtl={isRtl}
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
