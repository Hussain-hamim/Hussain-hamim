import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaMobileAlt,
  FaGlobe,
  FaAward,
  FaBook,
  FaCamera,
  FaRocket,
} from 'react-icons/fa';
import GitHubContributions from './GitHubContributions';

const defaultTheme = { primary: '#D7FF00', secondary: '#14B8A6' };
const sectionAccent = '#D7FF00'; // single accent for whole section so cards match bg

export const projects = [
  {
    title: 'IdeaHunt',
    description:
      'Discover & validate your next big idea. We scan millions of conversations, reviews, and complaints across the web to find real problems people are struggling with. then help you turn them into validated business ideas that actually have demand.',
    getImageSrc: () => require('../images/ideahunt2.png'),
    link: 'https://github.com/Hussain-hamim',
    live: 'https://ideahunt.pro',
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
      'A goal tracking app that allows users to set goals, track their progress, and achieve their goals.',
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

const certificates = [
  {
    title: 'Meta Front-End Developer',
    description:
      'Meta Front-End Developer Specialization include 9 courses, took approximately 7 months to get this certificate.',
    getImageSrc: () => require('../images/meta-cert.jpeg'),
    link: 'https://www.coursera.org/account/accomplishments/specialization/CMEZCDWLG4AG',
    live: 'https://www.coursera.org/account/accomplishments/specialization/CMEZCDWLG4AG',
    tags: ['Certificate', 'Meta', 'Frontend'],
    theme: { primary: '#0668E1', secondary: '#1877F2' },
  },
];

const SectionHeader = ({ title, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className='flex flex-col items-center mb-16'
  >
    <div className='flex items-center gap-3 mb-4'>
      <Icon className='text-3xl text-[#D7FF00]' />
      <h2 className='text-4xl md:text-5xl font-bold font-sans1 text-white tracking-tight'>
        {title}
      </h2>
    </div>
    <div className='w-24 h-1 rounded-full' style={{ background: sectionAccent }} />
  </motion.div>
);

const hexToRgba = (hex, a) => {
  const [r, g, b] = hex.replace(/^#/, '').match(/.{2}/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${a})`;
};

const isDark = (hex) => {
  const [r, g, b] = hex.replace(/^#/, '').match(/.{2}/g).map((x) => parseInt(x, 16));
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.4;
};

const ProjectCard = ({ project, index, isPashto, featured = false }) => {
  const [hovered, setHovered] = useState(false);
  const tags = project.tags || [];
  const accent = sectionAccent;

  // ——— Showcase style: only for the 3 current side projects ——— 
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-40px' }}
        className='group relative h-full'
      >
        <motion.div
          className='relative h-full rounded-3xl overflow-hidden flex flex-col'
          style={{
            background: '#0d0d0d',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.3)',
          }}
          whileHover={{
            y: -8,
            boxShadow: '0 32px 64px -12px rgba(0,0,0,0.4)',
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <div className='relative h-56 sm:h-64 overflow-hidden'>
            {project.embedUrl ? (
              <iframe
                src={project.embedUrl}
                title={`${project.title} preview`}
                className='absolute inset-0 w-full h-full border-0 scale-[0.35] origin-top-left pointer-events-none'
                style={{ width: '286%', height: '286%' }}
                loading='lazy'
                sandbox='allow-scripts allow-same-origin'
              />
            ) : (
              <img
                src={project.getImageSrc()}
                alt={project.title}
                className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
              />
            )}
            {/* Neutral dark overlay so title is readable on any image */}
            <div
              className='absolute inset-0 pointer-events-none'
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)',
              }}
            />
            <div className='absolute bottom-0 left-0 right-0 p-5 pt-12'>
              <h3
                className='text-2xl sm:text-3xl font-bold font-sans1 text-white tracking-tight'
                style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
              >
                {project.title}
              </h3>
              <div className='flex flex-wrap gap-1.5 mt-2'>
                {tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className='px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold rounded-full text-black'
                    style={{ backgroundColor: accent }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div
            className='relative flex-1 flex flex-col p-5 sm:p-6'
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%)',
            }}
          >
            <p className='text-gray-400 text-sm leading-relaxed mb-5 flex-grow font-sans3 line-clamp-3'>
              {project.description}
            </p>
            <div className='flex items-center justify-between gap-3 pt-4 border-t border-white/10'>
              <a
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors'
              >
                <FaGithub className='text-base' />
                <span>{isPashto ? 'کوډ' : 'Code'}</span>
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all text-black'
                  style={{ backgroundColor: accent }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = `0 8px 24px ${hexToRgba(accent, 0.45)}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <span>{isPashto ? 'ژوندۍ نسخه' : 'Live'}</span>
                  <FaExternalLinkAlt className='text-xs' />
                </a>
              )}
            </div>
          </div>
          <div
            className='absolute bottom-0 left-0 right-0 h-0.5 opacity-80'
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          />
        </motion.div>
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
      <div
        className='absolute -inset-0.5 rounded-2xl blur-xl opacity-0 group-hover:opacity-25 transition duration-500'
        style={{ background: accent }}
      />
      <div
        className='relative h-full rounded-2xl overflow-hidden transition-all duration-300 flex flex-col'
        style={{
          backgroundColor: '#141414',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.06)';
        }}
      >
        <div className='relative h-60 overflow-hidden bg-[#1a1a1a]'>
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
              className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-105'
            />
          )}
        </div>
        <div className='p-6 flex flex-col flex-grow relative z-20'>
          <div className='flex flex-wrap gap-2 mb-4'>
            {tags.map((tag, i) => (
              <span
                key={i}
                className='px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md'
                style={{ backgroundColor: hexToRgba(accent, 0.15), color: accent }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h3
            className='text-xl font-bold font-sans3 mb-3 tracking-tight text-white'
            style={{ color: hovered ? accent : undefined }}
          >
            {project.title}
          </h3>
          <p className='text-gray-400 text-sm leading-relaxed mb-6 flex-grow font-sans3'>
            {project.description}
          </p>
          <div className='flex items-center gap-4 mt-auto pt-4 border-t border-white/10'>
            <a
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors'
            >
              <FaGithub className='text-lg' />
              <span>{isPashto ? 'کوډ' : 'Code'}</span>
            </a>
            {project.live && (
              <a
                href={project.live}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 px-3 py-2 text-xs font-bold tracking-wider rounded-full ml-auto transition-all text-black'
                style={{
                  backgroundColor: accent,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 4px 16px ${hexToRgba(accent, 0.4)}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <span>{isPashto ? 'ژوندۍ نسخه' : 'Live Demo'}</span>
                <FaExternalLinkAlt className='text-sm' />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = ({ locale = 'en' }) => {
  const isPashto = locale === 'ps';
  const [showAllWeb, setShowAllWeb] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const webDescriptionsPs = {
    IdeaHunt:
      'خپله راتلونکې لويه مفکوره ومومئ او اعتبار يې تاييد کړئ. موږ د وېب له بېلابېلو سرچينو ميليونونه خبرې، ارزونې او شکايتونه څېړو، څو هغه رښتينې ستونزې پيدا کړو چې خلک ورسره مخ دي، بيا يې د بازار غوښتنې لرونکو سوداګريزو مفکورو ته اړوو.',
    'Aegnis AI':
      'Aegnis ستاسو AI Chief of Staff دی. دا يوازې د کارونو لېست نه ښيي، بلکې ستاسو ورځنی نظم هم سمبالوي؛ يعنې کارونه له to-do نه done-list ته رسوي.',
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

  const mobileDescriptionsPs = {
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

  const certificateDescriptionsPs = {
    'Meta Front-End Developer':
      'د Meta Front-End Developer Specialization پروګرام کې ۹ کورسونه شامل دي، او د دې سند ترلاسه کولو لپاره شاوخوا ۷ مياشتې وخت ونيول شو.',
  };

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

  const initialCount = 6;
  const webProjectsToShow = showAllWeb
    ? webProjects
    : webProjects.slice(0, initialCount);
  const mobileProjectsToShow = showAllMobile
    ? mobileProjectsLocalized
    : mobileProjectsLocalized.slice(0, initialCount);

  const currentSideProjectTitles = ['IdeaHunt', 'Aegnis AI', 'Goal Tracking App'];
  const currentSideProjects = [
    ...webProjects.filter((p) => p.title === 'IdeaHunt' || p.title === 'Aegnis AI'),
    ...mobileProjectsLocalized.filter((p) => p.title === 'Goal Tracking App'),
  ].sort(
    (a, b) =>
      currentSideProjectTitles.indexOf(a.title) -
      currentSideProjectTitles.indexOf(b.title)
  );

  return (
    <section
      id='projects-section'
      className='relative bg-[#0f0f0f] py-32 overflow-hidden'
    >
      {/* Background Decor — single accent to match cards */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-0 w-96 h-96 bg-[#D7FF00]/[0.07] rounded-full blur-[120px]' />
        <div className='absolute bottom-20 right-0 w-96 h-96 bg-[#D7FF00]/[0.05] rounded-full blur-[120px]' />
      </div>

      <div className='max-w-7xl mx-auto px-6 md:px-8 relative z-10'>
        {/* Current side projects */}
        <div className='mb-32'>
          <SectionHeader
            title={isPashto ? 'اوسنۍ پروژې' : 'CURRENT SIDE PROJECTS'}
            icon={FaRocket}
          />
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {currentSideProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isPashto={isPashto}
                featured
              />
            ))}
          </div>
        </div>

        {/* Web Projects */}
        <div className='mb-32'>
          <SectionHeader
            title={isPashto ? 'وېب پروژې' : 'WEB PROJECTS'}
            icon={FaGlobe}
          />
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
                className='px-8 py-3 text-sm font-bold uppercase tracking-wider text-[#D7FF00] rounded-full transition-all hover:bg-[#D7FF00]/10 hover:shadow-lg hover:shadow-[#D7FF00]/20'
                style={{
                  borderWidth: '0.5px',
                  borderColor: 'rgba(215, 255, 0, 0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(215, 255, 0, 1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(215, 255, 0, 0.5)';
                }}
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
          <SectionHeader
            title={isPashto ? 'موبايل پروګرامونه' : 'MOBILE APPS'}
            icon={FaMobileAlt}
          />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {mobileProjectsToShow.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isPashto={isPashto}
              />
            ))}
          </div>
          {mobileProjectsLocalized.length > initialCount && (
            <div className='flex justify-center mt-12'>
              <button
                onClick={() => setShowAllMobile(!showAllMobile)}
                className='px-8 py-3 text-sm font-bold uppercase tracking-wider text-[#D7FF00] rounded-full transition-all hover:bg-[#D7FF00]/10 hover:shadow-lg hover:shadow-[#D7FF00]/20'
                style={{
                  borderWidth: '0.5px',
                  borderColor: 'rgba(215, 255, 0, 0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(215, 255, 0, 1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(215, 255, 0, 0.5)';
                }}
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

        {/* Certificates */}
        <div className='mb-32'>
          <SectionHeader
            title={isPashto ? 'سندونه' : 'CERTIFICATES'}
            icon={FaAward}
          />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {certificatesLocalized.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isPashto={isPashto}
              />
            ))}
          </div>
        </div>

        {/* What I Use & GitHub */}
        <div id='tools-section'>
          <SectionHeader
            title={isPashto ? 'وسايل او فعاليت' : 'TOOLS & ACTIVITY'}
            icon={FaGithub}
          />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* What I Use */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className='relative group'
            >
              <div className='absolute inset-0 bg-[#D7FF00] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500'></div>
              <div className='relative bg-[#111] rounded-2xl p-8 shadow-2xl hover:shadow-[0_0_40px_rgba(215,255,0,0.1)] transition-all duration-300 h-full'>
                <div className='flex items-center gap-3 mb-8'>
                  <div className='w-12 h-12 rounded-xl bg-[#D7FF00]/10 flex items-center justify-center'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      className='text-[#D7FF00]'
                    >
                      <rect x='2' y='3' width='20' height='14' rx='2' />
                      <line x1='8' y1='21' x2='16' y2='21' />
                      <line x1='12' y1='17' x2='12' y2='21' />
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-2xl font-bold text-white mb-1'>
                      {isPashto ? 'زه څه کاروم' : 'What I Use'}
                    </h3>
                    <p className='text-sm text-gray-400'>
                      {isPashto
                        ? 'هارډوېیر او سافټوېیر'
                        : 'Hardware & Software'}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-8'>
                  {/* Hardware Section */}
                  <div>
                    <h4 className='text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-5'>
                      {isPashto ? 'هارډوېیر' : 'Hardware'}
                    </h4>
                    <div className='space-y-4'>
                      <div className='flex items-center gap-3 group/item'>
                        <div className='w-8 h-8 rounded-lg bg-[#D7FF00]/10 flex items-center justify-center group-hover/item:bg-[#D7FF00]/20 transition-colors'>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            className='text-[#D7FF00]'
                          >
                            <rect x='2' y='4' width='20' height='16' rx='2' />
                            <path d='M6 8h12' />
                          </svg>
                        </div>
                        <span className='text-sm text-gray-300 font-medium'>
                          MacBook Air M3
                        </span>
                      </div>
                      <div className='flex items-center gap-3 group/item'>
                        <div className='w-8 h-8 rounded-lg bg-[#D7FF00]/10 flex items-center justify-center group-hover/item:bg-[#D7FF00]/20 transition-colors'>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            className='text-[#D7FF00]'
                          >
                            <rect x='5' y='2' width='14' height='20' rx='2' />
                            <path d='M12 18h.01' />
                          </svg>
                        </div>
                        <span className='text-sm text-gray-300 font-medium'>
                          iPhone 13 Pro Max
                        </span>
                      </div>
                      <div className='flex items-center gap-3 group/item'>
                        <div className='w-8 h-8 rounded-lg bg-[#D7FF00]/10 flex items-center justify-center group-hover/item:bg-[#D7FF00]/20 transition-colors'>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            className='text-[#D7FF00]'
                          >
                            <rect x='2' y='6' width='20' height='12' rx='2' />
                            <path d='M6 10h12' />
                            <path d='M8 14h8' />
                          </svg>
                        </div>
                        <span className='text-sm text-gray-300 font-medium'>
                          Dell Precision 5540
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Software Section */}
                  <div>
                    <h4 className='text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-5'>
                      {isPashto ? 'سافټوېیر' : 'Software'}
                    </h4>
                    <div className='space-y-4'>
                      <div className='flex items-center gap-3 group/item'>
                        <div className='w-8 h-8 rounded-lg bg-[#D7FF00]/10 flex items-center justify-center group-hover/item:bg-[#D7FF00]/20 transition-colors'>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            className='text-[#D7FF00]'
                          >
                            <rect x='3' y='3' width='18' height='18' rx='2' />
                            <path d='M9 9h6v6H9z' />
                          </svg>
                        </div>
                        <span className='text-sm text-gray-300 font-medium'>
                          Cursor
                        </span>
                      </div>
                      <div className='flex items-center gap-3 group/item'>
                        <div className='w-8 h-8 rounded-lg bg-[#D7FF00]/10 flex items-center justify-center group-hover/item:bg-[#D7FF00]/20 transition-colors'>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            className='text-[#D7FF00]'
                          >
                            <path d='M9 9h6v6H9z' />
                            <path d='M9 3v6h6V3' />
                            <path d='M9 15v6h6v-6' />
                          </svg>
                        </div>
                        <span className='text-sm text-gray-300 font-medium'>
                          Figma
                        </span>
                      </div>
                      <div className='flex items-center gap-3 group/item'>
                        <div className='w-8 h-8 rounded-lg bg-[#D7FF00]/10 flex items-center justify-center group-hover/item:bg-[#D7FF00]/20 transition-colors'>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            className='text-[#D7FF00]'
                          >
                            <circle cx='12' cy='12' r='10' />
                            <path d='M12 6v6l4 2' />
                          </svg>
                        </div>
                        <span className='text-sm text-gray-300 font-medium'>
                          Xcode
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* GitHub Contributions */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='relative group'
            >
              <div className='absolute inset-0 bg-[#D7FF00] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500'></div>
              <div className='relative bg-[#111] rounded-2xl p-8 shadow-2xl hover:shadow-[0_0_40px_rgba(215,255,0,0.1)] transition-all duration-300 h-full flex flex-col'>
                <div className='flex items-center gap-3 mb-6'>
                  <FaGithub className='text-2xl text-[#D7FF00]' />
                  <div>
                    <h3 className='text-2xl font-bold text-white mb-1'>
                      {isPashto ? 'د ونډو فعاليت' : 'Contribution Activity'}
                    </h3>
                    <p className='text-sm text-gray-400'>
                      {isPashto
                        ? 'په تېرو ۱۲ مياشتو کې د GitHub ونډې'
                        : 'GitHub contributions over the last year'}
                    </p>
                  </div>
                </div>
                <div className='bg-[#0d1117] rounded-lg p-6 flex-grow min-h-0'>
                  <div
                    className='w-full overflow-x-auto'
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#333 transparent',
                    }}
                  >
                    <GitHubContributions username='Hussain-hamim' dark={true} />
                  </div>
                </div>
                <a
                  href='https://github.com/Hussain-hamim'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center justify-center gap-2 mt-6 px-6 py-2 text-xs font-bold uppercase tracking-wider text-[#D7FF00] rounded-full transition-all hover:bg-[#D7FF00]/10 hover:shadow-lg hover:shadow-[#D7FF00]/20'
                  style={{
                    borderWidth: '0.5px',
                    borderColor: 'rgba(215, 255, 0, 0.5)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(215, 255, 0, 1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      'rgba(215, 255, 0, 0.5)';
                  }}
                >
                  <span>{isPashto ? 'پروفایل وګورئ' : 'View Profile'}</span>
                  <FaExternalLinkAlt className='text-sm' />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className='mt-36'>
          <SectionHeader
            title={isPashto ? 'بلاګونه او عکسونه' : 'Blogs & Photos'}
            icon={FaAward}
          />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Blogs Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className='relative group'
            >
              <div className='absolute inset-0 bg-[#D7FF00] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500'></div>
              <div className='relative bg-[#111] rounded-2xl p-8 shadow-2xl hover:shadow-[0_0_40px_rgba(215,255,0,0.1)] transition-all duration-300 h-full'>
                <div className='flex flex-col items-center text-center'>
                  <div className='w-16 h-16 rounded-full bg-[#D7FF00]/10 flex items-center justify-center mb-6 group-hover:bg-[#D7FF00]/20 transition-colors'>
                    <FaBook className='text-3xl text-[#D7FF00]' />
                  </div>
                  <h3 className='text-2xl font-bold text-white mb-3'>
                    {isPashto ? 'بلاګونه' : 'Blogs'}
                  </h3>
                  <p className='text-gray-400 mb-4'>
                    {isPashto
                      ? 'تخنيکي ليکنې، ټيوټوريالونه، او د پراختيا، AI او ټکنالوژۍ په اړه نظرونه.'
                      : 'Technical insights, tutorials, and thoughts on development, AI, and technology.'}
                  </p>
                  <div className='flex items-center gap-2 text-sm text-[#D7FF00] font-semibold'>
                    <span>{isPashto ? 'ژر راځي' : 'Coming Soon'}</span>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      className='animate-pulse'
                    >
                      <circle cx='12' cy='12' r='10' />
                      <path d='M12 6v6l4 2' />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Photos Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='relative group'
            >
              <div className='absolute inset-0 bg-[#D7FF00] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500'></div>
              <div className='relative bg-[#111] rounded-2xl p-8 shadow-2xl hover:shadow-[0_0_40px_rgba(215,255,0,0.1)] transition-all duration-300 h-full'>
                <div className='flex flex-col items-center text-center'>
                  <div className='w-16 h-16 rounded-full bg-[#D7FF00]/10 flex items-center justify-center mb-6 group-hover:bg-[#D7FF00]/20 transition-colors'>
                    <FaCamera className='text-3xl text-[#D7FF00]' />
                  </div>
                  <h3 className='text-2xl font-bold text-white mb-3'>
                    {isPashto ? 'عکسونه' : 'Photos'}
                  </h3>
                  <p className='text-gray-400 mb-4'>
                    {isPashto
                      ? 'زما د سفرونو، شېبو او تخليقي عکاسۍ يو ټولګه.'
                      : 'A collection of moments, travels, and creative photography from my journey.'}
                  </p>
                  <div className='flex items-center gap-2 text-sm text-[#D7FF00] font-semibold'>
                    <span>{isPashto ? 'ژر راځي' : 'Coming Soon'}</span>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      className='animate-pulse'
                    >
                      <circle cx='12' cy='12' r='10' />
                      <path d='M12 6v6l4 2' />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
