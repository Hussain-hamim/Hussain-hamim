import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer } from 'react-icons/fa';
import { keyframes, css } from '@emotion/react';
import { Box, Flex, Text } from '@chakra-ui/react';

const flicker = keyframes`
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
`;

const ExperienceSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const experiences = [
    {
      id: 1,
      role: 'Software Engineer Intern',
      company: '@ EvolvFit',
      duration: '2025 Aug - present',
      description:
        'Maintain and improve full-stack mobile applications using React Native with a focus on performance optimization and superior user experience.',
      icon: FaCode,
      highlights: ['...', '...', '...'],
      tech: ['React Native', 'Node.js', 'MongoDB', 'Expo'],
    },
    {
      id: 2,
      role: 'Founding Engineer',
      company: '@ Himalbyte',
      duration: '2025 May - 2025 Jul',
      description:
        'Developed cross-platform mobile applications using React Native with a focus on performance optimization and superior user experience.',
      icon: FaCode,
      highlights: [
        'Implemented client and admin panels with real-time updates',
        'Integrated Supabase for backend services and authentication',
        'Implemented push notifications and offline capabilities',
      ],
      tech: ['React Native', 'Supabase', 'TypeScript', 'Expo'],
    },
    {
      id: 3,
      role: 'Full Stack Developer',
      company: '@ Madrasa App',
      duration: '2025 Jun - 2025 Jul',
      description:
        'Led development of a full-stack community platform with payment integration and premium features.',
      icon: FaServer,
      highlights: [
        'Built with Next.js, TailwindCSS, Framer and Supabase',
        'Implemented Stripe payment integration',
        'Developed admin dashboard with analytics',
      ],
      tech: ['Next.js', 'TailwindCSS', 'Supabase', 'Stripe'],
    },
  ];

  return (
    <section
      id='experience'
      className='relative  overflow-hidden py-20 px-2 md:px-10 lg:px-20'
      css={css`
        background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
      `}
    >
      <div
        className='absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-40 filter blur-[60px] z-0'
        css={css`
          background: radial-gradient(circle, #d7ff00, transparent 70%);
          animation: ${flicker} 7s ease-in-out infinite 1s;
        `}
      />

      <div className='relative z-10 max-w-6xl mx-auto'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center text-white text-4xl md:text-5xl font-bold mb-16 text-transparent bg-clip-text'
          css={css`
            background: linear-gradient(
              90deg,
              #d7ff00 0%,
              #ff2e88 50%,
              #7b61ff 100%
            );
          `}
        >
          Work Experience
        </motion.h2>

        <div className='space-y-6'>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className={` border-[1px] rounded-xl overflow-hidden transition-all duration-300 ${
                expandedCard === exp.id
                  ? 'border-[#174023e1] border-[1px]'
                  : 'border-[#333] border-[1px]'
              }`}
              css={css`
                box-shadow: ${expandedCard === exp.id
                  ? '0 0 15px rgba(215, 255, 0, 0.3)'
                  : '0 5px 15px rgba(0, 0, 0, 0.3)'};
                background: rgba(30, 30, 30, 0.7);
                backdrop-filter: blur(10px);
              `}
            >
              <div
                className='p-6 cursor-pointer flex justify-between items-start'
                onClick={() =>
                  setExpandedCard(expandedCard === exp.id ? null : exp.id)
                }
              >
                <div className='flex items-start space-x-4'>
                  <div className='p-[10px] rounded-lg bg-black  '>
                    <exp.icon
                      className={`text-xl ${
                        expandedCard === exp.id
                          ? 'text-[#D7FF00]'
                          : 'text-[#DA70D6]'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className='text-xl md:text-2xl font-bold text-white'>
                      {exp.role}
                    </h3>
                    <p className='text-[#DA70D6] text-sm md:text-base'>
                      {exp.company} • {exp.duration}
                    </p>
                  </div>
                </div>
                <div
                  className={`transition-transform ${
                    expandedCard === exp.id ? 'rotate-180' : ''
                  }`}
                >
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6 9L12 15L18 9'
                      stroke={expandedCard === exp.id ? '#D7FF00' : '#DA70D6'}
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </div>

              {expandedCard === exp.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className='px-6 pb-6'
                >
                  <p className='text-[#A38BFF] mt-2 text-sm md:text-base'>
                    {exp.description}
                  </p>
                  <div className='mt-4'>
                    <h4 className='text-[#FF2E88] font-bold mb-3'>
                      Key Contributions:
                    </h4>
                    <ul className='space-y-2 pl-5'>
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className='text-[#A38BFF] relative before:absolute before:left-[-15px] before:top-[8px] before:w-[6px] before:h-[6px] before:rounded-full before:bg-[#FF2E88]'
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className='mt-6'>
                    <h4 className='text-[#FF2E88] font-bold mb-3'>
                      Technologies Used:
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {exp.tech.map((tech, i) => (
                        <span
                          key={i}
                          className='px-3 py-1 rounded-full text-sm text-gray-400'
                          css={css`
                            background: rgba(163, 139, 255, 0.1);
                            border: 1px solid rgba(163, 139, 255, 0.3);
                            color: #a38bff;
                          `}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
