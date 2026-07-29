import { ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <nav className='fixed top-4 z-50 flex w-full items-center justify-between px-8 lg:px-16'>
      <a
        href='#home'
        className='liquid-glass flex h-12 w-12 items-center justify-center rounded-full'
      >
        <span className='font-heading text-xl italic lowercase text-white'>
          h
        </span>
      </a>

      <div className='liquid-glass hidden items-center rounded-full px-1.5 py-1.5 md:flex'>
        {NAV_LINKS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className='font-body rounded-full px-3 py-2 text-sm font-medium text-white/90 transition-opacity hover:opacity-70'
          >
            {item.label}
          </a>
        ))}
        <a
          href='https://cal.com/hussain-hamim-fp9qc6/30min'
          target='_blank'
          rel='noopener noreferrer'
          className='ml-1 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white px-3 py-2 text-sm font-medium text-black'
        >
          Book a Call
          <ArrowUpRight className='h-4 w-4' />
        </a>
      </div>

      <div className='h-12 w-12' aria-hidden />
    </nav>
  );
}
