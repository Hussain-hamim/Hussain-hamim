import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import ideahunt from '../../images/ideahunt3.png';
import aegnis from '../../images/aegnisai.png';
import liquidglass from '../../images/liquidglass.png';
import devsync from '../../images/devsync.png';
import goaltracking from '../../images/goaltracking.png';
import shanai from '../../images/shanai2.png';

const PROJECTS = [
  {
    title: 'IdeaHunt',
    category: 'AI · SaaS',
    description:
      'Discover & validate startup ideas from real demand across the web.',
    image: ideahunt,
    live: 'https://www.ideahunt.pro/',
  },
  {
    title: 'Aegnis AI',
    category: 'AI · Productivity',
    description:
      'Your AI Chief of Staff — from to-do list to done list.',
    image: aegnis,
    live: 'https://aegnis.life',
  },
  {
    title: 'LiquidGlass',
    category: 'React · WebGL',
    description:
      '54 glass effects for React — browse, preview, and copy into projects.',
    image: liquidglass,
    live: 'https://liquidglass-sigma.vercel.app/',
  },
  {
    title: 'DevSync',
    category: 'Next.js · Collab',
    description:
      'Developers connect, list projects, and chat in real time.',
    image: devsync,
    live: 'https://devsync.codes/',
  },
  {
    title: 'Couple Connect',
    category: 'iOS · Swift',
    description:
      'Shared goals, timeline, and chat for couples building together.',
    image: goaltracking,
    live: 'https://goals-tracking-cc.vercel.app/#app-screenshots',
  },
  {
    title: 'Shan-AI',
    category: 'Mobile · AI',
    description:
      'Cross-platform AI assistant with chat, image gen, and vision.',
    image: shanai,
    live: 'https://github.com/Hussain-hamim/ShanAI',
  },
];

export default function ProjectsSection() {
  return (
    <section
      id='projects'
      className='relative bg-black px-8 py-24 md:px-16 lg:px-20'
    >
      <div className='mx-auto max-w-6xl'>
        <motion.header
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='mb-14'
        >
          <p className='font-body mb-4 text-sm text-white/80'>{'// Selected work'}</p>
          <h2 className='font-heading text-5xl italic leading-[0.9] tracking-[-2px] text-white md:text-6xl lg:text-7xl'>
            Projects
            <br />
            that shipped
          </h2>
        </motion.header>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.live}
              target='_blank'
              rel='noopener noreferrer'
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.06, duration: 0.55, ease: 'easeOut' }}
              className='liquid-glass group flex flex-col overflow-hidden rounded-[1.25rem]'
            >
              <div className='aspect-[16/11] overflow-hidden'>
                <img
                  src={project.image}
                  alt={project.title}
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  loading='lazy'
                />
              </div>
              <div className='flex flex-1 flex-col p-5'>
                <div className='flex items-start justify-between gap-3'>
                  <div>
                    <p className='font-body text-[11px] uppercase tracking-wider text-white/60'>
                      {project.category}
                    </p>
                    <h3 className='font-heading mt-1 text-2xl italic tracking-[-1px] text-white md:text-3xl'>
                      {project.title}
                    </h3>
                  </div>
                  <span className='liquid-glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full'>
                    <ArrowUpRight className='h-4 w-4 text-white' />
                  </span>
                </div>
                <p className='font-body mt-3 text-sm font-light leading-snug text-white/80'>
                  {project.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className='mt-10 flex justify-center'>
          <a
            href='https://github.com/Hussain-hamim'
            target='_blank'
            rel='noopener noreferrer'
            className='liquid-glass-strong inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white'
          >
            More on GitHub
            <ArrowUpRight className='h-4 w-4' />
          </a>
        </div>
      </div>
    </section>
  );
}
