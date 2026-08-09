import React, { useLayoutEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  MessageSquare,
  Moon,
  Sun,
} from 'lucide-react';
import {
  featuredProjects,
  getFeaturedBySlug,
  isPlaceholder,
} from '../data/featuredProjects';
import { projects as webProjects, mobileProjects } from './ProjectsSection';
import Button from './Button';
import { useTheme } from '../context/themeContext';

const DEFAULT_CAL_BOOKING_URL = 'https://cal.com/hussain-hamim-fp9qc6/30min';

const findHeroImage = (title) => {
  const all = [...webProjects, ...mobileProjects];
  const match = all.find((p) => p.title === title);
  if (match && typeof match.getImageSrc === 'function') {
    try {
      return match.getImageSrc();
    } catch {
      return null;
    }
  }
  return null;
};

const Placeholder = ({ children }) => (
  <span
    className='inline-block rounded-md border border-dashed border-accent/40 bg-accent/10 px-2 py-0.5 text-ink/70'
    title='Placeholder — replace with real content'
  >
    {children}
  </span>
);

const MaybeText = ({ value }) => {
  if (!value) return null;
  if (isPlaceholder(value)) return <Placeholder>{value}</Placeholder>;
  return value;
};

const StoryCard = ({ label, value }) => (
  <div className='rounded-2xl bg-panel p-5 transition-[box-shadow,background-color] duration-300 hover:bg-panel-hover hover:shadow-[0_0_0_0.5px_rgba(0,0,0,0.22)] sm:p-6'>
    <p className='text-[10px] font-mono uppercase tracking-[0.2em] text-ink/45'>
      {label}
    </p>
    <p className='mt-3 font-sans3 text-sm leading-relaxed text-ink/80 sm:text-[15px]'>
      <MaybeText value={value} />
    </p>
  </div>
);

const prettyHost = (url) => {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

const CaseStudyPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDark, toggleTheme, isThemeAnimating } = useTheme();
  const project = getFeaturedBySlug(slug);
  const bookingUrl = (
    process.env.REACT_APP_BOOKING_URL || DEFAULT_CAL_BOOKING_URL
  ).trim();
  const liveHost = prettyHost(project?.live);
  const openLinkAs = project?.openLinkLabel?.trim() || liveHost;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const goToContact = (e) => {
    e.preventDefault();
    navigate('/');
    requestAnimationFrame(() => {
      setTimeout(() => {
        document
          .getElementById('contactme-section')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });
  };

  if (!project) {
    return (
      <main className='min-h-screen bg-surface-alt text-ink transition-colors duration-300'>
        <div className='mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center'>
          <h1 className='font-sans1 text-3xl font-bold'>Case study not found</h1>
          <p className='mt-3 text-ink/60'>
            The project you’re looking for isn’t listed as a featured case study.
          </p>
          <Button
            as={Link}
            to='/'
            className='mt-6'
            icon={<ArrowLeft />}
            iconPosition='left'
          >
            Back to portfolio
          </Button>
          <div className='mt-10 text-xs text-ink/40'>
            Available:{' '}
            {featuredProjects.map((p, i) => (
              <span key={p.slug}>
                {i > 0 ? ', ' : ''}
                <Link
                  to={`/case-study/${p.slug}`}
                  className='underline decoration-accent/40 underline-offset-4 hover:text-ink'
                >
                  {p.title}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const heroImage = findHeroImage(project.title);
  const metrics = (project.metrics || []).filter(
    (m) => m?.value && !isPlaceholder(m.value)
  );
  const testimonials = (project.testimonials || []).filter(
    (t) => t?.quote && !isPlaceholder(t.quote)
  );
  const otherStudies = featuredProjects.filter((p) => p.slug !== project.slug);

  return (
    <main className='min-h-screen bg-surface-alt text-ink transition-colors duration-300'>
      <div className='sticky top-0 z-30 border-b border-line/40 bg-surface-alt/85 backdrop-blur-md'>
        <div className='mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8'>
          <Link
            to='/'
            className='group inline-flex items-center gap-2 text-sm text-ink/70 transition-colors hover:text-ink'
          >
            <ArrowLeft className='h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5' />
            <span>Back to portfolio</span>
          </Link>
          <div className='flex items-center gap-3'>
            <span className='hidden text-[10px] font-mono uppercase tracking-[0.25em] text-ink/40 sm:inline'>
              Case study
            </span>
            <button
              type='button'
              data-theme-toggle
              onClick={toggleTheme}
              disabled={isThemeAnimating}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-panel disabled:cursor-wait'
            >
              {isDark ? (
                <Sun className='h-4 w-4' />
              ) : (
                <Moon className='h-4 w-4' />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14'>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {project.role ? (
            <p className='text-[10px] font-mono uppercase tracking-[0.22em] text-ink/45'>
              {project.role}
            </p>
          ) : null}
          <h1 className='mt-3 font-sans1 text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl'>
            {project.title}
          </h1>
          <p className='mt-4 max-w-2xl font-sans3 text-base leading-relaxed text-ink/65 sm:text-lg'>
            <MaybeText value={project.tagline} />
          </p>

          <div className='mt-6 flex flex-wrap items-center gap-3'>
            {project.stack?.length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className='rounded-full border border-line/60 bg-panel px-3 py-1 text-xs font-semibold text-ink/75'
                  >
                    {s}
                  </span>
                ))}
              </div>
            ) : null}
            {project.live ? (
              <Button
                href={project.live}
                target='_blank'
                rel='noopener noreferrer'
                className='sm:ml-auto'
                icon={<ExternalLink />}
              >
                {openLinkAs ? `Open ${openLinkAs}` : 'Open product'}
              </Button>
            ) : null}
          </div>
        </motion.section>

        {heroImage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className='mt-10 overflow-hidden rounded-2xl border border-line/40 bg-panel sm:rounded-3xl'
          >
            <img
              src={heroImage}
              alt={project.title}
              className='w-full object-cover'
            />
          </motion.div>
        ) : null}

        <section className='mt-14'>
          <p className='text-[10px] font-mono uppercase tracking-[0.22em] text-ink/45'>
            The story
          </p>
          <h2 className='mt-2 font-sans1 text-2xl font-bold tracking-tight text-ink sm:text-3xl'>
            Problem → Built → Result
          </h2>
          <div className='mt-6 grid gap-4 md:grid-cols-3'>
            <StoryCard label='Problem' value={project.problem} />
            <StoryCard label='Built' value={project.built} />
            <StoryCard label='Result' value={project.result} />
          </div>
        </section>

        {metrics.length > 0 ? (
          <section className='mt-14'>
            <p className='text-[10px] font-mono uppercase tracking-[0.22em] text-ink/45'>
              By the numbers
            </p>
            <h2 className='mt-2 font-sans1 text-2xl font-bold tracking-tight text-ink sm:text-3xl'>
              Metrics
            </h2>
            <div className='mt-6 grid gap-4 sm:grid-cols-3'>
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className='rounded-2xl bg-panel px-5 py-6 text-center transition-[box-shadow,background-color] duration-300 hover:bg-panel-hover hover:shadow-[0_0_0_0.5px_rgba(0,0,0,0.22)]'
                >
                  <p className='font-sans1 text-3xl font-bold tracking-tight text-ink'>
                    {m.value}
                  </p>
                  <p className='mt-2 text-xs uppercase tracking-wider text-ink/50'>
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {testimonials.length > 0 ? (
          <section className='mt-14'>
            <p className='text-[10px] font-mono uppercase tracking-[0.22em] text-ink/45'>
              Voices
            </p>
            <h2 className='mt-2 font-sans1 text-2xl font-bold tracking-tight text-ink sm:text-3xl'>
              Testimonials
            </h2>
            <div className='mt-6 grid gap-4 md:grid-cols-2'>
              {testimonials.map((t, i) => (
                <figure
                  key={i}
                  className='rounded-2xl bg-panel p-5 sm:p-6'
                >
                  <blockquote className='font-sans3 text-sm leading-relaxed text-ink/80'>
                    “<MaybeText value={t.quote} />”
                  </blockquote>
                  <figcaption className='mt-4 text-xs text-ink/50'>
                    <span className='font-semibold text-ink/75'>
                      <MaybeText value={t.author} />
                    </span>
                    {t.role ? (
                      <>
                        {' · '}
                        <MaybeText value={t.role} />
                      </>
                    ) : null}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <section className='mt-16 rounded-2xl bg-panel p-6 sm:p-8'>
          <div className='flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='text-[10px] font-mono uppercase tracking-[0.22em] text-ink/45'>
                Next step
              </p>
              <h3 className='mt-2 font-sans1 text-2xl font-bold tracking-tight text-ink'>
                Let’s talk about your product.
              </h3>
            </div>
            <div className='flex flex-wrap gap-3'>
              <Button
                href={bookingUrl}
                target='_blank'
                rel='noopener noreferrer'
                icon={<Calendar />}
              >
                Book a call
              </Button>
              <Button
                href='/#contactme-section'
                onClick={goToContact}
                variant='secondary'
                icon={<MessageSquare />}
              >
                Drop a message
              </Button>
            </div>
          </div>
        </section>

        {otherStudies.length > 0 ? (
          <section className='mb-6 mt-14'>
            <p className='text-[10px] font-mono uppercase tracking-[0.22em] text-ink/45'>
              More case studies
            </p>
            <div className='mt-4 flex flex-wrap gap-2'>
              {otherStudies.map((p) => (
                <Link
                  key={p.slug}
                  to={`/case-study/${p.slug}`}
                  className='rounded-full border border-line/60 bg-panel px-3.5 py-1.5 text-xs font-semibold text-ink/75 transition-colors hover:border-ink/30 hover:text-ink'
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
};

export default CaseStudyPage;
