import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const LINKS = [
  {
    label: 'Book a call',
    href: 'https://cal.com/hussain-hamim-fp9qc6/30min',
    primary: true,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/93780338261',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Hussain-hamim',
  },
  {
    label: 'Email',
    href: 'mailto:mohammadhussainafghan83@gmail.com',
  },
];

export default function ContactSection() {
  return (
    <section
      id='contact'
      className='relative overflow-hidden bg-black px-8 py-28 md:px-16 lg:px-20'
    >
      <div className='mx-auto flex max-w-4xl flex-col items-center text-center'>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='font-body mb-6 text-sm text-white/80'
        >
          {"// Let's build"}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='font-heading text-5xl italic leading-[0.9] tracking-[-3px] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]'
        >
          Have an idea?
          <br />
          Let&apos;s ship it.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className='font-body mt-6 max-w-lg text-sm font-light text-white/80 md:text-base'
        >
          Tell me what you&apos;re building. I&apos;ll help you go from concept
          to a product people can click, tap, and use.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className='mt-10 flex flex-wrap items-center justify-center gap-3'
        >
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
                  ? 'liquid-glass-strong inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white'
                  : 'liquid-glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white'
              }
            >
              {link.label}
              <ArrowUpRight className='h-4 w-4' />
            </a>
          ))}
        </motion.div>
      </div>

      <footer className='mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row'>
        <p className='font-heading text-xl italic text-white/80'>
          Hussain Hamim
        </p>
        <p className='font-body text-xs text-white/50'>
          © {new Date().getFullYear()} — Built to ship
        </p>
      </footer>
    </section>
  );
}
