import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Calendar, MessageSquare } from 'lucide-react';

const ProfileAvatarCanvas = lazy(() => import('./ProfileAvatarCanvas'));

const scrollToSection = (anchor) => {
  const el = document.getElementById(`${anchor}-section`);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/** Default 30 min Cal.com booking — override with REACT_APP_BOOKING_URL if needed */
const DEFAULT_CAL_BOOKING_URL = 'https://cal.com/hussain-hamim-fp9qc6/30min';

const LandingSection = ({ locale = 'en' }) => {
  const isPashto = locale === 'ps';
  const bookingUrl = (
    process.env.REACT_APP_BOOKING_URL || DEFAULT_CAL_BOOKING_URL
  ).trim();
  const copy = {
    greeting: isPashto ? 'سلام، زه' : "hey i'm",
    firstName: isPashto ? 'محمد حسین' : 'HUSSAIN',
    lastName: isPashto ? 'حمیم' : 'HAMIM',
    headline: isPashto
      ? 'زه د سټارټ اپونو لپاره د AI پر بنسټ وېب او موبايل پروډکټونه جوړوم، له MVP څخه تر لانچ پورې.'
      : 'I build AI-powered web and mobile products for startups, from MVP to launch.',
    description: isPashto
      ? 'Full-Stack، موبايل پروګرامونه، او د AI اېجنټ سيستمونه چې په ژر وخت کې رښتينې پايلې راوړي.'
      : 'Full-stack web, mobile apps, and AI agent systems that ship fast and drive real results.',
    ctaSeeWork: isPashto ? 'زما کار وګورئ' : 'See my work',
    ctaBook: isPashto ? 'د لیدنې وخت وټاکئ' : 'Book a call',
    ctaDropMessage: isPashto ? 'پیغام پریږدئ' : 'Drop a message',
  };
  const socialLinks = [
    {
      icon: FaGithub,
      url: 'https://github.com/Hussain-hamim',
      color: 'hover:text-white',
    },
    {
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/hussain-hamim/',
      color: 'hover:text-blue-400',
    },
    {
      icon: FaInstagram,
      url: 'https://www.instagram.com/hussainhamim_',
      color: 'hover:text-pink-500',
    },
    {
      icon: FaXTwitter,
      url: 'https://x.com/hussainim_',
      color: 'hover:text-gray-400',
    },
    {
      icon: FaEnvelope,
      url: 'mailto:mohammadhussainafghan83@gmail.com',
      color: 'hover:text-red-400',
    },
    {
      icon: FaWhatsapp,
      url: 'https://wa.me/93780338261?text=' + encodeURIComponent("Hi Hussain — saw your portfolio, got a quick question."),
      color: 'hover:text-green-400',
      primary: true,
      label: isPashto ? 'چټ وکړئ' : 'Chat',
    },
  ];

  return (
    <section className='relative w-full min-h-screen overflow-hidden'>
      {/* Overlay Content */}
      <div className='absolute inset-0 z-20 flex max-w-7xl mx-auto pointer-events-none flex-col justify-start pb-16 pt-[max(5.5rem,calc(env(safe-area-inset-top)+3.75rem))] sm:pb-20 sm:pt-24 md:justify-center md:pb-0 md:pt-24 md:min-h-full pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:pl-6 sm:pr-6 md:px-12'>
        <div className='w-full min-w-0 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start md:items-center'>
          {/* Left Column - Text */}
          <div className='pointer-events-auto w-full min-w-0 max-w-full'>
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className='font-sans1 text-xs font-bold text-white/75 sm:text-sm mb-3 sm:mb-4'
            >
              {copy.greeting}
            </motion.p>

            {/* Name Title */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className='text-[clamp(1.75rem,9vw,2.5rem)] sm:text-5xl md:text-7xl lg:text-8xl font-bold font-sans1 text-white leading-[1.05] sm:leading-tight tracking-tight sm:tracking-tighter break-words'
            >
              {copy.firstName} <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#D7FF00] to-teal-400'>
                {copy.lastName}
              </span>
            </motion.h1>

            {/* Role & Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className='mt-6 sm:mt-8 md:mt-12 flex w-full max-w-xl flex-col border-t border-white/10 pt-5 md:border-t-0 md:pt-0 md:border-s-2 md:border-s-white/10 md:ps-6'
            >
              <p className='text-white font-sans3 text-base sm:text-xl md:text-2xl leading-snug w-full font-medium'>
                {isPashto ? (
                  copy.headline
                ) : (
                  <>
                    I build{' '}
                    <span className='text-[#D7FF00]'>AI-powered</span> web
                    and mobile products for{' '}
                    <span className='text-[#D7FF00]'>startups</span>, from
                    MVP to launch.
                  </>
                )}
              </p>
              <p className='mt-4 text-gray-400 font-sans3 text-sm sm:text-base leading-relaxed w-full max-w-xl'>
                {copy.description}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.55 }}
                className='mt-4 sm:mt-6 flex w-full max-w-xl flex-col gap-2 sm:gap-3 sm:flex-row sm:flex-wrap sm:items-center'
              >
                <button
                  type='button'
                  onClick={() => scrollToSection('projects')}
                  className='inline-flex w-full min-h-[40px] items-center justify-center rounded-full bg-[#D7FF00] px-4 py-2 text-xs font-semibold text-black transition-all duration-300 hover:bg-[#c4ec00] hover:shadow-lg hover:shadow-[#D7FF00]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:w-auto sm:min-h-[44px] sm:px-6 sm:py-3 sm:text-sm'
                >
                  {copy.ctaSeeWork}
                </button>
                {bookingUrl ? (
                  <a
                    href={bookingUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex w-full min-h-[40px] items-center justify-center gap-1.5 rounded-full border-[0.5px] border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:border-[#D7FF00]/50 hover:bg-[#D7FF00]/10 hover:shadow-lg hover:shadow-[#D7FF00]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:w-auto sm:min-h-[44px] sm:gap-2 sm:px-6 sm:py-3 sm:text-sm'
                  >
                    <Calendar className='h-3.5 w-3.5 shrink-0 opacity-90 sm:h-4 sm:w-4' aria-hidden />
                    {copy.ctaBook}
                  </a>
                ) : null}
                <button
                  type='button'
                  onClick={() => scrollToSection('contactme')}
                  className='inline-flex w-full min-h-[40px] items-center justify-center gap-1.5 rounded-full border-[0.5px] border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:border-[#D7FF00]/50 hover:bg-[#D7FF00]/10 hover:shadow-lg hover:shadow-[#D7FF00]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:w-auto sm:min-h-[44px] sm:gap-2 sm:px-6 sm:py-3 sm:text-sm'
                >
                  <MessageSquare className='h-3.5 w-3.5 shrink-0 opacity-90 sm:h-4 sm:w-4' aria-hidden />
                  {copy.ctaDropMessage}
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column: photo first, socials below (mobile + desktop) */}
          <div className='pointer-events-auto relative z-20 mt-3 flex w-full min-w-0 flex-col items-center justify-center sm:mt-5 md:mt-0 md:items-end md:pr-8 lg:pr-12'>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className='group relative mb-4 h-44 w-44 cursor-pointer sm:mb-5 sm:h-56 sm:w-56 md:mb-8 md:h-64 md:w-64 lg:h-72 lg:w-72'
            >
              <div className='relative h-full w-full rounded-full overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-[#D7FF00]/20'>
                <div className='absolute -inset-1 bg-black/30 rounded-full blur-xl group-hover:bg-black/40 transition-all duration-300 z-0'></div>
                <img
                  src={require('../asset/hsn3.jpg')}
                  alt='Hussain Hamim'
                  className='relative h-full w-full object-cover object-center rounded-full transition-all duration-300 group-hover:brightness-110 z-10'
                />

                {/* Particle Overlay */}
                <div className='absolute inset-0 rounded-full overflow-hidden z-30 pointer-events-none mix-blend-screen'>
                  <Suspense fallback={null}>
                    <ProfileAvatarCanvas />
                  </Suspense>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className='flex w-full max-w-md flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6'
            >
              {socialLinks.map((social, index) => {
                if (social.primary) {
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={social.label || 'WhatsApp'}
                      className='group relative z-40 inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5a] hover:shadow-[0_10px_28px_rgba(37,211,102,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:gap-2 sm:px-3.5 sm:text-sm'
                    >
                      <span className='relative flex h-5 w-5 items-center justify-center rounded-full bg-white/15 sm:h-6 sm:w-6'>
                        <social.icon size={16} />
                      </span>
                      <span className='relative hidden sm:inline'>{social.label}</span>
                    </a>
                  );
                }
                return (
                  <a
                    key={index}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`z-40 relative text-gray-300 transition-all duration-300 hover:-translate-y-1 md:text-gray-500 ${social.color}`}
                    aria-label={`Visit ${social.url}`}
                  >
                    <social.icon className='h-6 w-6 sm:h-7 sm:w-7 md:h-6 md:w-6' />
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className='absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none'
      >
        <div className='w-[1px] h-12 bg-gradient-to-b from-teal-400 to-transparent'></div>
      </motion.div>
    </section>
  );
};

export default LandingSection;
