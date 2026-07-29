import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';
import heroPortrait from '../../asset/eren.jpg';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Price', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function HeroSection() {
  return (
    <section className='new-hero relative flex h-screen flex-col overflow-x-clip'>
      <FadeIn delay={0} y={-20} className='relative z-30'>
        <nav className='flex justify-between px-6 pt-6 md:px-10 md:pt-8'>
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className='text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]'
            >
              {item.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Portrait: outer div owns centering so FadeIn's transform can't break it */}
      <div className='pointer-events-none absolute left-1/2 top-1/2 z-10 w-[240px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[320px] sm:translate-y-0 md:w-[400px] lg:w-[480px]'>
        <FadeIn delay={0.6} y={30} className='pointer-events-auto w-full'>
          <Magnet
            padding={150}
            strength={3}
            activeTransition='transform 0.3s ease-out'
            inactiveTransition='transform 0.6s ease-in-out'
          >
            <img
              src={heroPortrait}
              alt=''
              className='aspect-square w-full rounded-full object-cover object-top'
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>

      <div className='relative z-20 mt-6 w-full overflow-hidden px-2 sm:mt-4 md:-mt-5'>
        <FadeIn
          delay={0.15}
          y={40}
          as='h1'
          className='hero-heading w-full whitespace-nowrap text-center font-black uppercase leading-none tracking-tight'
          style={{
            // "hussain" is longer than "jack" — size so the full line fits the viewport
            fontSize: 'min(12.5vw, calc((100vw - 1.5rem) / 8.4))',
          }}
        >
          Hi, i&apos;m hussain
        </FadeIn>
      </div>

      <div className='relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:px-8 sm:pb-8 md:px-10 md:pb-10'>
        <FadeIn delay={0.35} y={20}>
          <p
            className='max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]'
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            full-stack &amp; ai engineer crafting products that ship
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton href='#contact' />
        </FadeIn>
      </div>
    </section>
  );
}
