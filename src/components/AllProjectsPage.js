import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import {
  projects,
  mobileProjects,
  webDescriptionsPs,
  mobileDescriptionsPs,
  ProjectCard,
  SectionHeader,
} from './ProjectsSection';

const AllProjectsPage = () => {
  // Simple locale detection — honour /ps prefix if ever deep-linked
  const isPashto =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/ps');

  const [showAllWeb, setShowAllWeb] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);

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
      className='min-h-screen bg-[#0a0a0a] text-white'
    >
      {/* Top bar with back link */}
      <div className='sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5'>
        <div className='max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between'>
          <Link
            to='/'
            className='group inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors'
          >
            <ArrowLeft className='h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5' />
            <span>{isPashto ? 'کور ته ورګرځه' : 'Back to home'}</span>
          </Link>
          <span className='text-[10px] font-mono uppercase tracking-[0.25em] text-white/40'>
            {isPashto ? 'ټولې پروژې' : 'All projects'}
          </span>
        </div>
      </div>

      {/* Page header */}
      <section className='relative overflow-hidden pt-20 pb-10'>
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
          <div className='absolute top-20 left-0 w-96 h-96 bg-[#D7FF00]/[0.07] rounded-full blur-[120px]' />
          <div className='absolute bottom-20 right-0 w-96 h-96 bg-[#D7FF00]/[0.05] rounded-full blur-[120px]' />
        </div>
        <div className='relative max-w-7xl mx-auto px-6 md:px-8 text-center'>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='text-[10px] font-mono uppercase tracking-[0.25em] text-[#D7FF00]/80 mb-3'
          >
            {isPashto ? 'ټولګه' : 'Archive'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className='text-4xl md:text-6xl font-bold font-sans1 tracking-tight text-white'
          >
            {isPashto ? 'ټولې پروژې' : 'All Projects'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='mt-4 max-w-2xl mx-auto text-white/60 text-sm md:text-base font-sans3'
          >
            {isPashto
              ? 'وېب او موبايل پروژې — بشپړ لیست په یوه ځای کې.'
              : 'Web and mobile projects — the full list in one place.'}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <div className='relative bg-[#0f0f0f] py-20 overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
          <div className='absolute top-20 left-0 w-96 h-96 bg-[#D7FF00]/[0.07] rounded-full blur-[120px]' />
          <div className='absolute bottom-20 right-0 w-96 h-96 bg-[#D7FF00]/[0.05] rounded-full blur-[120px]' />
        </div>

        <div className='max-w-7xl mx-auto px-6 md:px-8 relative z-10'>
          {/* Web Projects */}
          <div className='mb-32'>
            <SectionHeader title={isPashto ? 'وېب پروژې' : 'WEB PROJECTS'} />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {webProjectsToShow.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                  isPashto={isPashto}
                />
              ))}
            </div>
            {webProjects.length > initialCount && (
              <div className='flex justify-center mt-12'>
                <button
                  onClick={() => setShowAllWeb(!showAllWeb)}
                  className='px-8 py-3 text-sm font-bold uppercase tracking-wider text-[#D7FF00] rounded-full transition-all hover:bg-[#D7FF00]/10 hover:shadow-lg hover:shadow-[#D7FF00]/20 border-[0.5px] border-[#D7FF00]/50 hover:border-[#D7FF00]'
                >
                  {showAllWeb
                    ? isPashto
                      ? 'لږ وښيه'
                      : 'Show Less'
                    : isPashto
                    ? 'نور وښيه'
                    : 'Show More'}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Projects */}
          <div id='mobileapps-section' className='mb-32'>
            <SectionHeader title={isPashto ? 'موبايل پروګرامونه' : 'MOBILE APPS'} />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {mobileProjectsToShow.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={
                    project.title === 'Goal Tracking App'
                      ? { ...project, embedUrl: undefined }
                      : project
                  }
                  index={index}
                  isPashto={isPashto}
                />
              ))}
            </div>
            {mobileProjectsLocalized.length > initialCount && (
              <div className='flex justify-center mt-12'>
                <button
                  onClick={() => setShowAllMobile(!showAllMobile)}
                  className='px-8 py-3 text-sm font-bold uppercase tracking-wider text-[#D7FF00] rounded-full transition-all hover:bg-[#D7FF00]/10 hover:shadow-lg hover:shadow-[#D7FF00]/20 border-[0.5px] border-[#D7FF00]/50 hover:border-[#D7FF00]'
                >
                  {showAllMobile
                    ? isPashto
                      ? 'لږ وښيه'
                      : 'Show Less'
                    : isPashto
                    ? 'نور وښيه'
                    : 'Show More'}
                </button>
              </div>
            )}
          </div>

          {/* Bottom back-to-home */}
          <div className='mt-24 flex justify-center'>
            <Link
              to='/'
              className='group inline-flex items-center gap-2 rounded-full border-[0.5px] border-white/20 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:bg-white/[0.08] hover:text-white'
            >
              <ArrowLeft className='h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5' />
              <span>{isPashto ? 'کور ته ورګرځه' : 'Back to home'}</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AllProjectsPage;
