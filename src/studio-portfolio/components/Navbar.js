import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className='fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6'>
      <div
        className={`inline-flex items-center rounded-full border border-white/10 bg-studio-surface px-2 py-2 backdrop-blur-md transition-shadow ${
          scrolled ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        <a
          href='#home'
          className='group relative flex h-9 w-9 items-center justify-center'
        >
          <span className='accent-gradient absolute inset-0 rounded-full opacity-100 transition-transform group-hover:scale-110 group-hover:rotate-180' />
          <span className='bg-studio relative flex h-[30px] w-[30px] items-center justify-center rounded-full'>
            <span className='font-display text-[13px] italic text-studio'>
              HH
            </span>
          </span>
        </a>

        <span className='bg-studio-stroke mx-1 hidden h-5 w-px sm:block' />

        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setActive(link.label)}
            className={`rounded-full px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm ${
              active === link.label
                ? 'bg-studio-stroke/50 text-studio'
                : 'text-studio-muted hover:bg-studio-stroke/50 hover:text-studio'
            }`}
          >
            {link.label}
          </a>
        ))}

        <span className='bg-studio-stroke mx-1 hidden h-5 w-px sm:block' />

        <a
          href='#contact'
          className='group relative ml-1 rounded-full px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm'
        >
          <span className='gradient-border-ring absolute -inset-[2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100' />
          <span className='bg-studio-surface relative inline-flex items-center gap-1 rounded-full px-1 backdrop-blur-md'>
            <span className='text-studio'>Say hi</span>
            <span className='text-studio'>↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
