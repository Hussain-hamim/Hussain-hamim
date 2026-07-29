import { motion } from 'framer-motion';
import FadingVideo from './FadingVideo';

const CAP_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4';

const CARDS = [
  {
    title: 'Full-Stack Product',
    body: 'End-to-end web apps from idea to production — React, Next.js, APIs, auth, and payments — built to ship and scale with startups.',
    tags: ['React', 'Next.js', 'APIs', 'Payments'],
    iconPath:
      'M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z',
  },
  {
    title: 'AI Agents & Systems',
    body: 'Agent workflows, LLM integrations, and automation that turn real demand into tools people actually use — not demos that die.',
    tags: ['Agents', 'LLMs', 'Automation', 'SaaS'],
    iconPath:
      'M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z',
  },
  {
    title: 'Mobile Experiences',
    body: 'Cross-platform and native-feeling mobile apps with clean UX, solid backends, and release-ready polish for iOS and Android.',
    tags: ['Swift', 'React Native', 'Expo', 'Supabase'],
    iconPath:
      'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z',
  },
];

function MaterialIcon({ path }) {
  return (
    <svg
      viewBox='0 0 24 24'
      className='h-6 w-6 text-white'
      fill='currentColor'
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}

export default function CapabilitiesSection() {
  return (
    <section
      id='work'
      className='relative flex min-h-screen flex-col overflow-hidden bg-black'
    >
      <FadingVideo
        src={CAP_VIDEO}
        className='absolute inset-0 z-0 h-full w-full object-cover'
      />

      <div className='relative z-10 flex min-h-screen flex-col px-8 pb-10 pt-24 md:px-16 lg:px-20'>
        <header className='mb-auto'>
          <p className='font-body mb-6 text-sm text-white/80'>// What I do</p>
          <h2 className='font-heading text-6xl italic leading-[0.9] tracking-[-3px] text-white md:text-7xl lg:text-[6rem]'>
            Product
            <br />
            engineered
          </h2>
        </header>

        <div className='mt-16 grid grid-cols-1 gap-6 md:grid-cols-3'>
          {CARDS.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className='liquid-glass flex min-h-[360px] flex-col rounded-[1.25rem] p-6'
            >
              <div className='flex items-start justify-between gap-4'>
                <div className='liquid-glass flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.75rem]'>
                  <MaterialIcon path={card.iconPath} />
                </div>
                <div className='flex max-w-[70%] flex-wrap justify-end gap-1.5'>
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className='liquid-glass font-body whitespace-nowrap rounded-full px-3 py-1 text-[11px] text-white/90'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className='flex-1' />

              <div className='mt-6'>
                <h3 className='font-heading text-3xl italic leading-none tracking-[-1px] text-white md:text-4xl'>
                  {card.title}
                </h3>
                <p className='font-body mt-3 max-w-[32ch] text-sm font-light leading-snug text-white/90'>
                  {card.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
