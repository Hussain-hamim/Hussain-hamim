import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HlsVideo from './HlsVideo';

const SOCIALS = [
  { label: 'Twitter', href: 'https://x.com/hussainim_' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hussain-hamim/' },
  { label: 'GitHub', href: 'https://github.com/Hussain-hamim' },
];

export default function ContactSection() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const tween = gsap.to(el, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });
    return () => tween.kill();
  }, []);

  const marqueeText = Array(10).fill('BUILDING THE FUTURE • ').join('');

  return (
    <section
      id='contact'
      className='bg-studio relative overflow-hidden pt-16 md:pt-20 pb-8 md:pb-12'
    >
      <div className='absolute inset-0'>
        <HlsVideo
          flipped
          className='absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover'
        />
        <div className='absolute inset-0 bg-black/60' />
      </div>

      <div className='relative z-10'>
        <div className='overflow-hidden py-10'>
          <div
            ref={marqueeRef}
            className='font-display text-studio flex whitespace-nowrap text-4xl italic md:text-6xl lg:text-7xl'
          >
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>

        <div className='mx-auto flex max-w-[1200px] flex-col items-center px-6 text-center md:px-10'>
          <a
            href='mailto:mohammadhussainafghan83@gmail.com'
            className='group relative mt-4 inline-flex rounded-full'
          >
            <span className='gradient-border-ring absolute -inset-[2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100' />
            <span className='bg-studio-surface relative rounded-full border border-[hsl(var(--studio-stroke))] px-8 py-4 text-sm text-studio md:text-base'>
              mohammadhussainafghan83@gmail.com
            </span>
          </a>

          <div className='mt-16 flex w-full flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row'>
            <div className='flex flex-wrap items-center justify-center gap-5'>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-studio-muted hover:text-studio text-sm transition-colors'
                >
                  {s.label}
                </a>
              ))}
            </div>
            <div className='flex items-center gap-2 text-sm text-studio'>
              <span className='relative flex h-2.5 w-2.5'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60' />
                <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400' />
              </span>
              Available for projects
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
