import { ArrowRight } from 'lucide-react';
import hsn from '../../asset/hsn3-hero.jpg';

export default function AboutSection() {
  return (
    <section id='about' className='bg-black px-6 py-24 md:px-10 lg:px-16'>
      <div className='mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2'>
        <div className='overflow-hidden rounded-2xl border border-white/10'>
          <img
            src={hsn}
            alt='Hussain Hamim'
            className='aspect-[4/5] w-full object-cover object-top'
          />
        </div>
        <div>
          <p className='text-xs font-light tracking-[0.3em] text-white/50'>
            02 — ABOUT
          </p>
          <h2 className='mt-4 text-4xl font-normal leading-[1.1] tracking-[-0.04em] text-white md:text-5xl lg:text-6xl'>
            Builder of
            <br />
            digital horizons
          </h2>
          <p className='mt-6 max-w-md text-sm leading-relaxed text-white/70 md:text-base'>
            I&apos;m Hussain Hamim — full-stack &amp; AI engineer. I design,
            build, and ship products for founders who need clarity, speed, and
            craft. From IdeaHunt to Aegnis to LiquidGlass, everything is made to
            be used.
          </p>
          <div className='mt-8 flex flex-wrap gap-3'>
            {['Full-Stack', 'AI Agents', 'Mobile', 'Product'].map((tag) => (
              <span
                key={tag}
                className='btn-cut-border px-4 py-2 text-xs text-white'
              >
                <span>{tag}</span>
              </span>
            ))}
          </div>
          <a
            href='#contact'
            className='btn-cut group mt-10 inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90'
          >
            Let&apos;s talk
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </a>
        </div>
      </div>
    </section>
  );
}
