import React from 'react';
import { motion } from 'framer-motion';
import { keyframes, css } from '@emotion/react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import hamim from '../asset/hussain.jpg';
import FullScreenSection from './FullScreenSection';

// Water ripple animation for bg
const ripple = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.05); opacity: 0.4; }
  100% { transform: scale(1); opacity: 0.6; }
`;

// FadeIn keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const orchidColor = '#DA70D6';

export default function LandingSection() {
  return (
    <section className='relative overflow-hidden min-h-screen  pt-20'>
      <div
        className='absolute inset-0 bg-cover bg-center opacity-70 z-0'
        style={{
          backgroundImage: `url('/bg.jpg')`,
        }}
      />

      {/* Ripple glowing background */}
      <div
        className='absolute top-[-150px] right-[-200px] w-[500px] h-[500px] rounded-full opacity-60 filter blur-[60px] z-0'
        style={{
          background: `radial-gradient(circle, ${orchidColor}, transparent 70%)`,
          animation: `${ripple} 8s ease-in-out infinite`,
        }}
      />

      <FullScreenSection
        justifyContent='center'
        alignItems='center'
        // paddingX='20px'
        className='relative px-[20px] z-10 flex flex-col items-center'
      >
        {/* Main retro card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className='bg-black border mb-6 border-[#ddd] rounded-xl shadow-[15px_-15px_1px_rgba(221,221,221,1)] 
          flex flex-col md:flex-row items-center md:items-stretch gap-8 p-6 md:p-10 w-full max-w-5xl'
        >
          {/* Left - Text */}
          <div className='flex-1 flex flex-col justify-center text-center md:text-left space-y-3'>
            <div className='text-white font-mono text-sm'>hey, i'm</div>
            <div className='text-[#D7FF00] text-4xl md:text-6xl font-bold tracking-tight font-sans1'>
              HUSSAIN HAMIM
            </div>
            <div className='text-[#FF2E88] text-xl md:text-2xl font-bold'>
              FULL-STACK & MOBILE DEV
            </div>
            <p
              className='text-[#A38BFF] text-xs md:text-sm leading-relaxed font-mono'
              css={css`
                animation: ${fadeIn} 1s ease forwards;
                animation-delay: 0.5s;
                opacity: 0;
              `}
            >
              I am a passionate developer with a knack for solving complex
              challenges and crafting creative solutions. Skilled in
              JavaScript/TypeScript, React, Next.js, Node.js, MongoDB, Postgres,
              and React Native. I blend clean code, intuitive design, and
              creative problem-solving to turn ideas into impactful products
              that tell a story.
            </p>
          </div>

          {/* Right - Image + Social Icons */}
          <div className='flex-[0.5] flex flex-col items-center'>
            <div className='relative'>
              <img
                src={hamim}
                alt='profile'
                className='rounded-lg w-48 h-48 object-cover border-4 border-black'
                style={{
                  boxShadow:
                    '10px -10px 0px #FF2E88, -10px 10px 0px #D7FF00, 10px 10px 0px #7B61FF',
                }}
              />
            </div>
            {/* Social icons */}
            <div className='flex gap-6 mt-4 text-white'>
              <a
                href='https://github.com/Hussain-hamim'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaGithub size={20} />
              </a>
              <a
                href='https://www.linkedin.com/in/hussain-hamim/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href='https://www.instagram.com/hussainhamim_'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaInstagram size={20} />
              </a>
              <a
                href='https://twitter.com/erencodes'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </FullScreenSection>
    </section>
  );
}
