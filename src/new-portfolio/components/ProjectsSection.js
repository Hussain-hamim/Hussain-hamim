import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveProjectButton from './LiveProjectButton';
import FadeIn from './FadeIn';

import ideahunt from '../../images/ideahunt2.png';
import aegnis from '../../images/aegnisai.png';
import liquidglass from '../../images/liquidglass.png';
import photo1 from '../../images/photos-stack-1.png';
import photo2 from '../../images/photos-stack-2.png';
import photo3 from '../../images/photos-stack-3.png';
import photo4 from '../../images/photos-stack-4.png';
import goaltracking from '../../images/goaltracking.png';
import shanai from '../../images/shanai2.png';

const PROJECTS = [
  {
    num: '01',
    category: 'Client',
    name: 'IdeaHunt',
    live: 'https://www.ideahunt.pro/',
    col1Top: photo1,
    col1Bottom: photo2,
    col2: ideahunt,
  },
  {
    num: '02',
    category: 'Personal',
    name: 'Aegnis AI',
    live: 'https://aegnis.life',
    col1Top: goaltracking,
    col1Bottom: shanai,
    col2: aegnis,
  },
  {
    num: '03',
    category: 'Personal',
    name: 'LiquidGlass',
    live: 'https://liquidglass-sigma.vercel.app/',
    col1Top: photo3,
    col1Bottom: photo4,
    col2: liquidglass,
  },
];

function ProjectCard({ project, index, total, progress }) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    /*
      Sibling sticky pattern (not sticky-inside-85vh):
      each card is sticky top-0 + full viewport tall, so the next
      card stacks on top while the previous one stays pinned & scales down.
    */
    <div
      className='sticky top-0 flex h-[85vh] items-start justify-center pt-24 md:pt-32'
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        data-project-card
        style={{
          scale,
          top: index * 28,
          transformOrigin: 'top center',
        }}
        className='relative w-full overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8'
      >
        <div className='mb-3 flex flex-wrap items-end justify-between gap-3 sm:mb-4'>
          <div className='flex flex-wrap items-end gap-3 sm:gap-5 md:gap-6'>
            <span
              className='font-black leading-none text-[#D7E2EA]'
              style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
            >
              {project.num}
            </span>
            <div className='pb-1 sm:pb-2'>
              <p className='text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/70 sm:text-sm'>
                {project.category}
              </p>
              <h3
                className='font-medium uppercase text-[#D7E2EA]'
                style={{ fontSize: 'clamp(1rem, 2vw, 1.75rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton href={project.live} className='mb-1' />
        </div>

        <div className='flex gap-3 sm:gap-4 md:gap-5'>
          <div className='flex w-[40%] flex-col gap-3 sm:gap-4'>
            <img
              src={project.col1Top}
              alt=''
              className='w-full rounded-[28px] object-cover sm:rounded-[40px] md:rounded-[50px]'
              style={{ height: 'clamp(100px, 12vw, 180px)' }}
              loading='lazy'
            />
            <img
              src={project.col1Bottom}
              alt=''
              className='w-full rounded-[28px] object-cover sm:rounded-[40px] md:rounded-[50px]'
              style={{ height: 'clamp(120px, 18vw, 260px)' }}
              loading='lazy'
            />
          </div>
          <div className='w-[60%]'>
            <img
              src={project.col2}
              alt={project.name}
              className='h-full min-h-[220px] w-full rounded-[28px] object-cover sm:min-h-[280px] sm:rounded-[40px] md:rounded-[50px]'
              loading='lazy'
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id='projects'
      className='relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-32 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32'
    >
      <FadeIn delay={0} y={40}>
        <h2
          className='hero-heading mb-10 text-center font-black uppercase leading-none tracking-tight sm:mb-14 md:mb-16'
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div ref={containerRef} className='relative mx-auto max-w-6xl'>
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={index}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
