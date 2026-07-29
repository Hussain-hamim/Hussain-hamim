import { motion } from 'framer-motion';
import hsn from '../../asset/hsn3-hero.jpg';

export default function AboutSection() {
  return (
    <section id='about' className='relative bg-black px-8 py-24 md:px-16 lg:px-20'>
      <div className='mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2'>
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='liquid-glass overflow-hidden rounded-[1.25rem] p-3'
        >
          <img
            src={hsn}
            alt='Hussain Hamim'
            className='aspect-[4/5] w-full rounded-[1rem] object-cover object-top'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          <p className='font-body mb-4 text-sm text-white/80'>// About</p>
          <h2 className='font-heading text-5xl italic leading-[0.9] tracking-[-2px] text-white md:text-6xl lg:text-7xl'>
            Builder.
            <br />
            Problem solver.
          </h2>
          <p className='font-body mt-6 max-w-md text-sm font-light leading-relaxed text-white/90 md:text-base'>
            I&apos;m Hussain Hamim — a full-stack &amp; AI engineer who turns
            messy ideas into shipped products. From IdeaHunt to Aegnis to
            LiquidGlass, I care about craft, speed, and things people actually
            use.
          </p>
          <p className='font-body mt-4 max-w-md text-sm font-light leading-relaxed text-white/70 md:text-base'>
            Based remotely. Working with founders who want clarity, momentum,
            and a product that feels intentional.
          </p>
          <div className='mt-8 flex flex-wrap gap-2'>
            {['Full-Stack', 'AI Agents', 'Mobile', 'Product Design'].map(
              (tag) => (
                <span
                  key={tag}
                  className='liquid-glass font-body rounded-full px-3.5 py-1.5 text-xs text-white/90'
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
