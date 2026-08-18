import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGroup, motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  Eye,
  FolderKanban,
  Mail,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from '../context/themeContext';

const DEFAULT_CAL_BOOKING_URL = 'https://cal.com/hussain-hamim-fp9qc6/30min';
const MotionLink = motion(Link);
const PILL_SPRING = { type: 'spring', stiffness: 360, damping: 32, mass: 0.35 };

const DockTab = ({ active, isDark, icon: Icon, label, className, ...props }) => {
  const Comp = props.to ? MotionLink : motion.button;
  const pillClass = isDark
    ? 'absolute inset-0 z-0 rounded-full border border-white/16 bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_8px_24px_rgba(0,0,0,0.22)]'
    : 'absolute inset-0 z-0 rounded-full border border-white/60 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_rgba(0,0,0,0.08)]';

  return (
    <Comp whileTap={{ scale: 0.97 }} className={`group/btn ${className}`} {...props}>
      {active ? (
        <motion.span
          layoutId='dock-active-pill'
          className={pillClass}
          transition={PILL_SPRING}
        />
      ) : null}
      <motion.span
        className='relative z-10 flex items-center justify-center gap-1.5 sm:gap-2'
        animate={{ y: active ? -1 : 0, opacity: active ? 1 : 0.78 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        <Icon className='h-3.5 w-3.5 shrink-0 transition-transform duration-500 ease-out group-hover/btn:rotate-[360deg] sm:h-4 sm:w-4' />
        {label}
      </motion.span>
    </Comp>
  );
};

const Header = ({ locale = 'en' }) => {
  const isPashto = locale === 'ps';
  const { isDark, toggleTheme, isThemeAnimating } = useTheme();
  const bookingUrl = (
    process.env.REACT_APP_BOOKING_URL || DEFAULT_CAL_BOOKING_URL
  ).trim();
  const [activeSection, setActiveSection] = useState('projects');
  const [isDockHidden, setIsDockHidden] = useState(false);
  const hideTimeoutRef = useRef(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onHome =
      window.location.pathname === '/' || window.location.pathname === '/ps';
    if (!onHome) return;

    const ids = ['experience', 'projects', 'blogs', 'contactme'];
    const nodes = ids
      .map((id) => document.getElementById(`${id}-section`))
      .filter(Boolean);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.id.replace('-section', '');
          setActiveSection(id === 'experience' ? 'projects' : id);
        }
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateDockVisibility = () => {
      const currentScrollY = window.scrollY;

      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }

      if (currentScrollY < 24) {
        setIsDockHidden(false);
      } else {
        setIsDockHidden(true);
        hideTimeoutRef.current = window.setTimeout(() => {
          setIsDockHidden(false);
        }, 560);
      }

      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(updateDockVisibility);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const handleScrollClick = (anchor) => (e) => {
    e.preventDefault();
    const onHome =
      window.location.pathname === '/' || window.location.pathname === '/ps';
    if (!onHome) {
      window.location.href = `${isPashto ? '/ps' : '/'}#${anchor}-section`;
      return;
    }
    const element = document.getElementById(`${anchor}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    {
      id: 'projects',
      label: isPashto ? 'کار' : 'Work',
      type: 'scroll',
      icon: Eye,
    },
    {
      id: 'all-projects',
      label: isPashto ? 'پروژې' : 'Projects',
      type: 'link',
      href: '/projects',
      icon: FolderKanban,
    },
    {
      id: 'blogs',
      label: isPashto ? 'بلاګ' : 'Blogs',
      type: 'scroll',
      icon: BookOpen,
    },
    {
      id: 'contactme',
      label: isPashto ? 'اړیکه' : 'Contact',
      type: 'scroll',
      icon: Mail,
    },
  ];

  const isActive = (item) => {
    if (item.type === 'link') {
      return window.location.pathname.startsWith(item.href);
    }
    return activeSection === item.id;
  };

  const iconBtnClass = isDark
    ? 'group/btn flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/68 transition-colors duration-150 hover:text-white sm:h-11 sm:w-11'
    : 'group/btn flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/55 transition-colors duration-150 hover:text-ink sm:h-11 sm:w-11';
  const dockIconClass =
    'h-4 w-4 transition-transform duration-500 ease-out group-hover/btn:rotate-[360deg] sm:h-5 sm:w-5';

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-50 flex w-full justify-center px-2 transition-transform duration-300 ease-out sm:bottom-6 sm:px-3 ${
        isDockHidden ? 'translate-y-[calc(100%+2rem)]' : 'translate-y-0'
      }`}
      data-site-nav
    >
      <div
        className={`pointer-events-auto relative max-w-[calc(100vw-1rem)] overflow-hidden rounded-full p-1 shadow-[0_18px_60px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl sm:max-w-full sm:p-1.5 ${
          isDark ? 'bg-[rgba(10,12,17,0.42)]' : 'bg-[rgba(245,245,245,0.62)]'
        }`}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 z-0 rounded-full ${
            isDark
              ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.045)_42%,rgba(0,0,0,0.12))]'
              : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.12)_42%,rgba(0,0,0,0.06))]'
          }`}
        />

        <nav
          aria-label='Primary'
          className='relative z-10 flex max-w-full items-center justify-start gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-center sm:gap-1.5 sm:overflow-visible [&::-webkit-scrollbar]:hidden'
        >
          <LayoutGroup id='site-dock'>
            <div className='relative z-10 flex shrink-0 items-center justify-center gap-0.5 sm:gap-1'>
              {navItems.map((item) => {
                const active = isActive(item);
                const className = `relative isolate min-w-[4.35rem] shrink-0 rounded-full px-2 py-2 text-center font-sans3 text-[10px] font-bold uppercase tracking-[0.06em] outline-none focus-visible:ring-1 sm:min-w-[6.5rem] sm:px-5 sm:py-3 sm:text-[13px] sm:tracking-[0.1em] ${
                  isDark
                    ? active
                      ? 'text-white focus-visible:ring-white/30'
                      : 'text-white/70 focus-visible:ring-white/30'
                    : active
                      ? 'text-ink focus-visible:ring-black/20'
                      : 'text-ink/60 focus-visible:ring-black/20'
                }`;

                if (item.type === 'link') {
                  return (
                    <DockTab
                      key={item.id}
                      to={item.href}
                      active={active}
                      isDark={isDark}
                      icon={item.icon}
                      label={item.label}
                      className={className}
                    />
                  );
                }

                return (
                  <DockTab
                    key={item.id}
                    type='button'
                    active={active}
                    isDark={isDark}
                    icon={item.icon}
                    label={item.label}
                    className={className}
                    onClick={handleScrollClick(item.id)}
                  />
                );
              })}
            </div>
          </LayoutGroup>

          <span
            aria-hidden
            className={`h-7 w-px shrink-0 ${
              isDark ? 'bg-white/10' : 'bg-black/10'
            }`}
          />

          <div className='flex shrink-0 items-center gap-0.5 pr-0.5 sm:gap-1 sm:pr-1'>
            <button
              type='button'
              data-theme-toggle
              onClick={toggleTheme}
              disabled={isThemeAnimating}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
              className={`${iconBtnClass} disabled:cursor-wait`}
            >
              {isDark ? (
                <Sun className={dockIconClass} />
              ) : (
                <Moon className={dockIconClass} />
              )}
            </button>
            <a
              href={bookingUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={isPashto ? 'د لیدنې وخت وټاکئ' : 'Book a call'}
              title={isPashto ? 'د لیدنې وخت وټاکئ' : 'Book a call'}
              className={iconBtnClass}
            >
              <Calendar className={dockIconClass} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
