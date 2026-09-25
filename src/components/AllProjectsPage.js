import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MessageSquare } from 'lucide-react';
import {
  projects,
  mobileProjects,
  webDescriptionsPs,
  mobileDescriptionsPs,
  ProjectCard,
  SectionHeader,
} from './ProjectsSection';
import Button from './Button';
import Header from './Header';

const DEFAULT_CAL_BOOKING_URL = 'https://cal.com/hussain-hamim-fp9qc6/30min';

const AllProjectsPage = () => {
  const navigate = useNavigate();
  const isPashto =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/ps');
  const bookingUrl = (
    process.env.REACT_APP_BOOKING_URL || DEFAULT_CAL_BOOKING_URL
  ).trim();

  const [showAllWeb, setShowAllWeb] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const goToContact = (e) => {
    e.preventDefault();
    navigate(isPashto ? '/ps' : '/');
    requestAnimationFrame(() => {
      setTimeout(() => {
        document
          .getElementById('contactme-section')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    document.documentElement.lang = isPashto ? 'ps' : 'en';
    document.documentElement.dir = isPashto ? 'rtl' : 'ltr';
  }, [isPashto]);

  const webProjects = isPashto
    ? projects.map((p) => ({
        ...p,
        description: webDescriptionsPs[p.title] || p.description,
      }))
    : projects;

  const mobileProjectsLocalized = isPashto
    ? mobileProjects.map((p) => ({
        ...p,
        description: mobileDescriptionsPs[p.title] || p.description,
      }))
    : mobileProjects;

  const initialCount = 6;
  const webProjectsToShow = showAllWeb
    ? webProjects
    : webProjects.slice(0, initialCount);
  const mobileProjectsToShow = showAllMobile
    ? mobileProjectsLocalized
    : mobileProjectsLocalized.slice(0, initialCount);

  return (
    <main
      dir={isPashto ? 'rtl' : 'ltr'}
      className='min-h-screen bg-surface-alt pt-[max(4.75rem,calc(env(safe-area-inset-top)+4.25rem))] text-ink transition-colors duration-300'
    >
      <Header locale={isPashto ? 'ps' : 'en'} />
      <div className='sticky top-[max(4.75rem,calc(env(safe-area-inset-top)+4.25rem))] z-30 border-b border-line/40 bg-surface-alt/85 backdrop-blur-md'>
        <div className='mx-auto flex max-w-4xl items-center justify-between px-4 py-4 md:px-8'>
          <Link
            to={isPashto ? '/ps' : '/'}
            className='group inline-flex items-center gap-2 text-sm text-ink/70 transition-colors hover:text-ink'
          >
            <ArrowLeft
              className={`h-4 w-4 transition-transform duration-300 ${
                isPashto
                  ? 'rotate-180 group-hover:translate-x-0.5'
                  : 'group-hover:-translate-x-0.5'
              }`}
            />
            <span>{isPashto ? 'کور ته ورګرځه' : 'Back to home'}</span>
          </Link>
          <span className='text-[10px] font-mono uppercase tracking-[0.25em] text-ink/40'>
            {isPashto ? 'ټولې پروژې' : 'All projects'}
          </span>
        </div>
      </div>

      <section className='pb-8 pt-16 md:pt-20'>
        <div className='mx-auto max-w-4xl px-4 text-center md:px-8'>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='mb-3 text-[10px] font-mono uppercase tracking-[0.25em] text-ink/50'
          >
            {isPashto ? 'ټولګه' : 'Archive'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className='font-sans1 text-2xl font-medium tracking-tight text-ink md:text-3xl'
          >
            {isPashto ? 'ټولې پروژې' : 'All Projects'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='mx-auto mt-3 max-w-xl text-[15px] font-normal leading-6 text-ink-muted'
          >
            {isPashto
              ? 'وېب او موبايل پروژې — بشپړ لیست په یوه ځای کې.'
              : 'Web and mobile projects — the full list in one place.'}
          </motion.p>
        </div>
      </section>

      <div className='mx-auto max-w-4xl px-4 pb-32 pt-6 md:px-8'>
        <div className='mb-16'>
          <SectionHeader
            title={isPashto ? 'وېب پروژې' : 'Web projects'}
            light
          />
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {webProjectsToShow.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isPashto={isPashto}
                light
              />
            ))}
          </div>
          {webProjects.length > initialCount ? (
            <div className='mt-12 flex justify-center'>
              <Button
                onClick={() => setShowAllWeb(!showAllWeb)}
                variant='primary'
                size='sm'
              >
                {showAllWeb
                  ? isPashto
                    ? 'لږ وښيه'
                    : 'Show less'
                  : isPashto
                    ? 'نور وښيه'
                    : 'Show more'}
              </Button>
            </div>
          ) : null}
        </div>

        <div id='mobileapps-section' className='mb-20'>
          <SectionHeader
            title={isPashto ? 'موبايل پروګرامونه' : 'Mobile apps'}
            light
          />
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {mobileProjectsToShow.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isPashto={isPashto}
                light
              />
            ))}
          </div>
          {mobileProjectsLocalized.length > initialCount ? (
            <div className='mt-12 flex justify-center'>
              <Button
                onClick={() => setShowAllMobile(!showAllMobile)}
                variant='primary'
                size='sm'
              >
                {showAllMobile
                  ? isPashto
                    ? 'لږ وښيه'
                    : 'Show less'
                  : isPashto
                    ? 'نور وښيه'
                    : 'Show more'}
              </Button>
            </div>
          ) : null}
        </div>

        <section className='mt-16 rounded-2xl bg-panel p-6 sm:p-8'>
          <div className='flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='text-[10px] font-mono uppercase tracking-[0.22em] text-ink/45'>
                {isPashto ? 'راتلونکی ګام' : 'Next step'}
              </p>
              <h3 className='mt-2 text-xl font-medium tracking-tight text-ink'>
                {isPashto
                  ? 'راځئ ستاسو پروژې په اړه خبرې وکړو.'
                  : 'Let’s talk about your project.'}
              </h3>
            </div>
            <div className='flex flex-wrap gap-3'>
              <Button
                href={bookingUrl}
                target='_blank'
                rel='noopener noreferrer'
                icon={<Calendar />}
              >
                {isPashto ? 'د لیدنې وخت وټاکئ' : 'Book a call'}
              </Button>
              <Button
                href={isPashto ? '/ps#contactme-section' : '/#contactme-section'}
                onClick={goToContact}
                variant='secondary'
                icon={<MessageSquare />}
              >
                {isPashto ? 'پیغام پرېږدئ' : 'Drop a message'}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AllProjectsPage;
