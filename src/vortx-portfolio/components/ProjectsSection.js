import { ArrowRight } from 'lucide-react';

import ideahunt from '../../images/ideahunt3.png';
import aegnis from '../../images/aegnisai.png';
import liquidglass from '../../images/liquidglass.png';
import devsync from '../../images/devsync.png';
import goaltracking from '../../images/goaltracking.png';
import shanai from '../../images/shanai2.png';

const PROJECTS = [
  {
    title: 'IdeaHunt',
    tag: 'AI · SaaS',
    image: ideahunt,
    live: 'https://www.ideahunt.pro/',
  },
  {
    title: 'Aegnis AI',
    tag: 'AI · Productivity',
    image: aegnis,
    live: 'https://aegnis.life',
  },
  {
    title: 'LiquidGlass',
    tag: 'React · WebGL',
    image: liquidglass,
    live: 'https://liquidglass-sigma.vercel.app/',
  },
  {
    title: 'DevSync',
    tag: 'Next.js · Collab',
    image: devsync,
    live: 'https://devsync.codes/',
  },
  {
    title: 'Couple Connect',
    tag: 'iOS · Swift',
    image: goaltracking,
    live: 'https://www.coupleconnect.love/',
  },
  {
    title: 'Shan-AI',
    tag: 'Mobile · AI',
    image: shanai,
    live: 'https://github.com/Hussain-hamim/ShanAI',
  },
];

export default function ProjectsSection() {
  return (
    <section
      id='projects'
      className='border-t border-white/10 bg-black px-6 py-24 md:px-10 lg:px-16'
    >
      <div className='mx-auto max-w-6xl'>
        <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:items-end'>
          <div>
            <p className='text-xs font-light tracking-[0.3em] text-white/50'>
              04 — SELECTED WORK
            </p>
            <h2 className='mt-4 text-4xl font-normal leading-[1.1] tracking-[-0.04em] text-white md:text-5xl lg:text-6xl'>
              Projects that
              <br />
              shipped
            </h2>
          </div>
          <a
            href='https://github.com/Hussain-hamim'
            target='_blank'
            rel='noopener noreferrer'
            className='btn-cut-border inline-flex items-center gap-2 px-5 py-2.5 text-sm text-white'
          >
            <span>All on GitHub</span>
            <ArrowRight className='relative z-[1] h-4 w-4' />
          </a>
        </div>

        <div className='mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {PROJECTS.map((p) => (
            <a
              key={p.title}
              href={p.live}
              target='_blank'
              rel='noopener noreferrer'
              className='group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/25'
            >
              <div className='aspect-[16/11] overflow-hidden'>
                <img
                  src={p.image}
                  alt={p.title}
                  loading='lazy'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <div className='flex items-center justify-between gap-3 p-5'>
                <div>
                  <p className='text-[11px] tracking-wider text-white/45'>
                    {p.tag}
                  </p>
                  <h3 className='mt-1 text-xl font-medium tracking-[-0.03em] text-white'>
                    {p.title}
                  </h3>
                </div>
                <span className='btn-cut-sm flex h-9 w-9 items-center justify-center bg-white text-black'>
                  <ArrowRight className='h-3.5 w-3.5' />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
