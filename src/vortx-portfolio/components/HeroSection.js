import { ArrowRight } from 'lucide-react';
import VortxLogo from './VortxLogo';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260717_120352_eb988725-1351-43b3-8095-16e4a1005e3d.mp4';

function XIcon() {
  return (
    <svg viewBox='0 0 24 24' className='h-4 w-4 fill-current' aria-hidden>
      <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox='0 0 24 24' className='h-4 w-4 fill-current' aria-hidden>
      <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox='0 0 24 24' className='h-4 w-4 fill-current' aria-hidden>
      <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <div className='font-inter h-screen w-full bg-black p-3 md:p-4'>
      <div className='relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-black'>
        <video
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className='anim-fade absolute inset-0 h-full w-full object-cover'
          style={{ animationDelay: '0.2s' }}
        />

        <nav className='relative z-10 flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8'>
          <div className='anim-stagger' style={{ animationDelay: '0.1s' }}>
            <VortxLogo className='h-14 w-14 md:h-16 md:w-16' />
            <span className='mt-1 block text-[10px] font-light tracking-[0.4em] text-white md:text-xs'>
              H U S S A I N
            </span>
          </div>

          <div
            className='anim-stagger flex items-center gap-3'
            style={{ animationDelay: '0.2s' }}
          >
            <a
              href='#about'
              className='btn-cut-border hidden px-5 py-2.5 text-sm text-white hover:bg-white/10 md:block'
            >
              <span>About Me</span>
            </a>
            <a
              href='#projects'
              className='btn-cut hidden bg-white px-5 py-2.5 text-sm text-black hover:bg-white/90 md:block'
            >
              View Work
            </a>
          </div>
        </nav>

        <div className='relative z-10 flex flex-1 flex-col justify-between px-6 pb-8 md:px-10 md:pb-10'>
          <div className='relative flex flex-1 items-center'>
            <div
              className='anim-stagger absolute left-0 top-[18%] hidden flex-col gap-6 lg:flex'
              style={{ animationDelay: '0.4s' }}
            >
              <p className='max-w-[220px] text-base leading-relaxed text-white/80'>
                Come with me
                <br />
                building products
                <br />
                that ship
              </p>
              <div className='mt-4 flex flex-col gap-2'>
                <div className='flex items-center gap-1'>
                  <span className='h-4 w-4 rounded-full border border-white/40' />
                  <span className='h-4 w-4 rounded-full border border-white/40' />
                </div>
                <div className='mt-2 flex items-center gap-2'>
                  <span className='text-xs text-white/70'>
                    Full-Stack
                    <br />
                    &amp; AI
                  </span>
                  <span className='text-xs text-white/50'>01</span>
                </div>
              </div>
            </div>

            <div
              className='anim-stagger w-full text-center'
              style={{ animationDelay: '0.5s' }}
            >
              <h1
                className='text-3xl font-normal leading-[1.1] tracking-[-0.04em] text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.25)' }}
              >
                Forging Tomorrow
                <br />
                Digital Products
                <br />
                Hussain Hamim
              </h1>
            </div>
          </div>

          <div className='mt-8 grid grid-cols-1 items-center gap-6 md:grid-cols-3'>
            <div
              className='anim-stagger flex items-center justify-center md:justify-end'
              style={{ animationDelay: '0.7s' }}
            >
              <p className='max-w-[260px] text-center text-sm leading-relaxed text-white md:ml-auto md:text-left'>
                I push past conventions — shipping web, mobile, and AI systems
                that feel intentional and move fast.
              </p>
            </div>

            <div
              className='anim-stagger flex flex-col items-center gap-8 md:gap-24'
              style={{ animationDelay: '0.85s' }}
            >
              <span className='text-2xl font-medium text-white md:text-3xl'>
                Product Engineer
              </span>
              <a
                href='#projects'
                className='btn-cut group flex w-full max-w-[280px] items-center justify-center gap-2 bg-white py-3.5 text-black transition-colors hover:bg-white/90'
              >
                <span className='text-sm font-medium'>Discover Now</span>
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              </a>
            </div>

            <div
              className='anim-stagger flex items-center justify-center gap-3 md:justify-end'
              style={{ animationDelay: '1s' }}
            >
              <a
                href='https://x.com/hussainim_'
                target='_blank'
                rel='noopener noreferrer'
                className='btn-cut-sm flex h-10 w-10 items-center justify-center bg-white text-black transition-colors hover:bg-white/90'
                aria-label='X'
              >
                <XIcon />
              </a>
              <a
                href='https://www.linkedin.com/in/hussain-hamim/'
                target='_blank'
                rel='noopener noreferrer'
                className='btn-cut-sm flex h-10 w-10 items-center justify-center bg-white text-black transition-colors hover:bg-white/90'
                aria-label='LinkedIn'
              >
                <LinkedInIcon />
              </a>
              <a
                href='https://github.com/Hussain-hamim'
                target='_blank'
                rel='noopener noreferrer'
                className='btn-cut-sm flex h-10 w-10 items-center justify-center bg-white text-black transition-colors hover:bg-white/90'
                aria-label='GitHub'
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
