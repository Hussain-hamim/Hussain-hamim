import React from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Sparkles } from '@react-three/drei';
import SpaceGame from './SpaceGame';

const LandingSection = ({ locale = 'en' }) => {
  const isPashto = locale === 'ps';
  const copy = {
    greeting: isPashto ? 'سلام، زه' : "hey i'm",
    firstName: isPashto ? 'محمد حسین' : 'HUSSAIN',
    lastName: isPashto ? 'حمیم' : 'HAMIM',
    description: isPashto
      ? 'زه د کوډ او خلاقيت په مرسته اغېزمنې ډيجيټل تجربې جوړوم. د AI اېجنټونه، د کار د ګړنديتوب پليټفارمونه، د سوداګرۍ د اعتبار وسايل، او د پراختياکوونکو د همکارۍ سيستمونه جوړوم. زما اصلي تمرکز Full-Stack، Mobile App Development او AI پر بنسټ حللارو باندې دی.'
      : 'Forging digital experiences with Code & Creativity. Building AI agents, productivity platforms, business validation tools, and developer collaboration systems and more... Specializing in Full-Stack, Mobile App Development & AI-powered solutions.',
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
      url: 'https://wa.me/93780338261',
      color: 'hover:text-green-400',
    },
  ];

  return (
    <section className='relative w-full min-h-screen overflow-hidden bg-[#0f0f0f]'>
      {/* 3D Game Background */}
      <SpaceGame />

      {/* Overlay Content */}
      <div className='absolute inset-0 z-10 flex flex-col justify-center px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pointer-events-none pt-24 sm:pt-20 pb-20 md:pb-0'>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          {/* Left Column - Text */}
          <div className='pointer-events-auto pr-4 sm:pr-0'>
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className='text-teal-400 font-mono text-xs md:text-sm mb-4'
            >
              {copy.greeting}
            </motion.p>

            {/* Name Title */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className='text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-sans1 text-white leading-tight tracking-tighter break-words'
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
              className='mt-6 sm:mt-8 md:mt-12 inline-flex flex-col border-l-2 border-white/10 pl-4 sm:pl-6'
            >
              <p className='text-gray-400 font-sans3 text-base sm:text-lg leading-relaxed max-w-lg'>
                {isPashto ? (
                  copy.description
                ) : (
                  <>
                    Forging digital experiences with{' '}
                    <span className='text-white'>Code</span> &{' '}
                    <span className='text-white'>Creativity</span>. Building AI
                    agents, productivity platforms, business validation tools,
                    and developer collaboration systems and more... Specializing
                    in Full-Stack, Mobile App Development & AI-powered
                    solutions.
                  </>
                )}
              </p>
            </motion.div>
          </div>

          {/* Right Column - Image & Social Links */}
          <div className='pointer-events-auto justify-center md:justify-end relative flex flex-col items-center pr-0 md:pr-8 lg:pr-12 mt-12 md:mt-0 z-20'>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className='relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 cursor-pointer group mb-6 md:mb-8'
            >
              <div className='relative w-full h-full rounded-full overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-[#D7FF00]/20'>
                <div className='absolute -inset-1 bg-black/30 rounded-full blur-xl group-hover:bg-black/40 transition-all duration-300 z-0'></div>
                <img
                  src={require('../asset/hsn3.jpg')}
                  alt='Hussain Hamim'
                  className='relative w-full h-full object-cover object-center rounded-full transition-all duration-300 group-hover:brightness-110 z-10'
                />

                {/* Particle Overlay */}
                <div className='absolute inset-0 rounded-full overflow-hidden z-30 pointer-events-none mix-blend-screen'>
                  <Canvas
                    gl={{ alpha: true, premultipliedAlpha: false }}
                    style={{ background: 'transparent' }}
                  >
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <ambientLight intensity={0.5} />
                    <Stars
                      radius={50}
                      depth={30}
                      count={1500}
                      factor={3}
                      saturation={0}
                      fade
                      speed={2}
                    />
                    <Sparkles
                      count={40}
                      scale={8}
                      size={2.5}
                      speed={0.4}
                      opacity={0.2}
                      color='#00FFFF'
                    />
                  </Canvas>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className='flex items-center justify-center gap-4 md:gap-6 z-40 relative w-full'
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`text-gray-300 md:text-gray-500 transition-all duration-300 hover:-translate-y-1 ${social.color} z-40 relative`}
                  style={{ fontSize: '28px' }}
                  aria-label={`Visit ${social.url}`}
                >
                  <social.icon size={28} className='md:w-6 md:h-6' />
                </a>
              ))}
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
