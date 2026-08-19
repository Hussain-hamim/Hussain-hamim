import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import BlobReveal from './BlobReveal';
import aboutPortrait from '../asset/hsn3-hero.jpg';

const WHATSAPP_URL = 'https://wa.me/93780338261';

export default function AboutSection({ locale = 'en', embedded = false }) {
  const isPashto = locale === 'ps';
  const copy = {
    headingLead: isPashto ? 'موږ' : 'Who we',
    headingAccent: isPashto ? 'څوک یو' : 'are',
    paragraph1: isPashto
      ? 'زه د AI پر بنسټ وېب او موبايل پروډکټونه جوړوم چې سټارټ اپونه له MVP څخه تر لانچ پورې یې ورسوي.'
      : 'I build AI-powered web and mobile products that help startups go from MVP to launch: full-stack, mobile, and agent systems that ship fast.',
  };

  const cardSocials = [
    {
      href: 'https://x.com/erencode',
      icon: FaXTwitter,
      label: 'X',
    },
    {
      href: 'https://www.linkedin.com/in/hussain-hamim/',
      icon: FaLinkedinIn,
      label: 'LinkedIn',
    },
    {
      href: WHATSAPP_URL,
      icon: FaWhatsapp,
      label: 'WhatsApp',
    },
  ];

  const portrait = (
    <motion.div
      initial={{ opacity: 0, y: 28, rotate: -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: embedded ? -4 : -6 }}
      transition={{ duration: 0.65, delay: 0.1 }}
      viewport={{ once: true }}
      className={`relative ${
        embedded
          ? 'w-[7.5rem] shrink-0 sm:w-36 md:w-40'
          : 'mx-auto mt-12 w-[min(100%,18rem)] sm:mt-14 sm:w-72 md:w-80'
      }`}
    >
      <div className='relative overflow-hidden rounded-[1.75rem] border-4 border-white bg-black shadow-[0_24px_60px_rgba(0,0,0,0.45)]'>
        <div
          className={`absolute z-10 flex items-center rounded-full bg-accent ${
            embedded
              ? 'right-1.5 top-1.5 gap-0.5 px-1 py-0.5'
              : 'right-3 top-3 gap-1.5 px-2 py-1.5 sm:right-4 sm:top-4'
          }`}
        >
          {cardSocials.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={label}
              className={`flex items-center justify-center rounded-full bg-black text-white transition-transform duration-500 ease-out hover:rotate-[360deg] ${
                embedded ? 'h-4 w-4' : 'h-7 w-7'
              }`}
            >
              <Icon className={embedded ? 'h-2 w-2' : 'h-3.5 w-3.5'} />
            </a>
          ))}
        </div>

        <div
          className={`aspect-[5/5] w-full ${
            embedded ? '' : 'max-h-[20rem] sm:max-h-[22rem]'
          }`}
        >
          <BlobReveal
            image={aboutPortrait}
            fit='cover'
            blobCount={18}
            startAlign='center'
            replay={false}
            alt='Hussain Hamim'
            transition={{ duration: 2.1, ease: 'easeOut' }}
            className='h-full w-full'
          />
        </div>

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center gap-1.5 ${
            embedded ? 'bottom-1.5 px-1' : 'bottom-3 gap-2 px-3 sm:bottom-4'
          }`}
        >
          <span
            className={`rounded-full border border-white/80 bg-black font-sans3 font-medium uppercase tracking-wide text-white ${
              embedded
                ? 'px-1.5 py-0.5 text-[7px] sm:text-[8px]'
                : 'px-3 py-1 text-[10px] sm:px-3.5 sm:text-xs'
            }`}
          >
            Hussain
          </span>
          <span
            className={`rounded-full border border-white/80 bg-black font-sans3 font-medium uppercase tracking-wide text-white ${
              embedded
                ? 'px-1.5 py-0.5 text-[7px] sm:text-[8px]'
                : 'px-3 py-1 text-[10px] sm:px-3.5 sm:text-xs'
            }`}
          >
            {isPashto ? 'انجينر' : 'Engineer'}
          </span>
        </div>
      </div>
    </motion.div>
  );

  const paragraph = (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className={`font-sans3 leading-relaxed text-white/85 ${
        embedded
          ? 'min-w-0 flex-1 text-left text-sm sm:text-[15px]'
          : 'mx-auto mt-12 max-w-2xl text-center text-sm sm:mt-14 sm:text-base'
      }`}
    >
      {copy.paragraph1}
    </motion.p>
  );

  if (embedded) {
    return (
      <section
        id='about-section'
        className='flex h-full flex-col justify-center rounded-2xl bg-[#161615] px-5 py-8 sm:px-6 sm:py-9'
      >
        <div className='mx-auto w-full max-w-lg'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='mb-6 whitespace-nowrap text-center font-sans1 text-[clamp(1.5rem,3.6vw,2.25rem)] font-bold uppercase leading-[1.05] tracking-tight text-white'
          >
            {copy.headingLead}{' '}
            <span className='text-accent'>{copy.headingAccent}</span>
          </motion.h2>

          <div className='flex items-center gap-4 sm:gap-5'>
            {portrait}
            {paragraph}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id='about-section'
      className='section-sep-dark bg-black py-20 sm:py-24 md:py-28'
    >
      <div className='mx-auto max-w-4xl px-6 text-center sm:px-8'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='font-sans1 text-[clamp(2rem,6vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-white'
        >
          {copy.headingLead}{' '}
          <span className='text-accent'>{copy.headingAccent}</span>
        </motion.h2>

        {portrait}
        {paragraph}
      </div>
    </section>
  );
}
