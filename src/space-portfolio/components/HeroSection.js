import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import FadingVideo from './FadingVideo';
import BlurText from './BlurText';
import Navbar from './Navbar';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4';

const STACK = ['React', 'Next.js', 'AI', 'Swift', 'Node'];

const fadeUp = {
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { ease: 'easeOut', duration: 0.7 },
};

function ClockIcon() {
  return (
    <svg
      width='28'
      height='28'
      viewBox='0 0 24 24'
      fill='none'
      stroke='white'
      strokeWidth='1.5'
      aria-hidden
    >
      <circle cx='12' cy='12' r='9' />
      <path d='M12 7v5l3 2' strokeLinecap='round' />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width='28'
      height='28'
      viewBox='0 0 24 24'
      fill='none'
      stroke='white'
      strokeWidth='1.5'
      aria-hidden
    >
      <circle cx='12' cy='12' r='9' />
      <path d='M3 12h18M12 3c2.5 2.7 3.8 5.8 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.8-3.8-9s1.3-6.3 3.8-9z' />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section
      id='home'
      className='relative flex min-h-screen flex-col overflow-hidden bg-black'
    >
      <FadingVideo
        src={HERO_VIDEO}
        className='absolute left-1/2 top-0 z-0 -translate-x-1/2 object-cover object-top'
        style={{ width: '120%', height: '120%' }}
      />

      <div className='relative z-10 flex min-h-screen flex-col'>
        <Navbar />

        <div className='flex flex-1 flex-col items-center justify-center px-4 pt-24'>
          <motion.div
            className='liquid-glass mb-6 inline-flex items-center rounded-full'
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.4 }}
          >
            <span className='rounded-full bg-white px-3 py-1 text-xs font-semibold text-black'>
              Available
            </span>
            <span className='font-body pr-3 text-sm text-white/90'>
              Open for select product &amp; AI builds
            </span>
          </motion.div>

          <BlurText
            text='Hi, I am Hussain Building Products That Ship'
            className='font-heading max-w-3xl justify-center text-5xl italic leading-[0.85] tracking-[-3px] text-white sm:text-6xl md:text-7xl lg:text-[5.2rem]'
          />

          <motion.p
            className='font-body mt-4 max-w-2xl text-center text-sm font-light leading-tight text-white md:text-base'
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.8 }}
          >
            Full-stack &amp; AI engineer. I design, build, and ship web apps,
            mobile products, and agent systems for startups that need to move
            fast — and look sharp doing it.
          </motion.p>

          <motion.div
            className='mt-6 flex flex-wrap items-center justify-center gap-6'
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 1.1 }}
          >
            <a
              href='#projects'
              className='liquid-glass-strong inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white'
            >
              View Projects
              <ArrowUpRight className='h-5 w-5' />
            </a>
            <a
              href='#work'
              className='font-body inline-flex items-center gap-2 text-sm font-medium text-white'
            >
              See What I Do
              <Play className='h-4 w-4 fill-white' />
            </a>
          </motion.div>

          <motion.div
            className='mt-8 flex flex-wrap items-stretch justify-center gap-4'
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 1.3 }}
          >
            <div className='liquid-glass flex w-[200px] flex-col justify-between rounded-[1.25rem] p-5 sm:w-[220px]'>
              <ClockIcon />
              <div>
                <p className='font-heading text-4xl italic leading-none tracking-[-1px] text-white'>
                  5+ Yrs
                </p>
                <p className='font-body mt-2 text-xs font-light text-white'>
                  Building products end-to-end
                </p>
              </div>
            </div>
            <div className='liquid-glass flex w-[200px] flex-col justify-between rounded-[1.25rem] p-5 sm:w-[220px]'>
              <GlobeIcon />
              <div>
                <p className='font-heading text-4xl italic leading-none tracking-[-1px] text-white'>
                  20+
                </p>
                <p className='font-body mt-2 text-xs font-light text-white'>
                  Shipped apps &amp; platforms
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className='flex flex-col items-center gap-4 pb-8'
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 1.4 }}
        >
          <span className='liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white'>
            Shipping with modern stacks startups actually use
          </span>
          <div className='flex flex-wrap items-center justify-center gap-10 md:gap-16'>
            {STACK.map((name) => (
              <span
                key={name}
                className='font-heading text-2xl italic tracking-tight text-white md:text-3xl'
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
