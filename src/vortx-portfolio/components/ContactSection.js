import { ArrowRight } from 'lucide-react';

const LINKS = [
  {
    label: 'Book a Call',
    href: 'https://cal.com/hussain-hamim-fp9qc6/30min',
    primary: true,
  },
  { label: 'WhatsApp', href: 'https://wa.me/93780338261' },
  { label: 'GitHub', href: 'https://github.com/Hussain-hamim' },
  { label: 'Email', href: 'mailto:mohammadhussainafghan83@gmail.com' },
];

export default function ContactSection() {
  return (
    <section
      id='contact'
      className='border-t border-white/10 bg-black px-6 py-28 md:px-10 lg:px-16'
    >
      <div className='mx-auto flex max-w-3xl flex-col items-center text-center'>
        <p className='text-xs font-light tracking-[0.3em] text-white/50'>
          05 — CONTACT
        </p>
        <h2 className='mt-4 text-4xl font-normal leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl'>
          Ready to forge
          <br />
          something next?
        </h2>
        <p className='mt-6 max-w-md text-sm leading-relaxed text-white/60 md:text-base'>
          Tell me what you&apos;re building. I&apos;ll help take it from concept
          to a product people can click, tap, and use.
        </p>

        <div className='mt-10 flex flex-wrap items-center justify-center gap-3'>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={
                link.href.startsWith('http') ? 'noopener noreferrer' : undefined
              }
              className={
                link.primary
                  ? 'btn-cut inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90'
                  : 'btn-cut-border inline-flex items-center gap-2 px-6 py-3 text-sm text-white'
              }
            >
              <span>{link.label}</span>
              <ArrowRight className='h-4 w-4' />
            </a>
          ))}
        </div>
      </div>

      <footer className='mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row'>
        <div>
          <p className='text-sm tracking-[0.35em] text-white'>H U S S A I N</p>
          <p className='mt-1 text-xs text-white/40'>Full-Stack &amp; AI Engineer</p>
        </div>
        <p className='text-xs text-white/40'>
          © {new Date().getFullYear()} — Built to ship
        </p>
      </footer>
    </section>
  );
}
