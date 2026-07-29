import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X } from 'lucide-react';

import ideahunt from '../../images/ideahunt2.png';
import aegnis from '../../images/aegnisai.png';
import liquidglass from '../../images/liquidglass.png';
import goaltracking from '../../images/goaltracking.png';
import shanai from '../../images/shanai2.png';
import premium from '../../images/premium-shop.png';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { src: ideahunt, rotate: -6 },
  { src: aegnis, rotate: 4 },
  { src: liquidglass, rotate: -3 },
  { src: goaltracking, rotate: 5 },
  { src: shanai, rotate: -5 },
  { src: premium, rotate: 3 },
];

export default function ExplorationsSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: content,
        pinSpacing: false,
      });

      if (col1Ref.current) {
        gsap.fromTo(
          col1Ref.current,
          { y: 80 },
          {
            y: -220,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );
      }
      if (col2Ref.current) {
        gsap.fromTo(
          col2Ref.current,
          { y: -40 },
          {
            y: 180,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const left = ITEMS.filter((_, i) => i % 2 === 0);
  const right = ITEMS.filter((_, i) => i % 2 === 1);

  return (
    <section
      ref={sectionRef}
      id='explorations'
      className='bg-studio relative min-h-[300vh]'
    >
      <div
        ref={contentRef}
        className='pointer-events-none relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center'
      >
        <div className='mb-4 flex items-center gap-3'>
          <span className='bg-studio-stroke h-px w-8' />
          <span className='text-studio-muted text-xs uppercase tracking-[0.3em]'>
            Explorations
          </span>
        </div>
        <h2 className='text-studio text-3xl font-medium tracking-tight md:text-5xl'>
          Visual <span className='font-display italic'>playground</span>
        </h2>
        <p className='text-studio-muted mt-3 max-w-sm text-sm'>
          Experiments, screenshots, and product moments from the archive.
        </p>
        <a
          href='https://github.com/Hussain-hamim'
          target='_blank'
          rel='noopener noreferrer'
          className='pointer-events-auto mt-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--studio-stroke))] px-5 py-2.5 text-sm text-studio'
        >
          See more
          <ArrowRight className='h-4 w-4' />
        </a>
      </div>

      <div className='pointer-events-none absolute inset-0 z-20'>
        <div className='mx-auto grid h-full max-w-[1400px] grid-cols-2 gap-12 px-6 md:gap-40 md:px-16'>
          <div ref={col1Ref} className='flex flex-col items-end gap-10 pt-[20vh]'>
            {left.map((item, i) => (
              <button
                key={i}
                type='button'
                onClick={() => setLightbox(item.src)}
                className='pointer-events-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-[hsl(var(--studio-stroke))] bg-[hsl(var(--studio-surface))]'
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <img
                  src={item.src}
                  alt=''
                  className='h-full w-full object-cover'
                  loading='lazy'
                />
              </button>
            ))}
          </div>
          <div ref={col2Ref} className='flex flex-col items-start gap-10 pt-[35vh]'>
            {right.map((item, i) => (
              <button
                key={i}
                type='button'
                onClick={() => setLightbox(item.src)}
                className='pointer-events-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-[hsl(var(--studio-stroke))] bg-[hsl(var(--studio-surface))]'
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <img
                  src={item.src}
                  alt=''
                  className='h-full w-full object-cover'
                  loading='lazy'
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightbox ? (
        <div
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6'
          onClick={() => setLightbox(null)}
          role='presentation'
        >
          <button
            type='button'
            className='absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white'
            onClick={() => setLightbox(null)}
            aria-label='Close'
          >
            <X className='h-5 w-5' />
          </button>
          <img
            src={lightbox}
            alt=''
            className='max-h-[80vh] max-w-full rounded-2xl object-contain'
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}
