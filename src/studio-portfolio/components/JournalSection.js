import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import photo1 from '../../images/photos-stack-1.png';
import photo2 from '../../images/photos-stack-2.png';
import photo3 from '../../images/photos-stack-3.png';
import photo4 from '../../images/photos-stack-4.png';

const ENTRIES = [
  {
    title: 'Designing AI loading states that feel instant',
    image: photo1,
    time: '4 min',
    date: 'Mar 2026',
    url: 'https://www.chamoy.ai/blog/designing-ai-loading-states',
  },
  {
    title: 'AI workflows vs AI agents',
    image: photo2,
    time: '6 min',
    date: 'Feb 2026',
    url: 'https://www.chamoy.ai/blog/ai-workflows-vs-agents',
  },
  {
    title: 'Shipping products with LLM integrations',
    image: photo3,
    time: '5 min',
    date: 'Jan 2026',
    url: 'https://github.com/Hussain-hamim',
  },
  {
    title: 'From idea validation to launch',
    image: photo4,
    time: '3 min',
    date: 'Dec 2025',
    url: 'https://www.ideahunt.pro/',
  },
];

export default function JournalSection() {
  return (
    <section id='journal' className='bg-studio py-16 md:py-24'>
      <div className='mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className='mb-10 flex items-end justify-between gap-6'
        >
          <div>
            <div className='mb-4 flex items-center gap-3'>
              <span className='bg-studio-stroke h-px w-8' />
              <span className='text-studio-muted text-xs uppercase tracking-[0.3em]'>
                Journal
              </span>
            </div>
            <h2 className='text-studio text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl'>
              Recent <span className='font-display italic'>thoughts</span>
            </h2>
            <p className='text-studio-muted mt-3 max-w-md text-sm md:text-base'>
              Notes on building products, AI systems, and shipping faster.
            </p>
          </div>
          <a
            href='https://github.com/Hussain-hamim'
            className='group relative hidden rounded-full md:inline-flex'
          >
            <span className='gradient-border-ring absolute -inset-[2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100' />
            <span className='bg-studio-surface relative inline-flex items-center gap-2 rounded-full border border-[hsl(var(--studio-stroke))] px-5 py-2.5 text-sm text-studio'>
              View all
              <ArrowRight className='h-4 w-4' />
            </span>
          </a>
        </motion.div>

        <div className='flex flex-col gap-4'>
          {ENTRIES.map((entry, i) => (
            <motion.a
              key={entry.title}
              href={entry.url}
              target='_blank'
              rel='noopener noreferrer'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className='flex flex-col items-stretch gap-4 rounded-[40px] border border-[hsl(var(--studio-stroke))] bg-[hsl(var(--studio-surface))]/30 p-4 transition-colors hover:bg-[hsl(var(--studio-surface))] sm:flex-row sm:items-center sm:gap-6 sm:rounded-full'
            >
              <img
                src={entry.image}
                alt=''
                className='h-20 w-full rounded-[28px] object-cover sm:h-16 sm:w-16 sm:rounded-full'
                loading='lazy'
              />
              <div className='min-w-0 flex-1'>
                <h3 className='text-studio text-base font-medium tracking-tight md:text-lg'>
                  {entry.title}
                </h3>
              </div>
              <div className='text-studio-muted flex shrink-0 items-center gap-4 px-2 text-xs sm:pr-4'>
                <span>{entry.time} read</span>
                <span>{entry.date}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
