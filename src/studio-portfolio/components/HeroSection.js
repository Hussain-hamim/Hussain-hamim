import { useEffect, useState } from 'react';
import gsap from 'gsap';
import HlsVideo from './HlsVideo';
import Navbar from './Navbar';

const ROLES = ['Creative', 'Fullstack', 'AI Engineer', 'Builder'];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1,
          stagger: 0.1,
          delay: 0.05,
        },
        '-=0.6'
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id='home'
      className='bg-studio relative flex min-h-screen items-center justify-center overflow-hidden'
    >
      <div className='absolute inset-0 overflow-hidden'>
        <HlsVideo className='absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover' />
        <div className='absolute inset-0 bg-black/20' />
        <div className='absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[hsl(0,0%,4%)] to-transparent' />
      </div>

      <Navbar />

      <div className='relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-32 text-center'>
        <p className='blur-in text-studio-muted mb-8 text-xs uppercase tracking-[0.3em]'>
          COLLECTION &apos;26
        </p>

        <h1 className='name-reveal font-display text-studio mb-6 text-6xl italic leading-[0.9] tracking-tight md:text-8xl lg:text-9xl'>
          Hussain Hamim
        </h1>

        <p className='blur-in text-studio-muted mb-4 text-base md:text-lg'>
          A{' '}
          <span
            key={roleIndex}
            className='animate-role-fade-in font-display text-studio inline-block italic'
          >
            {ROLES[roleIndex]}
          </span>{' '}
          shipping products remotely.
        </p>

        <p className='blur-in text-studio-muted mb-12 max-w-md text-sm md:text-base'>
          Designing seamless digital products — full-stack apps, AI agents, and
          mobile experiences that feel intentional and move fast.
        </p>

        <div className='blur-in inline-flex flex-wrap items-center justify-center gap-4'>
          <a
            href='#work'
            className='group relative inline-flex rounded-full transition-transform hover:scale-105'
          >
            <span className='gradient-border-ring absolute -inset-[2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100' />
            <span className='relative rounded-full bg-white px-7 py-3.5 text-sm text-black group-hover:bg-black group-hover:text-white'>
              See Works
            </span>
          </a>
          <a
            href='#contact'
            className='group relative inline-flex rounded-full transition-transform hover:scale-105'
          >
            <span className='gradient-border-ring absolute -inset-[2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100' />
            <span className='relative rounded-full border-2 border-[hsl(var(--studio-stroke))] bg-[hsl(var(--studio-bg))] px-7 py-3.5 text-sm text-white group-hover:border-transparent'>
              Reach out...
            </span>
          </a>
        </div>
      </div>

      <div className='absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2'>
        <span className='text-studio-muted text-xs uppercase tracking-[0.2em]'>
          SCROLL
        </span>
        <div className='bg-studio-stroke relative h-10 w-px overflow-hidden'>
          <span className='animate-scroll-down accent-gradient absolute left-0 top-0 h-4 w-full' />
        </div>
      </div>
    </section>
  );
}
