import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaBook,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import GitHubContributions from './GitHubContributions';
import ExperienceSection from './ExperienceSection';
import InfiniteGallery from './InfiniteGallery';
import Globe from './Globe';
import { featuredProjects, isPlaceholder } from '../data/featuredProjects';
import Button from './Button';
import AboutSection from './AboutSection';

const sectionAccent = '#D7FF00'; // single accent for whole section so cards match bg

export const projects = [
  {
    title: 'IdeaHunt',
    description:
      'Discover & validate your next big idea. We scan millions of conversations, reviews, and complaints across the web to find real problems people are struggling with. then help you turn them into validated business ideas that actually have demand.',
    getImageSrc: () => require('../images/ideahunt2.png'),
    link: 'https://github.com/Hussain-hamim',
    live: 'https://www.ideahunt.pro/',
    tags: ['AI', 'Business', 'Validation', 'SaaS'],
    theme: { primary: '#286A64', secondary: '#2DD4BF' },
  },
  {
    title: 'Aegnis AI',
    description:
      "Aegnis is your AI Chief of Staff, an AI-powered productivity platform that doesn't just show you your life, it manages it for you. From a to-do list to a done list.",
    getImageSrc: () => require('../images/aegnisai.png'),
    link: 'https://github.com/Hussain-hamim',
    live: 'https://aegnis.life',
    tags: ['AI', 'Productivity', 'Full-stack'],
    theme: { primary: '#1F1205', secondary: '#D97706' },
  },
  {
    title: 'LiquidGlass',
    description:
      'A WebGL-powered library for React that lets developers browse, preview, and copy beautiful glass effects into their projects — 54 effects ready to use.',
    getImageSrc: () => require('../images/liquidglass.png'),
    link: 'https://github.com/Hussain-hamim',
    live: 'https://liquidglass-sigma.vercel.app/',
    tags: ['React', 'WebGL', 'Library'],
    theme: { primary: '#6366F1', secondary: '#818CF8' },
  },
  {
    title: 'DevSync',
    description:
      'DevSync is a collaborative platform designed for developers to connect and collaborate on projects. Features user profiles, project listings, and a real-time chat system.',
    getImageSrc: () => require('../images/devsync.png'),
    link: 'https://github.com/Hussain-hamim/DevSync',
    live: 'https://devsync.codes/',
    tags: ['Next.js', 'Tailwind', 'Supabase'],
    theme: { primary: '#3B82F6', secondary: '#60A5FA' },
  },
  {
    title: 'Premium Shop',
    description:
      'A full-stack (MERN stack) e-commerce platform built with React.js, MongoDB, Node.js and Stripe. Features user authentication, product listings, and a shopping cart.',
    getImageSrc: () => require('../images/premium-shop.png'),
    link: 'https://github.com/Hussain-hamim/PremiumShop',
    live: 'https://premium-shop-teal.vercel.app',
    tags: ['MERN', 'E-commerce', 'Stripe'],
    theme: { primary: '#10B981', secondary: '#34D399' },
  },
  {
    title: 'Ocean Of Games',
    description:
      'A game platform which is a clone of popular RAWG website and also powered by rawg api. browse, select, and search from a tons of games.',
    getImageSrc: () => require('../images/oceanofgames.png'),
    link: 'https://github.com/Hussain-hamim/ocean-of-games',
    live: 'https://ocean-of-games.vercel.app/',
    tags: ['React', 'API', 'Clone'],
    theme: { primary: '#0EA5E9', secondary: '#38BDF8' },
  },
  {
    title: 'Book Ocean',
    description:
      'In this book platform after login you can discover, add up book to reading list, add book to finished list, give note, give stars to the book.',
    getImageSrc: () => require('../images/bookocean.png'),
    link: 'https://github.com/Hussain-hamim/book-ocean',
    live: 'https://book-ocean.vercel.app/discover',
    tags: ['React', 'Firebase', 'Books'],
    theme: { primary: '#F59E0B', secondary: '#FBBF24' },
  },
  {
    title: 'Nature Quest',
    description:
      'A dynamic tour booking platform that allows users to explore amazing travel destinations. Custom-built backend with real-time tour data.',
    getImageSrc: () => require('../images/naturequest.png'),
    link: 'https://github.com/Hussain-hamim/NatureQuest',
    live: 'https://nature-quest-gamma.vercel.app/',
    tags: ['Travel', 'Backend', 'UI/UX'],
    theme: { primary: '#22C55E', secondary: '#4ADE80' },
  },
  {
    title: 'Issue Tracker',
    description:
      'Issue Tracker is a full-stack project built with Next.js. It allows users to create, assign, and manage issues efficiently.',
    getImageSrc: () => require('../images/issuetracker.png'),
    link: 'https://github.com/Hussain-hamim/issue-tracker',
    live: 'https://issue-tracker-tan-eta.vercel.app/',
    tags: ['Next.js', 'Management', 'Full-stack'],
    theme: { primary: '#6366F1', secondary: '#818CF8' },
  },
  {
    title: 'TaskList',
    description:
      'This is a web application for managing your tasks. The application allows users to add, remove, and mark tasks as completed.',
    getImageSrc: () => require('../images/tasklist.png'),
    link: 'https://github.com/Hussain-hamim/my-tasklist',
    live: 'https://my-tasklist-gamma.vercel.app/',
    tags: ['React', 'Productivity', 'CRUD'],
    theme: { primary: '#D7FF00', secondary: '#14B8A6' },
  },
  {
    title: 'Hamimfy',
    description:
      'Hamimfy is a responsive website design to showcase various features and techniques in modern web development. Focuses on cloud hosting.',
    getImageSrc: () => require('../images/hamimfy.png'),
    link: 'https://github.com/Hussain-hamim/hamimfy',
    live: 'https://hamimfy.vercel.app/',
    tags: ['Design', 'Responsive', 'Cloud'],
    theme: { primary: '#64748B', secondary: '#94A3B8' },
  },
];

export const mobileProjects = [
  {
    title: 'Goal Tracking App',
    description:
      'Couple Connect — one place for you both: shared timeline, goals, and private chat for couples. Track savings, travel, home, or fitness together, add contributions, celebrate milestones, and save unlimited moments on your timeline.',
    getImageSrc: () => require('../images/goaltracking.png'),
    link: 'https://github.com/Hussain-hamim',
    live: 'https://goals-tracking-cc.vercel.app/#app-screenshots',
    embedUrl: 'https://goals-tracking-cc.vercel.app/#app-screenshots',
    tags: ['Swift', 'iOS', 'Supabase'],
    theme: { primary: '#160C1A', secondary: '#E8A598' },
  },
  {
    title: 'Shan-AI',
    description:
      'Ask ShanAI anything: A cross platform AI-powered mobile assistant that combines conversational AI, image generation and analysis using OpenAI, Gemini, and Stability APIs.',
    getImageSrc: () => require('../images/shanai2.png'),
    link: 'https://github.com/Hussain-hamim',
    live: 'https://github.com/Hussain-hamim/ShanAI/releases/download/my-tag/ShanAI_1.0.0.apk',
    tags: ['React Native', 'AI', 'Expo'],
    theme: { primary: '#7C3AED', secondary: '#A78BFA' },
  },
  {
    title: 'EaseShop',
    description:
      'A feature-rich mobile e-commerce app built with React Native + Expo, powered by AI voice agents (Vapi) for hands-free shopping.',
    getImageSrc: () => require('../images/easeshop.png'),
    link: 'https://github.com/Hussain-hamim/easeshop-mobile',
    live: 'https://drive.google.com/file/d/1xZ0jOSVEwuIGFCz0AHVnBIzJmRLtmusc/view?usp=drive_link',
    tags: ['E-commerce', 'AI Voice', 'Mobile'],
    theme: { primary: '#EC4899', secondary: '#F472B6' },
  },
  {
    title: 'Threads',
    description:
      'Threads Clone: A cross-platform mobile app that recreates the Threads experience. Built with Convex for real-time updates and Clerk for auth.',
    getImageSrc: () => require('../images/threads2.png'),
    link: 'https://github.com/Hussain-hamim/threads',
    tags: ['Clone', 'Real-time', 'Social'],
    theme: { primary: '#525252', secondary: '#737373' },
  },
  {
    title: 'Himal Beauty',
    description:
      'Barber Booking App: A full-stack mobile app with separate admin and client panels. Built with Supabase and Expo.',
    getImageSrc: () => require('../images/himal-beauty.png'),
    link: 'https://github.com/Hussain-hamim/barber-app',
    live: 'https://drive.google.com/file/d/1uk3aGfYUKCDck4uJFPJ0PtQJTrXe6YKS/view?usp=drive_link',
    tags: ['Booking', 'Supabase', 'Mobile'],
    theme: { primary: '#E11D48', secondary: '#F43F5E' },
  },
  {
    title: 'Brick Blitz',
    description:
      'Brick Breaker Game: A cross-platform mobile game built with React Native and Reanimated for smooth animations.',
    getImageSrc: () => require('../images/blitz.png'),
    link: 'https://github.com/Hussain-hamim',
    tags: ['Game', 'Animation', 'React Native'],
    theme: { primary: '#EF4444', secondary: '#F87171' },
  },
  {
    title: 'Airbnb Clone',
    description:
      'Airbnb UI Clone: A cross-platform mobile app primarily focused on replicating Airbnb’s sleek user interface and navigation.',
    getImageSrc: () => require('../images/airbnb-clone .jpg'),
    link: 'https://github.com/Hussain-hamim/airbnb-clone',
    tags: ['UI/UX', 'Clone', 'Maps'],
    theme: { primary: '#FF5A5F', secondary: '#FF7E82' },
  },
  {
    title: 'SnapDish',
    description:
      'Food Ordering App: A mobile app with separate admin and user panels. Features push notifications and Stripe integration.',
    getImageSrc: () => require('../images/snapdish2.png'),
    link: 'https://github.com/Hussain-hamim/SnapDish',
    tags: ['Food', 'Stripe', 'Admin'],
    theme: { primary: '#F59E0B', secondary: '#FBBF24' },
  },
  {
    title: 'Done With It',
    description:
      'Sell what you do not need on this mobile app platform, working based on node api.',
    getImageSrc: () => require('../images/donewithit2.png'),
    link: 'https://github.com/Hussain-hamim/donewithit',
    tags: ['Marketplace', 'Node.js', 'Mobile'],
    theme: { primary: '#14B8A6', secondary: '#2DD4BF' },
  },
  {
    title: 'Coursia',
    description: 'A mobile app for learning courses and getting certificates.',
    getImageSrc: () => require('../images/coursia2.png'),
    link: 'https://github.com/Hussain-hamim/Coursia',
    tags: ['E-learning', 'Mobile'],
    theme: { primary: '#6366F1', secondary: '#818CF8' },
  },
];

export const certificates = [
  {
    title: 'Meta Front-End Developer Professional Certificate',
    description:
      'Earned after completing 9 rigorous courses over 7 months. This specialization covered essential front-end skills and culminated in a Meta-issued professional certificate.',
 
    getImageSrc: () => require('../images/meta-cert.png'),
    link: 'https://www.coursera.org/account/accomplishments/specialization/CMEZCDWLG4AG',
    live: 'https://www.coursera.org/account/accomplishments/specialization/CMEZCDWLG4AG',
    tags: ['Certificate', 'Meta', 'Frontend'],
    theme: { primary: '#0668E1', secondary: '#1877F2' },
  },
  {
    title: 'Principles of UX/UI Design',
    description:
      'Completed May 2024. Meta-authorized Coursera course covering UX/UI fundamentals, accessibility, user research, and Figma wireframing.',
    getImageSrc: () => require('../images/principles-ux-ui-cert.png'),
    link: 'https://coursera.org/share/c366587be140e302c8789a49b943cad3',
    live: 'https://coursera.org/share/c366587be140e302c8789a49b943cad3',
    tags: ['Certificate', 'Meta', 'UX/UI'],
    theme: { primary: '#0668E1', secondary: '#1877F2' },
  },
  {
    title: 'React Native',
    description:
      'Completed October 2024. Meta-authorized Coursera course on cross-platform mobile development with React Native.',
    getImageSrc: () => require('../images/react-native-cert.png'),
    link: 'https://coursera.org/share/20edf03a10679ae7e3bd4d269c7f5c90',
    live: 'https://coursera.org/share/20edf03a10679ae7e3bd4d269c7f5c90',
    tags: ['Certificate', 'Meta', 'React Native'],
    theme: { primary: '#0668E1', secondary: '#1877F2' },
  },
];

export const SectionHeader = ({ title, light = false }) => {
  const words = typeof title === 'string' ? title.trim().split(/\s+/) : [];
  const showSplit = light && words.length >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className='flex flex-col items-center mb-16'
    >
      <h2
        className={`text-center text-4xl md:text-5xl font-bold font-sans1 tracking-tight uppercase ${
          light ? 'text-[#0a0a0a]' : 'text-white'
        }`}
      >
        {showSplit ? (
          <>
            <span className='text-[#0a0a0a]'>{words[0]}</span>{' '}
            <span className='text-[#0a0a0a]/55'>{words.slice(1).join(' ')}</span>
          </>
        ) : (
          title
        )}
      </h2>
    </motion.div>
  );
};

const hexToRgba = (hex, a) => {
  const [r, g, b] = hex.replace(/^#/, '').match(/.{2}/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${a})`;
};

const FeaturedPlaceholder = ({ children }) => (
  <span
    className='inline-block rounded-md border border-dashed border-[#D7FF00]/35 bg-[#D7FF00]/5 px-1.5 py-0.5 text-[#D7FF00]/80'
    title='Placeholder — replace with real content'
  >
    {children}
  </span>
);

export const ProjectCard = ({
  project,
  index,
  isPashto,
  featured = false,
  featuredMeta = null,
  isCertificate = false,
  light = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const tags = project.tags || [];
  const accent = sectionAccent;
  const useLight = light || isCertificate;

  // ——— Showcase style: cream-section featured cards (image + headline + pills) ———
  if (featured) {
    const headline =
      featuredMeta?.cardHeadline ||
      featuredMeta?.tagline ||
      featuredMeta?.result ||
      featuredMeta?.built ||
      project.description;
    const serviceTags = (project.tags || featuredMeta?.stack || []).slice(0, 4);
    const href = featuredMeta?.slug
      ? `/case-study/${featuredMeta.slug}`
      : project.live || project.link || '#';
    const isInternal = Boolean(featuredMeta?.slug);

    const media = (
      <div className='relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-black bg-[#e8e6db] sm:rounded-3xl'>
        {project.embedUrl ? (
          <iframe
            src={project.embedUrl}
            title={`${project.title} preview`}
            className='absolute inset-0 h-full w-full border-0 scale-[0.35] origin-top-left pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[0.37]'
            style={{ width: '286%', height: '286%' }}
            loading='lazy'
            sandbox='allow-scripts allow-same-origin'
          />
        ) : (
          <img
            src={project.getImageSrc()}
            alt={project.title}
            className='absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]'
          />
        )}
      </div>
    );

    const body = (
      <>
        {media}
        <h3 className='mt-3 line-clamp-2 text-left text-xs font-bold uppercase leading-snug tracking-wide text-[#0a0a0a] font-sans3 sm:mt-4 sm:text-[13px]'>
          {isPlaceholder(headline) ? (
            <FeaturedPlaceholder>{headline}</FeaturedPlaceholder>
          ) : (
            headline
          )}
        </h3>
        <div className='mt-3 flex flex-wrap items-center gap-1.5 sm:mt-3.5 sm:gap-2'>
          <span className='inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black sm:px-3 sm:text-[11px]'>
            {project.title}
          </span>
          {serviceTags.map((tag) => (
            <span
              key={tag}
              className='inline-flex items-center rounded-full bg-black px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white sm:px-3 sm:text-[11px]'
            >
              {tag}
            </span>
          ))}
        </div>
      </>
    );

    const cardShell =
      'block h-full rounded-2xl bg-[#EDEBE0] p-3 sm:rounded-3xl sm:p-4 shadow-[0_0_0_0_transparent] transition-[box-shadow,background-color] duration-300 group-hover:bg-[#E9E7DB] group-hover:shadow-[0_0_0_0.5px_rgba(0,0,0,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3F1E6]';

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-40px' }}
        className='group relative h-full'
      >
        {isInternal ? (
          <Link to={href} className={cardShell}>
            {body}
          </Link>
        ) : (
          <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className={cardShell}
          >
            {body}
          </a>
        )}
      </motion.div>
    );
  }

  // ——— Classic style: all other projects ———
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className='group relative h-full'
    >
      {!useLight && (
        <div
          className='absolute -inset-0.5 rounded-2xl blur-xl opacity-0 group-hover:opacity-25 transition duration-500'
          style={{ background: accent }}
        />
      )}
      <div
        className={`relative h-full rounded-2xl overflow-hidden flex flex-col transition-[box-shadow,background-color] duration-300 ${
          useLight
            ? 'bg-[#EDEBE0] group-hover:bg-[#E9E7DB] group-hover:shadow-[0_0_0_0.5px_rgba(0,0,0,0.22)]'
            : ''
        }`}
        style={
          useLight
            ? undefined
            : {
                backgroundColor: '#141414',
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
              }
        }
        onMouseEnter={(e) => {
          if (!useLight) {
            e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(0,0,0,0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!useLight) {
            e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.06)';
          }
        }}
      >
        <div
          className={`relative overflow-hidden ${
            isCertificate ? 'h-44 sm:h-48' : 'h-60'
          } ${
            useLight ? 'bg-[#e8e6db] border-b border-black/10' : 'bg-[#1a1a1a]'
          }`}
        >
          {project.embedUrl ? (
            <iframe
              src={project.embedUrl}
              title={`${project.title} preview`}
              className='w-full h-full border-0 scale-[0.35] origin-top-left'
              style={{ width: '286%', height: '286%' }}
              loading='lazy'
              sandbox='allow-scripts allow-same-origin'
            />
          ) : (
            <img
              src={project.getImageSrc()}
              alt={project.title}
              className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${isCertificate ? 'object-cover object-top' : 'object-contain'}`}
              style={
                isCertificate && !useLight
                  ? {
                      filter:
                        'invert(0.92) hue-rotate(180deg) brightness(1.05) contrast(0.95)',
                    }
                  : undefined
              }
            />
          )}
        </div>
        <div
          className={`flex flex-col flex-grow relative z-20 ${
            isCertificate ? 'p-4' : 'p-6'
          }`}
        >
          <div className={`flex flex-wrap gap-2 ${isCertificate ? 'mb-2' : 'mb-4'}`}>
            {tags.map((tag, i) => (
              <span
                key={i}
                className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md ${
                  useLight ? 'bg-black text-white' : ''
                }`}
                style={
                  useLight
                    ? undefined
                    : { backgroundColor: hexToRgba(accent, 0.15), color: accent }
                }
              >
                {tag}
              </span>
            ))}
          </div>
          <div className={`flex items-start justify-between gap-3 ${isCertificate ? 'mb-0' : 'mb-3'}`}>
            <h3
              className={`font-bold font-sans3 tracking-tight ${
                isCertificate ? 'text-base sm:text-lg' : 'text-xl'
              } ${useLight ? 'text-[#0a0a0a]' : 'text-white'}`}
              style={
                !useLight && hovered ? { color: accent } : undefined
              }
            >
              {project.title}
            </h3>
            {isCertificate && project.live ? (
              <Button
                href={project.live}
                target='_blank'
                rel='noopener noreferrer'
                size='sm'
                variant='primary'
                icon={<FaExternalLinkAlt />}
                className='shrink-0'
              >
                {isPashto ? 'وګورئ' : 'View'}
              </Button>
            ) : null}
          </div>
          {!isCertificate && (
            <p
              className={`text-sm leading-relaxed mb-6 flex-grow font-sans3 ${
                useLight ? 'text-gray-700' : 'text-gray-400'
              }`}
            >
              {project.description}
            </p>
          )}
          {!isCertificate && (
            <div
              className={`flex flex-wrap items-center gap-3 mt-auto pt-4 border-t ${
                useLight ? 'border-black/10' : 'border-white/10'
              }`}
            >
              <Button
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                size='sm'
                variant='outline'
                icon={<FaGithub />}
              >
                {isPashto ? 'کوډ' : 'Code'}
              </Button>
              {project.live && (
                <Button
                  href={project.live}
                  target='_blank'
                  rel='noopener noreferrer'
                  size='sm'
                  variant='primary'
                  icon={<FaExternalLinkAlt />}
                  className='ml-auto'
                >
                  {isPashto ? 'ژوندۍ نسخه' : 'Live Demo'}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const webDescriptionsPs = {
    IdeaHunt:
      'خپله راتلونکې لويه مفکوره ومومئ او اعتبار يې تاييد کړئ. موږ د وېب له بېلابېلو سرچينو ميليونونه خبرې، ارزونې او شکايتونه څېړو، څو هغه رښتينې ستونزې پيدا کړو چې خلک ورسره مخ دي، بيا يې د بازار غوښتنې لرونکو سوداګريزو مفکورو ته اړوو.',
    'Aegnis AI':
      'Aegnis ستاسو AI Chief of Staff دی. دا يوازې د کارونو لېست نه ښيي، بلکې ستاسو ورځنی نظم هم سمبالوي؛ يعنې کارونه له to-do نه done-list ته رسوي.',
    LiquidGlass:
      'LiquidGlass د React لپاره يو WebGL کتابتون دی چې پراختياکوونکي پکې زړه راښکونکي شيشه‌يي اغېزې وګوري، مخکې وګوري، او په خپلو پروژو کې يې وکاروي.',
    DevSync:
      'DevSync د پراختياکوونکو د نښلېدو او ګډ کار لپاره يو همکار پليټفارم دی. پکې د کارن پروفايلونه، د پروژو ليست او real-time چټ سيستم شامل دي.',
    'Premium Shop':
      'يو Full-Stack (MERN) اي-کامرس پليټفارم چې React.js، MongoDB، Node.js او Stripe سره جوړ شوی. پکې د کارن ننوتل، د محصولاتو ليست او د پېرود cart ټول امکانات شته.',
    'Ocean Of Games':
      'د RAWG وېبسايټ په څېر د لوبو پليټفارم چې د RAWG API پر بنسټ کار کوي. کاروونکي پکې لوبې لټولی، فلټر کولی او سپړلی شي.',
    'Book Ocean':
      'په دې کتابي پليټفارم کې له login وروسته کتابونه موندلی شئ، د لوستلو يا بشپړ شويو لېسټونو ته يې زياتولی شئ، او ورته rating او نوټ ورکولی شئ.',
    'Nature Quest':
      'يو متحرک ټور بوکينګ پليټفارم چې کاروونکو ته د سفر زړه راښکونکي ځایونه معرفي کوي. دا پروژه custom backend او real-time tour data لري.',
    'Issue Tracker':
      'Issue Tracker د Next.js پر بنسټ Full-Stack پروژه ده. کاروونکي پکې ستونزې (issues) جوړوي، ټاکل شوو کسانو ته يې سپاري او په اغېزمن ډول يې مديريتوي.',
    TaskList:
      'دا د ورځنيو کارونو د مديريت وېب پروګرام دی. کاروونکي کولی شي کارونه زيات کړي، لرې کړي او بشپړ يې نښه کړي.',
    Hamimfy:
      'Hamimfy يو responsive وېبسايټ دی چې د عصري وېب پراختيا بېلابېل تخنيکونه او ځانګړنې ښيي، په cloud hosting ځانګړي تمرکز سره.',
};

export const mobileDescriptionsPs = {
    'Shan-AI':
      'ShanAI يو کراس پلېټفارم AI موبايل مرستيال دی؛ له دې سره هر څه پوښتلی شئ. دا conversational AI، د عکس جوړول او د عکس تحليل په يو ځای کې درکوي.',
    EaseShop:
      'يو بډای امکانات لرونکی موبايل اي-کامرس پروګرام چې React Native + Expo سره جوړ شوی او د AI voice agents (Vapi) ملاتړ هم لري.',
    Threads:
      'Threads Clone: يو کراس پلېټفارم پروګرام چې د Threads تجربه بيا رغوي. پکې د real-time اپډېټونو لپاره Convex او د authentication لپاره Clerk کارول شوي.',
    'Himal Beauty':
      'Barber Booking App: يو Full-Stack موبايل پروګرام د admin او client جلا پينلونو سره، چې د Supabase او Expo په مرسته جوړ شوی.',
    'Brick Blitz':
      'Brick Breaker لوبه: يو کراس پلېټفارم موبايل ګېم چې د React Native او Reanimated په مرسته ډېر نرم انيميشنونه وړاندې کوي.',
    'Airbnb Clone':
      'Airbnb UI Clone: يو کراس پلېټفارم پروګرام چې د Airbnb د ښکلي UI او روان navigation پر بيا جوړولو تمرکز لري.',
    SnapDish:
      'Food Ordering App: يو موبايل پروګرام د admin او user جلا پينلونو سره، چې push notifications او Stripe integration پکې شامل دي.',
    'Done With It':
      'هغه شيان چې نور ورته اړتيا نه لرئ، په دې موبايل پليټفارم کې يې خرڅولی شئ. دا پروګرام د Node API پر بنسټ کار کوي.',
    Coursia:
      'د زده کړو کورسونو او سندونو ترلاسه کولو لپاره يو ساده او ګټور موبايل پروګرام.',
};

export const certificateDescriptionsPs = {
  'Meta Front-End Developer':
    'د Meta Front-End Developer Specialization پروګرام کې ۹ کورسونه شامل دي، او د دې سند ترلاسه کولو لپاره شاوخوا ۷ مياشتې وخت ونيول شو.',
  'Advanced React':
    'د ۲۰۲۴ اپریل کې بشپړ شو. د Meta لخوا تصدیق شوی Coursera کورس چې reusable components، API integration، React Testing Library، او پرمختللي React patterns پکې شامل دي.',
  'Principles of UX/UI Design':
    'د ۲۰۲۴ مۍ کې بشپړ شو. د Meta لخوا تصدیق شوی Coursera کورس چې UX/UI بنسټونه، accessibility، user research، او Figma wireframing پکې شامل دي.',
  'React Native':
    'د ۲۰۲۴ اکتوبر کې بشپړ شو. د Meta لخوا تصدیق شوی Coursera کورس چې د React Native سره cross-platform موبايل پراختيا پکې ښودل شوې ده.',
};

const ProjectsSection = ({ locale = 'en' }) => {
  const isPashto = locale === 'ps';

  const webProjects = isPashto
    ? projects.map((project) => ({
        ...project,
        description: webDescriptionsPs[project.title] || project.description,
      }))
    : projects;

  const mobileProjectsLocalized = isPashto
    ? mobileProjects.map((project) => ({
        ...project,
        description: mobileDescriptionsPs[project.title] || project.description,
      }))
    : mobileProjects;

  const certificatesLocalized = isPashto
    ? certificates.map((project) => ({
        ...project,
        description:
          certificateDescriptionsPs[project.title] || project.description,
      }))
    : certificates;

  const currentSideProjectTitles = ['IdeaHunt', 'Aegnis AI', 'LiquidGlass', 'Goal Tracking App'];
  const currentSideProjects = [
    ...webProjects.filter(
      (p) => p.title === 'IdeaHunt' || p.title === 'Aegnis AI' || p.title === 'LiquidGlass'
    ),
    ...mobileProjectsLocalized.filter((p) => p.title === 'Goal Tracking App'),
  ].sort(
    (a, b) =>
      currentSideProjectTitles.indexOf(a.title) -
      currentSideProjectTitles.indexOf(b.title)
  );

  const featuredMetaByTitle = featuredProjects.reduce((acc, f) => {
    acc[f.title] = f;
    return acc;
  }, {});

  return (
    <section id='projects-section' className='relative overflow-hidden bg-[#F3F1E6]'>
      {/* Featured Work */}
      <div className='relative min-h-screen bg-[#F3F1E6]'>
        <div className='relative z-10 py-32 overflow-hidden min-h-screen flex items-center'>
          <div className='max-w-7xl mx-auto w-full px-6 md:px-8 relative z-10'>
            <SectionHeader
              title={isPashto ? 'غوره کارونه' : 'FEATURED WORK'}
              light
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto'>
              {currentSideProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  isPashto={isPashto}
                  featured
                  featuredMeta={featuredMetaByTitle[project.title] || null}
                />
              ))}
            </div>

            {/* See all projects CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              className='mt-14 flex justify-center'
            >
              <Button
                as={Link}
                to='/projects'
                icon={<FaExternalLinkAlt />}
              >
                {isPashto ? 'ټولې پروژې وګورئ' : 'See all projects'}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Experience */}
      <ExperienceSection locale={locale} />

      {/* Tools & Activity · About · Blogs & Photos · Certificates */}
      <div className='relative bg-[#F3F1E6] py-32 overflow-visible'>
        <div className='max-w-7xl mx-auto w-full px-6 md:px-8 relative z-10'>
          {/* Tools & Activity */}
          <div id='tools-section'>
            <SectionHeader
              title={isPashto ? 'وسايل او فعاليت' : 'TOOLS & ACTIVITY'}
              light
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className='relative h-full min-h-[520px] w-full overflow-hidden md:min-h-[560px]'
              >
                <Globe style={{ width: '100%', height: '100%' }} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className='relative group'
              >
                <div className='relative rounded-2xl p-8 bg-[#EDEBE0] transition-[box-shadow,background-color] duration-300 h-full flex flex-col group-hover:bg-[#E9E7DB] group-hover:shadow-[0_0_0_0.5px_rgba(0,0,0,0.22)]'>
                  <div className='flex items-center gap-3 mb-6'>
                    <FaGithub className='text-2xl text-[#0a0a0a]' />
                    <div>
                      <h3 className='text-2xl font-bold text-[#0a0a0a] mb-1'>
                        {isPashto ? 'د ونډو فعاليت' : 'Contribution Activity'}
                      </h3>
                      <p className='text-sm text-gray-600'>
                        {isPashto
                          ? 'په تېرو ۱۲ مياشتو کې د GitHub ونډې'
                          : 'GitHub contributions over the last year'}
                      </p>
                    </div>
                  </div>
                  <div className='bg-[#0a0a0a] rounded-lg p-6 flex-grow min-h-0 border border-white/10'>
                    <div
                      className='w-full overflow-x-auto'
                      style={{ scrollbarWidth: 'thin', scrollbarColor: '#444 transparent' }}
                    >
                      <GitHubContributions username='Hussain-hamim' dark />
                    </div>
                  </div>
                  <Button
                    href='https://github.com/Hussain-hamim'
                    target='_blank'
                    rel='noopener noreferrer'
                    size='sm'
                    className='mt-6'
                    icon={<FaExternalLinkAlt />}
                  >
                    {isPashto ? 'پروفایل وګورئ' : 'View Profile'}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* About — full-bleed black band between tools and blogs */}
          <div className='relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2'>
            <AboutSection locale={locale} />
          </div>

          {/* Blogs & Photos */}
          <div className='mt-36 overflow-visible px-2 sm:px-4 md:px-8'>
            <SectionHeader
              title={isPashto ? 'بلاګونه او عکسونه' : 'Blogs & Photos'}
              light
            />
            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 overflow-visible md:grid-cols-2 md:gap-10'>
              <BlogsCard isPashto={isPashto} />
              <PhotosCard />
            </div>
          </div>

          {/* Certificates — after Blogs & Photos */}
          <div className='mt-36 px-2 sm:px-4 md:px-8'>
            <SectionHeader title={isPashto ? 'سندونه' : 'CERTIFICATES'} light />
            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
              {certificatesLocalized.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                  isPashto={isPashto}
                  isCertificate
                  light
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PHOTO_IMAGES = [
  { src: require('../images/photos-stack-1.png'), alt: 'Photo 1' },
  { src: require('../images/photos-stack-2.png'), alt: 'Photo 2' },
  { src: require('../images/photos-stack-3.png'), alt: 'Photo 3' },
  { src: require('../images/photos-stack-4.png'), alt: 'Photo 4' },
];

const PhotosCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true }}
    className='relative h-[21rem] w-full overflow-hidden sm:h-[23rem] rounded-2xl'
  >
    <InfiniteGallery
      images={PHOTO_IMAGES}
      density={5}
      imageWidth={120}
      imageHeight={150}
      rounded={6}
      dragSpeed={20}
      driftAmount={14}
      friction={10}
      backgroundColor='#EDEBE0'
      width='100%'
      height='100%'
    />
  </motion.div>
);

const BLOG_POSTS = [
  {
    title: 'AI Workflows vs AI Agents',
    titlePs: 'AI ورک فلو vs AI ایجنټان',
    description:
      'An LLM in the pipeline does not make it an agent. The architecture does.',
    descriptionPs:
      'په پایپ لاین کې LLM درلودل دا ایجنټ نه جوړوي — جوړښت یې کوي.',
    url: 'https://chamoylabs.com/article/ai-workflows-vs-ai-agents/',
    source: 'Chamoy Labs',
  },
];

const BlogsCard = ({ isPashto }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className='relative group'
  >
    <div className='relative flex h-full flex-col rounded-2xl bg-[#EDEBE0] p-6 transition-[box-shadow,background-color] duration-300 group-hover:bg-[#E9E7DB] group-hover:shadow-[0_0_0_0.5px_rgba(0,0,0,0.22)] sm:p-8'>
      <div className='mb-5 flex items-center gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#D7FF00] border border-black'>
          <FaBook className='text-base text-black' />
        </div>
        <div>
          <h3 className='text-xl font-bold text-[#0a0a0a]'>
            {isPashto ? 'بلاګونه' : 'Blogs'}
          </h3>
          <p className='text-xs text-gray-600'>
            {isPashto ? 'تخنيکي ليکنې' : 'Technical writing'}
          </p>
        </div>
      </div>

      <div className='flex flex-1 items-start'>
        {BLOG_POSTS.map((post) => (
          <div
            key={post.url}
            className='group/post relative flex w-full max-w-[220px] flex-col overflow-hidden rounded-xl border border-black/10 bg-[#F3F1E6] px-3.5 py-4 transition-all duration-300 hover:border-black/25 hover:shadow-[0_0_0_0.5px_rgba(0,0,0,0.22)]'
          >
            <div className='min-w-0'>
              <span className='mb-2 inline-block text-[9px] font-mono uppercase tracking-[0.18em] text-gray-600'>
                {post.source}
              </span>
              <h4 className='mb-2 text-sm font-semibold leading-snug text-[#0a0a0a]'>
                {isPashto ? post.titlePs : post.title}
              </h4>
              <p className='text-xs leading-relaxed text-gray-600'>
                {isPashto ? post.descriptionPs : post.description}
              </p>
            </div>
            <Button
              href={post.url}
              target='_blank'
              rel='noopener noreferrer'
              size='sm'
              className='mt-4 self-start'
              icon={<FaExternalLinkAlt />}
            >
              {isPashto ? 'ولولئ' : 'Read'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default ProjectsSection;
