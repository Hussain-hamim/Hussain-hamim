import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ExperienceSection from './ExperienceSection';
import { featuredProjects, isPlaceholder } from '../data/featuredProjects';
import { BLOG_POSTS } from '../data/blogs';
import Button from './Button';
import AboutSection from './AboutSection';
import { PEEL_VARIATIONS } from './peelDirections';

const GitHubContributions = lazy(() => import('./GitHubContributions'));
const CardStack = lazy(() => import('./CardStack'));
const StickerPeeling = lazy(() => import('./StickerPeeling'));

const githubSocialImg = require('../images/socials/github.png');

function PaintStroke({ className = '' }) {
  return (
    <svg
      className={`pointer-events-none absolute -left-1 top-1/2 h-[1.35em] w-[calc(100%+10px)] -translate-y-1/2 -rotate-[0.7deg] ${className}`}
      viewBox='0 0 320 72'
      preserveAspectRatio='none'
      aria-hidden='true'
    >
      <path
        fill='#D7FF00'
        d='M3.5 34.2
           C16 12.4, 34 18.6, 52 10.8
           C78 1.2, 98 16.4, 126 8.2
           C152 0.6, 172 14.8, 200 6.4
           C226 -1.2, 250 12.6, 278 5.8
           C294 2.2, 308 10.4, 317 6.1
           L315.6 58.4
           C298 68.2, 276 60.4, 252 66.8
           C224 74.2, 200 61.6, 172 69.4
           C144 76.8, 118 63.2, 90 70.6
           C62 77.4, 38 64.8, 18 71.2
           C10 73.8, 4.8 64.2, 3.5 34.2 Z'
      />
    </svg>
  );
}

export const projects = [
  {
    title: 'IdeaHunt',
    description:
      'Discover & validate your next big idea. We scan millions of conversations, reviews, and complaints across the web to find real problems people are struggling with. then help you turn them into validated business ideas that actually have demand.',
    getImageSrc: () => require('../images/ideahunt3.png'),
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
    title: 'ProveIt AI',
    description:
      'Finally get things done. ProveIt AI forces accountability with live picture proof, AI scanning, deadlines, and alarms until you prove it — or give up. Includes Coach Aura for relentless pressure coaching.',
    getImageSrc: () => require('../images/proveit-ai.png'),
    link: 'https://github.com/Hussain-hamim',
    live: 'https://www.proveitai.app/',
    tags: ['iOS', 'AI', 'Swift', 'Accountability'],
    theme: { primary: '#0A0A0A', secondary: '#FF5A2D' },
  },
  {
    title: 'Couple Connect',
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
      className='mb-8 flex flex-col items-center'
    >
      <h2
        className={`text-center text-2xl font-medium tracking-tight ${
          light ? 'text-ink' : 'text-white'
        }`}
      >
        {showSplit ? (
          <>
            <span className='text-ink'>{words[0]}</span>{' '}
            <span className='text-ink-muted'>{words.slice(1).join(' ')}</span>
          </>
        ) : (
          title
        )}
      </h2>
    </motion.div>
  );
};

const FeaturedPlaceholder = ({ children }) => (
  <span
    className='inline-block rounded-md border border-dashed border-[#D7FF00]/35 bg-[#D7FF00]/5 px-1.5 py-0.5 text-[#D7FF00]/80'
    title='Placeholder — replace with real content'
  >
    {children}
  </span>
);

const PreviewCta = ({ href, to, children, icon, className = '' }) => {
  const classes = `project-preview-cta-secondary ${className}`.trim();
  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={classes}
    >
      {content}
    </a>
  );
};

export const ProjectCard = ({
  project,
  index,
  isPashto,
  featured = false,
  featuredMeta = null,
  isCertificate = false,
}) => {
  const tags = (project.tags || featuredMeta?.stack || []).slice(0, 3);
  const headline =
    featuredMeta?.cardHeadline ||
    featuredMeta?.tagline ||
    project.description;
  const caseStudyHref = featuredMeta?.slug
    ? `/case-study/${featuredMeta.slug}`
    : null;
  const liveUrl = project.live || featuredMeta?.live || null;
  const repoUrl = project.link || featuredMeta?.code || null;

  const media = (
    <div
      className={`project-preview-media relative w-full overflow-hidden ${
        isCertificate ? 'aspect-[16/9]' : 'aspect-[40/21]'
      }`}
    >
      {project.embedUrl ? (
        <iframe
          src={project.embedUrl}
          title={`${project.title} preview`}
          className='absolute inset-0 h-full w-full origin-top-left scale-[0.35] border-0 pointer-events-none'
          style={{ width: '286%', height: '286%' }}
          loading='lazy'
          sandbox='allow-scripts allow-same-origin'
        />
      ) : (
        <img
          src={project.getImageSrc()}
          alt={project.title}
          className='h-full w-full object-cover object-top'
          loading={featured ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      viewport={{ once: true }}
      className='project-preview w-full'
    >
      {media}
      <div className='p-4'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <span className='relative inline-flex items-center px-1.5 py-0.5 text-xs font-extrabold uppercase tracking-wide text-black sm:px-2 sm:text-[13px]'>
            <PaintStroke />
            <span className='relative z-10'>{project.title}</span>
          </span>
          {liveUrl ? (
            <PreviewCta
              href={liveUrl}
              className='ml-auto'
              icon={<FaExternalLinkAlt className='h-[14px] w-[14px]' />}
            >
              {isCertificate
                ? isPashto
                  ? 'وګورئ'
                  : 'View'
                : isPashto
                  ? 'سایټ'
                  : 'View site'}
            </PreviewCta>
          ) : null}
        </div>
        {!isCertificate ? (
          <p className='mt-2 line-clamp-3 text-[15px] font-normal leading-6 text-ink-muted'>
            {featured && isPlaceholder(headline) ? (
              <FeaturedPlaceholder>{headline}</FeaturedPlaceholder>
            ) : (
              headline
            )}
          </p>
        ) : null}

        {!featured && tags.length > 0 ? (
          <div className='mt-2 flex flex-wrap gap-1.5'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='text-[11px] font-medium leading-none text-ink-muted'
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {(featured && (repoUrl || caseStudyHref)) ||
        (!featured && !isCertificate && repoUrl) ? (
          <div className='mt-3 flex flex-wrap items-center gap-2'>
            {featured && repoUrl ? (
              <PreviewCta href={repoUrl} icon={<FaGithub className='h-[14px] w-[14px]' />}>
                {isPashto ? 'ریپو' : 'View repo'}
              </PreviewCta>
            ) : null}
            {featured && caseStudyHref ? (
              <PreviewCta to={caseStudyHref}>
                {isPashto ? 'کیس سټډي' : 'Case study'}
              </PreviewCta>
            ) : null}
            {!featured && !isCertificate && repoUrl ? (
              <PreviewCta href={repoUrl} icon={<FaGithub className='h-[14px] w-[14px]' />}>
                {isPashto ? 'کوډ' : 'View repo'}
              </PreviewCta>
            ) : null}
          </div>
        ) : null}
      </div>
    </motion.article>
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
    'ProveIt AI':
      'ProveIt AI تاسو مجبوروي چې کارونه ثابت کړئ: ژوندی عکس proof، AI سکین، ضرب‌الاجلونه او الارمونه تر څو ثابت يې کړئ — يا تسليم شئ. Coach Aura هم پکې دی.',
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
  const [hoveredGithub, setHoveredGithub] = useState(false);

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

  // const certificatesLocalized = isPashto
  //   ? certificates.map((project) => ({
  //       ...project,
  //       description:
  //         certificateDescriptionsPs[project.title] || project.description,
  //     }))
  //   : certificates;

  const currentSideProjectTitles = [
    'IdeaHunt',
    'Aegnis AI',
    'ProveIt AI',
    'Couple Connect',
  ];
  const currentSideProjects = [
    ...webProjects.filter(
      (p) => p.title === 'IdeaHunt' || p.title === 'Aegnis AI'
    ),
    ...mobileProjectsLocalized.filter(
      (p) => p.title === 'ProveIt AI' || p.title === 'Couple Connect'
    ),
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
    <section id='projects-section' className='section-sep relative overflow-hidden bg-surface-alt transition-colors duration-300'>
      {/* Featured Work */}
      <div className='section-sep relative bg-surface-alt'>
        <div className='relative z-10 px-4 py-16 md:px-8 md:py-20'>
          <div className='mx-auto w-full max-w-4xl'>
            <SectionHeader
              title={isPashto ? 'غوره کارونه' : 'Featured work'}
              light
            />
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5'>
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
              className='mt-6 flex justify-center'
            >
              <Button
                as={Link}
                to='/projects'
                size='xs'
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

      {/* Activity · About · Blogs & Photos · Certificates */}
      <div className='relative overflow-visible bg-surface-alt px-4 py-16 md:px-8 md:py-20'>
        {/* About + Activity */}
        <div
          id='activity-section'
          className='section-sep mx-auto w-full max-w-4xl pb-16'
        >
            <SectionHeader
              title={isPashto ? 'په اړه او فعاليت' : 'About & activity'}
              light
            />
            <div className='grid min-w-0 grid-cols-1 items-stretch gap-6 md:grid-cols-2'>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className='relative h-full min-h-[320px] w-full overflow-hidden'
              >
                <AboutSection locale={locale} embedded />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className='group relative h-full min-h-0 min-w-0'
              >
                <div className='relative flex h-full flex-col rounded-lg bg-card p-4 shadow-[0_0_0_0.5px_rgba(10,10,10,0.08)] transition-[box-shadow,background-color] duration-300 group-hover:shadow-[0_0_0_0.5px_rgba(10,10,10,0.18)] dark:shadow-none dark:group-hover:shadow-[0_0_0_0.5px_rgba(0,0,0,0.22)] sm:p-5'>
                  <div className='mb-4'>
                    <h3 className='text-[17px] font-medium tracking-tight text-ink'>
                      {isPashto ? 'د ونډو فعاليت' : 'Contribution activity'}
                    </h3>
                  </div>
                  <div className='min-h-0 min-w-0 flex-1 overflow-hidden rounded-lg border border-white/10 bg-[#0C1117] px-2 py-3 sm:px-3 sm:py-4'>
                    <div
                      className='flex w-full min-w-0 justify-center overflow-x-auto'
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#444 transparent',
                      }}
                    >
                      <Suspense fallback={<div className='h-28' aria-hidden />}>
                        <GitHubContributions username='Hussain-hamim' dark />
                      </Suspense>
                    </div>
                  </div>
                  <a
                    href='https://github.com/Hussain-hamim'
                    target='_blank'
                    rel='noopener noreferrer'
                    onMouseEnter={() => setHoveredGithub(true)}
                    onMouseLeave={() => setHoveredGithub(false)}
                    className='group mt-5 flex items-center justify-center gap-3 self-center text-ink transition-colors duration-300 hover:text-[#D7FF00]'
                  >
                    <span className='inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg opacity-90 transition-[filter,opacity,color] duration-300 group-hover:opacity-100 [filter:grayscale(1)_brightness(1.15)] group-hover:[filter:grayscale(1)_brightness(1.35)]'>
                      <Suspense
                        fallback={
                          <img
                            src={githubSocialImg}
                            alt=''
                            className='h-6 w-6 rounded-lg object-contain sm:h-7 sm:w-7'
                          />
                        }
                      >
                        <StickerPeeling
                          image={githubSocialImg}
                          imageWidth={28}
                          imageHeight={28}
                          hoverPeel={48}
                          pressPeel={70}
                          hovered={hoveredGithub}
                          curlRotation={PEEL_VARIATIONS[1]}
                          backColor='#1e1f22'
                          shadowEnabled
                          shadow={{
                            opacity: 28,
                            color: '#000000',
                            x: -220,
                            y: 120,
                          }}
                          transition={{
                            type: 'tween',
                            duration: 0.28,
                            ease: 'easeOut',
                          }}
                        />
                      </Suspense>
                    </span>
                    <span className='font-mono text-sm tracking-wider'>
                      GitHub
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Blogs & Photos */}
          <div
            id='blogs-section'
            className='section-sep mx-auto mt-16 w-full max-w-4xl scroll-mt-24 overflow-visible pb-16'
          >
            <SectionHeader
              title={isPashto ? 'بلاګونه او عکسونه' : 'Blogs & Photos'}
              light
            />
            <div className='grid grid-cols-1 gap-4 overflow-visible md:grid-cols-2'>
              <BlogsCard isPashto={isPashto} />
              <PhotosCard isPashto={isPashto} />
            </div>
          </div>

          {/* Certificates — after Blogs & Photos
          <div className='mx-auto mt-16 w-full max-w-4xl px-4 md:px-8'>
            <SectionHeader title={isPashto ? 'سندونه' : 'Certificates'} light />
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
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
          */}
      </div>
    </section>
  );
};

const PHOTO_IMAGES = [
  { src: require('../images/photos-stack-1.png'), alt: 'Photo 1' },
  { src: require('../images/photos-stack-2.png'), alt: 'Photo 2' },
  { src: require('../images/photos-stack-3.png'), alt: 'Photo 3' },
  { src: require('../images/photos-stack-4.png'), alt: 'Photo 4' },
  { src: require('../images/photos-stack-5.png'), alt: 'Photo 5' },
  { src: require('../images/photos-stack-6.png'), alt: 'Photo 6' },
  { src: require('../images/photos-stack-7.png'), alt: 'Photo 7' },
];

const PhotosCard = ({ isPashto }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true }}
    className='relative flex w-full flex-col'
  >
    <div className='relative h-[21rem] w-full overflow-visible sm:h-[23rem]'>
      <Suspense
        fallback={<div className='h-full w-full rounded-2xl bg-panel' aria-hidden />}
      >
        <CardStack
          images={PHOTO_IMAGES}
          cardWidth={220}
          cardHeight={280}
          cardRadius={8}
          xOffset={100}
          tiltAngle={-40}
        />
      </Suspense>
    </div>
    <p className='mt-3 text-center font-mono text-[11px] tracking-wide text-gray-600 dark:text-white/50'>
      {isPashto
        ? 'پورته کارت راښکئ ترڅو نور عکسونه وګورئ'
        : 'Drag the top card to browse photos'}
    </p>
  </motion.div>
);

const BlogsCard = ({ isPashto }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className='relative group'
  >
    <div className='relative flex h-full flex-col rounded-lg bg-card p-4 shadow-[0_0_0_0.5px_rgba(10,10,10,0.08)] transition-[box-shadow] duration-300 group-hover:shadow-[0_0_0_0.5px_rgba(10,10,10,0.18)] dark:shadow-none dark:group-hover:shadow-[0_0_0_0.5px_rgba(0,0,0,0.22)] sm:p-5'>
      <div className='mb-4 flex items-start justify-between gap-3'>
        <div>
          <h3 className='text-[17px] font-medium tracking-tight text-ink'>
            {isPashto ? 'بلاګونه' : 'Blogs'}
          </h3>
          <p className='text-xs text-ink-muted'>
            {isPashto ? 'تخنيکي ليکنې' : 'Technical writing'}
          </p>
        </div>
        <Button as={Link} to='/blogs' size='xs' variant='primary'>
          {isPashto ? 'ټول وګورئ' : 'View all'}
        </Button>
      </div>

      <div className='flex flex-1 flex-row flex-nowrap items-stretch gap-3 overflow-x-auto pb-1'>
        {BLOG_POSTS.map((post) => (
          <div
            key={post.url}
            className='group/post relative flex w-[200px] shrink-0 flex-col overflow-hidden rounded-xl border border-ink/10 bg-card-inset px-3.5 py-4 transition-all duration-300 hover:border-ink/20 sm:w-[220px]'
          >
            <div className='min-w-0 flex-1'>
              <span className='mb-2 inline-block font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted'>
                {post.source}
              </span>
              <h4 className='mb-2 text-sm font-semibold leading-snug text-ink'>
                {isPashto ? post.titlePs : post.title}
              </h4>
              <p className='text-xs leading-relaxed text-ink-muted'>
                {isPashto ? post.descriptionPs : post.description}
              </p>
            </div>
            <Button
              href={post.url}
              target='_blank'
              rel='noopener noreferrer'
              size='xs'
              fullWidth
              className='mt-4 shrink-0'
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
