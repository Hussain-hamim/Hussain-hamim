import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';
import Header from './Header';

const AllBlogsPage = () => {
  const isPashto =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/ps');

  const posts = [...BLOG_POSTS].sort((a, b) =>
    (b.date || '').localeCompare(a.date || '')
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    document.documentElement.lang = isPashto ? 'ps' : 'en';
    document.documentElement.dir = isPashto ? 'rtl' : 'ltr';
  }, [isPashto]);

  return (
    <main
      dir={isPashto ? 'rtl' : 'ltr'}
      className='min-h-screen bg-surface-alt pt-[max(4.75rem,calc(env(safe-area-inset-top)+4.25rem))] text-ink transition-colors duration-300'
    >
      <Header locale={isPashto ? 'ps' : 'en'} />
      <div className='sticky top-[max(4.75rem,calc(env(safe-area-inset-top)+4.25rem))] z-30 border-b border-line/40 bg-surface-alt/85 backdrop-blur-md'>
        <div className='mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:px-8'>
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
            {isPashto ? 'ټول بلاګونه' : 'All blogs'}
          </span>
        </div>
      </div>

      <section className='pb-8 pt-16 md:pt-20'>
        <div className='mx-auto max-w-5xl px-6 text-center md:px-8'>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='mb-3 text-[10px] font-mono uppercase tracking-[0.25em] text-ink/50'
          >
            {isPashto ? 'لیکنې' : 'Writing'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className='font-sans1 text-4xl font-bold tracking-tight text-ink md:text-6xl'
          >
            {isPashto ? 'بلاګونه' : 'Blogs'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='mx-auto mt-4 max-w-xl font-sans3 text-sm text-ink/60 md:text-base'
          >
            {isPashto
              ? 'د AI محصولاتو، UX او جوړښت په اړه تخنيکي ليکنې.'
              : 'Technical writing on AI products, UX, and systems that ship.'}
          </motion.p>
        </div>
      </section>

      <section className='relative mx-auto max-w-5xl px-6 pb-32 md:px-8'>
        <ul className='flex flex-col gap-4'>
          {posts.map((post, index) => (
            <motion.li
              key={post.url}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
            >
              <a
                href={post.url}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex flex-col gap-4 rounded-2xl bg-panel p-5 transition-[box-shadow,background-color] duration-300 hover:bg-panel-hover hover:shadow-[0_0_0_0.5px_rgba(0,0,0,0.22)] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6'
              >
                <div className='flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-5'>
                  {post.image ? (
                    <div className='relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-media-bg sm:aspect-[4/3] sm:w-36 md:w-44'>
                      <img
                        src={post.image}
                        alt=''
                        loading='lazy'
                        className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                        style={{
                          objectPosition: post.imageObjectPosition || 'center',
                        }}
                      />
                    </div>
                  ) : null}
                  <div className='min-w-0 flex-1'>
                    <span className='mb-2 inline-block text-[10px] font-mono uppercase tracking-[0.18em] text-ink/45'>
                      {post.source}
                    </span>
                    <h2 className='font-sans3 text-lg font-semibold tracking-normal text-ink sm:text-xl'>
                      {isPashto ? post.titlePs : post.title}
                    </h2>
                    <p className='mt-2 max-w-2xl font-sans3 text-sm leading-relaxed text-ink/60'>
                      {isPashto ? post.descriptionPs : post.description}
                    </p>
                  </div>
                </div>
                <span className='inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-line bg-accent px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-black shadow-brutal-sm transition-transform duration-300 group-hover:translate-x-0.5 sm:self-center'>
                  {isPashto ? 'ولولئ' : 'Read'}
                  <ArrowUpRight className='h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45' />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default AllBlogsPage;
