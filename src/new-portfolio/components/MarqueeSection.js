import { useEffect, useRef } from 'react';

import ideahunt from '../../images/ideahunt2.png';
import aegnis from '../../images/aegnisai.png';
import liquidglass from '../../images/liquidglass.png';
import devsync from '../../images/devsync.png';
import premiumShop from '../../images/premium-shop.png';
import oceanOfGames from '../../images/oceanofgames.png';
import bookOcean from '../../images/bookocean.png';
import natureQuest from '../../images/naturequest.png';
import issueTracker from '../../images/issuetracker.png';
import tasklist from '../../images/tasklist.png';
import hamimfy from '../../images/hamimfy.png';
import goaltracking from '../../images/goaltracking.png';
import shanai from '../../images/shanai2.png';
import easeshop from '../../images/easeshop.png';
import threads from '../../images/threads2.png';
import himalBeauty from '../../images/himal-beauty.png';
import blitz from '../../images/blitz.png';
import airbnb from '../../images/airbnb-clone .jpg';
import snapdish from '../../images/snapdish2.png';
import doneWithIt from '../../images/donewithit2.png';
import coursia from '../../images/coursia2.png';

const MARQUEE_IMAGES = [
  ideahunt,
  aegnis,
  liquidglass,
  devsync,
  premiumShop,
  oceanOfGames,
  bookOcean,
  natureQuest,
  issueTracker,
  tasklist,
  hamimfy,
  goaltracking,
  shanai,
  easeshop,
  threads,
  himalBeauty,
  blitz,
  airbnb,
  snapdish,
  doneWithIt,
  coursia,
];

const ROW1 = MARQUEE_IMAGES.slice(0, 11);
const ROW2 = MARQUEE_IMAGES.slice(11);

function triple(arr) {
  return [...arr, ...arr, ...arr];
}

function MarqueeRow({ images, rowRef }) {
  return (
    <div className='overflow-hidden'>
      <div
        ref={rowRef}
        className='flex gap-3'
        style={{ willChange: 'transform' }}
      >
        {images.map((src, i) => (
          <img
            key={`${i}-${typeof src === 'string' ? src : src}`}
            src={src}
            alt=''
            loading='lazy'
            className='h-[270px] w-[420px] shrink-0 rounded-2xl bg-[#1a1a1a] object-cover'
          />
        ))}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const update = () => {
      rafRef.current = 0;
      const el = sectionRef.current;
      const r1 = row1Ref.current;
      const r2 = row2Ref.current;
      if (!el || !r1 || !r2) return;

      const top = el.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - top + window.innerHeight) * 0.3;

      r1.style.transform = `translateX(${offset - 200}px)`;
      r2.style.transform = `translateX(${-(offset - 200)}px)`;
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-marquee-section
      className='overflow-x-clip bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40'
    >
      <div className='flex flex-col gap-3'>
        <MarqueeRow images={triple(ROW1)} rowRef={row1Ref} />
        <MarqueeRow images={triple(ROW2)} rowRef={row2Ref} />
      </div>
    </section>
  );
}
