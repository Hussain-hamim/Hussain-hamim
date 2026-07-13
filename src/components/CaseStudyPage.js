import React, { useLayoutEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  MessageSquare,
  Quote,
} from 'lucide-react';
import {
  featuredProjects,
  getFeaturedBySlug,
  isPlaceholder,
} from '../data/featuredProjects';
import { projects as webProjects, mobileProjects } from './ProjectsSection';
import Button from './Button';

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

const Placeholder = ({ children, className = '' }) => (
  <span
    className={`inline-block rounded-md border-[0.5px] border-dashed border-[#D7FF00]/40 bg-[#D7FF00]/5 px-2 py-0.5 text-[#D7FF00]/80 ${className}`}
    title='Placeholder — replace with real content'
  >
    {children}
  </span>
);

const MaybePlaceholder = ({ value, className = '' }) => {
  if (!value) return null;
  if (isPlaceholder(value)) {
    return <Placeholder className={className}>{value}</Placeholder>;
  }
  return <span className={className}>{value}</span>;
};

const SectionTitle = ({ kicker, title }) => (
  <div className='mb-8'>
    {kicker && (
      <p className='text-[11px] font-mono uppercase tracking-[0.22em] text-[#D7FF00]/80'>
        {kicker}
      </p>
    )}
    <h2 className='mt-2 text-3xl md:text-4xl font-bold font-sans1 text-white tracking-tight'>
      {title}
    </h2>
  </div>
);

const STORY_GRADIENTS = {
  Problem:
    'bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.10),transparent_55%)]',
  Built:
    'bg-[radial-gradient(circle_at_top_left,rgba(215,255,0,0.10),transparent_55%)]',
  Result:
    'bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_55%)]',
};

const StoryCard = ({ label, value }) => (
  <div
    className={`relative overflow-hidden rounded-2xl border-[0.5px] border-white/10 bg-white/[0.03] p-5 ${
      STORY_GRADIENTS[label] || ''
    }`}
  >
    <p className='relative text-[11px] font-mono uppercase tracking-[0.22em] text-[#D7FF00]/80'>
      {label}
    </p>
    <p className='relative mt-3 text-[15px] leading-relaxed text-white/85'>
      <MaybePlaceholder value={value} />
    </p>
  </div>
);

const MetricTile = ({ value, label }) => {
  const missing = !value || isPlaceholder(value);
  return (
    <div className='relative overflow-hidden rounded-2xl border-[0.5px] border-white/10 bg-gradient-to-b from-[#D7FF00]/[0.07] via-white/[0.02] to-transparent p-5 text-center'>
      <p
        className={`relative font-sans1 text-3xl font-bold tracking-tight ${
          missing ? 'text-[#D7FF00]/80' : 'text-white'
        }`}
      >
        {missing ? <Placeholder>{value || '<REPLACE>'}</Placeholder> : value}
      </p>
      <p className='relative mt-2 text-xs uppercase tracking-wider text-white/55'>{label}</p>
    </div>
  );
};

const Testimonials = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className='rounded-xl border-[0.5px] border-dashed border-[#D7FF00]/30 bg-gradient-to-br from-[#D7FF00]/[0.08] via-[#D7FF00]/[0.03] to-transparent px-4 py-3'>
        <p className='text-xs text-white/70'>
          <Placeholder>
            {'<REPLACE: add 1–2 client or teammate quotes>'}
          </Placeholder>
        </p>
      </div>
    );
  }
  return (
    <div className='-mx-5 sm:-mx-8'>
      <div
        className='flex gap-3 overflow-x-auto px-5 sm:px-8 pb-2 snap-x snap-mandatory'
        style={{ scrollbarWidth: 'thin' }}
      >
        {items.map((t, i) => (
          <figure
            key={i}
            className='snap-start shrink-0 w-[280px] sm:w-[320px] relative overflow-hidden rounded-xl border-[0.5px] border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-[#D7FF00]/[0.04] px-4 py-3'
          >
            <Quote className='h-3.5 w-3.5 text-[#D7FF00]/70 mb-2' aria-hidden />
            <blockquote className='text-[13px] leading-snug text-white/85 line-clamp-4'>
              <MaybePlaceholder value={t.quote} />
            </blockquote>
            <figcaption className='mt-2 text-[11px] text-white/55'>
              <span className='font-semibold text-white/80'>
                <MaybePlaceholder value={t.author} />
              </span>
              {t.role && (
                <>
                  {' · '}
                  <MaybePlaceholder value={t.role} />
                </>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

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
  const project = getFeaturedBySlug(slug);
  const bookingUrl = (
    process.env.REACT_APP_BOOKING_URL || DEFAULT_CAL_BOOKING_URL
  ).trim();
  const liveHost = prettyHost(project?.live);
  const openLinkAs = project?.openLinkLabel?.trim() || liveHost;

  // Always open case studies from the top (SPA navigations keep prior scroll otherwise).
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Navigate to homepage and smooth-scroll to the contact section.
  // React Router doesn't auto-scroll to #hash targets, so we do it manually.
  const goToContact = (e) => {
    e.preventDefault();
    navigate('/');
    // Wait one tick for the home route to render, then scroll.
    requestAnimationFrame(() => {
      setTimeout(() => {
        const el = document.getElementById('contactme-section');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });
  };

  if (!project) {
    return (
      <main className='min-h-screen bg-[#0a0a0a] text-white'>
        <div className='mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center'>
          <h1 className='text-3xl font-bold font-sans1'>Case study not found</h1>
          <p className='mt-3 text-white/60'>
            The project you’re looking for isn’t listed as a featured case study.
          </p>
          <Button as={Link} to='/' icon={<ArrowLeft />} iconPosition='left'>
            Back to portfolio
          </Button>
          <div className='mt-10 text-xs text-white/40'>
            Available case studies:{' '}
            {featuredProjects.map((p, i) => (
              <span key={p.slug}>
                {i > 0 ? ', ' : ''}
                <Link
                  to={`/case-study/${p.slug}`}
                  className='underline decoration-[#D7FF00]/40 underline-offset-4 hover:text-white'
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

  return (
    <main className='min-h-screen bg-[#0a0a0a] text-white'>
      {/* Ambient glow */}
      <div className='pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px] overflow-hidden'>
        <div className='absolute -top-40 left-1/2 h-[520px] w-[680px] -translate-x-1/2 rounded-full bg-[#D7FF00]/[0.09] blur-[130px]' />
      </div>

      <div className='relative z-10 mx-auto max-w-5xl px-5 sm:px-8 py-10 sm:py-14'>
        {/* Top bar */}
        <div className='flex items-center justify-between'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to portfolio
          </Link>
          <span className='text-[11px] font-mono uppercase tracking-[0.22em] text-white/40'>
            Case study
          </span>
        </div>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className='mt-8'
        >
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <p className='text-[11px] font-mono uppercase tracking-[0.22em] text-[#D7FF00]/80'>
              {project.role}
            </p>
            {project.partnership?.badge?.en && (
              <span
                className='inline-flex shrink-0 items-center rounded-full border-[0.5px] border-amber-400/45 bg-amber-500/[0.12] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-100'
                title={project.partnership.hint?.en}
              >
                {project.partnership.badge.en}
              </span>
            )}
          </div>
          <h1 className='mt-3 text-4xl sm:text-5xl md:text-6xl font-bold font-sans1 tracking-tight leading-tight'>
            {project.title}
          </h1>
          <p className='mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70'>
            <MaybePlaceholder value={project.tagline} />
          </p>

          {/* Stack + primary link on same row */}
          {(project.stack?.length > 0 || project.live) && (
            <div className='mt-6 flex flex-wrap items-center gap-3'>
              {project.stack?.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className='rounded-full border-[0.5px] border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/75'
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {project.live && (
                <Button
                  href={project.live}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='sm:ml-auto'
                  icon={<ExternalLink />}
                >
                  {openLinkAs ? `Open ${openLinkAs}` : 'Open product'}
                </Button>
              )}
            </div>
          )}
        </motion.section>

        {/* Hero image */}
        {heroImage && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='mt-10 overflow-hidden rounded-3xl border-[0.5px] border-white/10 bg-white/[0.03]'
          >
            <img
              src={heroImage}
              alt={project.title}
              className='w-full object-cover'
            />
          </motion.div>
        )}

        {/* Problem / Built / Result */}
        <section className='mt-14'>
          <SectionTitle kicker='The story' title='Problem → Built → Result' />
          <div className='grid gap-4 md:grid-cols-3'>
            <StoryCard label='Problem' value={project.problem} />
            <StoryCard label='Built' value={project.built} />
            <StoryCard label='Result' value={project.result} />
          </div>
        </section>

        {/* Metrics */}
        {project.metrics?.length > 0 && (
          <section className='mt-14'>
            <SectionTitle kicker='By the numbers' title='Metrics' />
            <div className='grid gap-4 sm:grid-cols-3'>
              {project.metrics.map((m, i) => (
                <MetricTile key={i} value={m.value} label={m.label} />
              ))}
            </div>
          </section>
        )}

        {/* Testimonials */}
        {project.testimonials?.length > 0 && (
          <section className='mt-14'>
            <SectionTitle kicker='Voices' title='Testimonials' />
            <Testimonials items={project.testimonials} />
          </section>
        )}

        {/* CTA footer */}
        <section className='mt-16 rounded-3xl border-[0.5px] border-white/10 bg-gradient-to-br from-[#D7FF00]/[0.06] via-white/[0.03] to-transparent p-6 sm:p-8'>
          <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='text-[11px] font-mono uppercase tracking-[0.22em] text-[#D7FF00]/80'>
                Want something similar?
              </p>
              <h3 className='mt-2 text-2xl font-bold font-sans1 tracking-tight'>
                Let’s talk about your product.
              </h3>
            </div>
            <div className='flex flex-wrap justify-end gap-3 sm:ml-auto sm:flex-nowrap sm:shrink-0'>
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

        {/* Other case studies */}
        <section className='mt-14 mb-10'>
          <p className='text-[11px] font-mono uppercase tracking-[0.22em] text-white/50'>
            More case studies
          </p>
          <div className='mt-4 flex flex-wrap gap-3'>
            {featuredProjects
              .filter((p) => p.slug !== project.slug)
              .map((p) => (
                <Button
                  key={p.slug}
                  as={Link}
                  to={`/case-study/${p.slug}`}
                  size='sm'
                  variant='secondary'
                  icon={<ArrowLeft className='rotate-180' />}
                >
                  {p.title}
                </Button>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CaseStudyPage;
