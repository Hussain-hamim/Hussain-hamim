import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import ideahunt from '../../images/ideahunt3.png';
import aegnis from '../../images/aegnisai.png';
import liquidglass from '../../images/liquidglass.png';
import devsync from '../../images/devsync.png';

const PROJECTS = [
  {
    title: 'IdeaHunt',
    span: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
    image: ideahunt,
    live: 'https://www.ideahunt.pro/',
  },
  {
    title: 'Aegnis AI',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/5] md:aspect-auto md:min-h-full',
    image: aegnis,
    live: 'https://aegnis.life',
  },
  {
    title: 'LiquidGlass',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/5] md:aspect-auto md:min-h-full',
    image: liquidglass,
    live: 'https://liquidglass-sigma.vercel.app/',
  },
  {
    title: 'DevSync',
    span: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
    image: devsync,
    live: 'https://devsync.codes/',
  },
];

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
};

export default function WorksSection() {
  return (
    <section id='work' className='bg-studio py-12 md:py-16'>
      <div className='mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16'>
        <motion.div {...fade} className='mb-10 flex items-end justify-between gap-6'>
          <div>
            <div className='mb-4 flex items-center gap-3'>
              <span className='bg-studio-stroke h-px w-8' />
              <span className='text-studio-muted text-xs uppercase tracking-[0.3em]'>
                Selected Work
              </span>
            </div>
            <h2 className='text-studio text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl'>
              Featured{' '}
              <span className='font-display italic'>projects</span>
            </h2>
            <p className='text-studio-muted mt-3 max-w-md text-sm md:text-base'>
              A selection of products I&apos;ve shipped — from concept to launch.
            </p>
          </div>
          <a
            href='https://github.com/Hussain-hamim'
            target='_blank'
            rel='noopener noreferrer'
            className='group relative hidden rounded-full md:inline-flex'
          >
            <span className='gradient-border-ring absolute -inset-[2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100' />
            <span className='bg-studio-surface relative inline-flex items-center gap-2 rounded-full border border-[hsl(var(--studio-stroke))] px-5 py-2.5 text-sm text-studio'>
              View all work
              <ArrowRight className='h-4 w-4' />
            </span>
          </a>
        </motion.div>

        <div className='grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6'>
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.live}
              target='_blank'
              rel='noopener noreferrer'
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-3xl border border-[hsl(var(--studio-stroke))] bg-[hsl(var(--studio-surface))] ${p.span}`}
            >
              <div className={`${p.aspect} relative overflow-hidden`}>
                <img
                  src={p.image}
                  alt={p.title}
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  loading='lazy'
                />
                <div className='halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply' />
                <div className='absolute inset-0 bg-[hsl(var(--studio-bg))]/70 opacity-0 backdrop-blur-lg transition-opacity duration-300 group-hover:opacity-100' />
                <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <span className='relative inline-flex'>
                    <span className='gradient-border-ring absolute -inset-[2px] rounded-full' />
                    <span className='relative rounded-full bg-white px-4 py-2 text-sm text-black'>
                      View —{' '}
                      <span className='font-display italic'>{p.title}</span>
                    </span>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
