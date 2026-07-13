import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa';

export default function AboutSection({ locale = 'en' }) {
  const isPashto = locale === 'ps';
  const copy = {
    headingLead: isPashto ? 'موږ' : 'Who we',
    headingAccent: isPashto ? 'څوک یو' : 'are',
    name: isPashto ? 'محمد حسین حمیم' : 'Hussain Hamim',
    role: isPashto ? 'انجينر' : 'Engineer',
    paragraph1: isPashto
      ? 'زه د AI پر بنسټ وېب او موبايل پروډکټونه جوړوم چې سټارټ اپونه له MVP څخه تر لانچ پورې یې ورسوي.'
      : 'I build AI-powered web and mobile products that help startups go from MVP to launch — full-stack, mobile, and agent systems that ship fast.',
    paragraph2: isPashto
      ? 'که تاسو د یوې محصول جوړونې لپاره یو باوري ملګری لټوئ، را سره اړیکه ونیسئ.'
      : 'If you need a builder who cares about quality and speed, reach out — I work directly with founders from idea to shipped product.',
  };

  const cardSocials = [
    {
      href: 'https://github.com/Hussain-hamim',
      icon: FaGithub,
      label: 'GitHub',
    },
    {
      href: 'https://x.com/hussainim_',
      icon: FaXTwitter,
      label: 'X',
    },
    {
      href: 'https://www.linkedin.com/in/hussain-hamim/',
      icon: FaLinkedinIn,
      label: 'LinkedIn',
    },
  ];

  return (
    <section
      id='about-section'
      className='bg-black py-20 sm:py-24 md:py-28'
    >
      <div className='mx-auto max-w-4xl px-6 text-center sm:px-8'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='font-sans1 text-[clamp(2rem,6vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-white'
        >
          {copy.headingLead}
          <br />
          <span className='text-accent'>{copy.headingAccent}</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 28, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: -6 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          viewport={{ once: true }}
          className='relative mx-auto mt-12 w-[min(100%,18rem)] sm:mt-14 sm:w-72 md:w-80'
        >
          <div className='relative overflow-hidden rounded-[1.75rem] border-4 border-white bg-black shadow-[0_24px_60px_rgba(0,0,0,0.45)]'>
            <div className='absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-accent px-2 py-1.5'>
              {cardSocials.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-transform duration-500 ease-out hover:rotate-[360deg]'
                >
                  <Icon className='h-3.5 w-3.5' />
                </a>
              ))}
            </div>

            <img
              src={require('../asset/hsn3.jpg')}
              alt='Hussain Hamim'
              className='aspect-[4/5] w-full object-cover object-top'
            />

            <div className='absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-center gap-2'>
              <span className='rounded-full border border-white/20 bg-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white sm:text-[11px]'>
                {copy.name}
              </span>
              <span className='rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-black sm:text-[11px]'>
                {copy.role}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className='mx-auto mt-12 max-w-2xl space-y-5 font-sans3 text-sm leading-relaxed text-white/85 sm:mt-14 sm:text-base'
        >
          <p>{copy.paragraph1}</p>
          <p>{copy.paragraph2}</p>
        </motion.div>
      </div>
    </section>
  );
}
