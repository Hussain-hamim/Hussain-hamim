import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Menu, Moon, Sun, X } from 'lucide-react';
import Button from './Button';
import { useTheme } from '../context/themeContext';

const DEFAULT_CAL_BOOKING_URL = 'https://cal.com/hussain-hamim-fp9qc6/30min';

const Header = ({ locale = 'en' }) => {
  const isPashto = locale === 'ps';
  const location = useLocation();
  const onHome = location.pathname === '/' || location.pathname === '/ps';
  const { isDark, toggleTheme, isThemeAnimating } = useTheme();
  const bookingUrl = (
    process.env.REACT_APP_BOOKING_URL || DEFAULT_CAL_BOOKING_URL
  ).trim();
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let prevScrollPos = window.scrollY;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const headerElement = headerRef.current;
      if (!headerElement) return;

      setScrolled(currentScrollPos > 50);

      if (prevScrollPos > currentScrollPos || currentScrollPos < 80) {
        headerElement.style.transform = 'translateY(0)';
      } else if (currentScrollPos > 100 && !isMenuOpen) {
        headerElement.style.transform = 'translateY(-100%)';
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!onHome) return undefined;

    const ids = ['experience', 'projects', 'contactme'];
    const nodes = ids
      .map((id) => document.getElementById(`${id}-section`))
      .filter(Boolean);
    if (nodes.length === 0) return undefined;

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
  }, [onHome]);

  const homePath = isPashto ? '/ps' : '/';

  const handleLogoClick = (e) => {
    if (!onHome) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleScrollClick = (anchor) => (e) => {
    setIsMenuOpen(false);
    if (!onHome) return;
    e.preventDefault();
    const element = document.getElementById(`${anchor}-section`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navItems = [
    {
      id: 'projects',
      label: isPashto ? 'کار' : 'Work',
      type: 'scroll',
    },
    {
      id: 'all-projects',
      label: isPashto ? 'پروژې' : 'Projects',
      type: 'link',
      href: '/projects',
    },
    {
      id: 'blogs',
      label: isPashto ? 'بلاګ' : 'Blogs',
      type: 'link',
      href: '/blogs',
    },
    {
      id: 'contactme',
      label: isPashto ? 'اړیکه' : 'Contact',
      type: 'scroll',
    },
  ];

  const isActive = (item) => {
    if (item.type === 'link') return location.pathname.startsWith(item.href);
    if (!onHome) return false;
    return activeSection === item.id;
  };

  const headerBarSolid = scrolled || isMenuOpen;
  const useLightNav = !isDark;

  const themeToggleBtn = (
    <button
      type='button'
      data-theme-toggle
      onClick={toggleTheme}
      disabled={isThemeAnimating}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`group/theme inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 disabled:cursor-wait ${
        useLightNav
          ? 'border-black/15 text-[#0a0a0a] hover:border-black/30 hover:bg-black/[0.04]'
          : headerBarSolid
            ? 'border-white/15 text-gray-300 hover:border-white/30 hover:bg-white/5 hover:text-white'
            : 'border-white/25 text-white hover:border-white/45 hover:bg-white/10'
      }`}
    >
      {isDark ? (
        <Sun className='h-4 w-4 transition-transform duration-500 ease-out group-hover/theme:rotate-[360deg]' />
      ) : (
        <Moon className='h-4 w-4 transition-transform duration-500 ease-out group-hover/theme:rotate-[360deg]' />
      )}
    </button>
  );

  const navClass = (active) =>
    `relative px-3 py-1.5 text-sm font-medium uppercase tracking-wider transition-all duration-300 group ${
      useLightNav
        ? active
          ? 'text-[#0a0a0a]'
          : 'text-gray-600 hover:text-[#0a0a0a]'
        : headerBarSolid
          ? active
            ? 'text-white'
            : 'text-gray-400 hover:text-white'
          : active
            ? 'text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]'
            : 'text-white/80 hover:text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]'
    }`;

  const renderNavItem = (item, { mobile = false } = {}) => {
    const active = isActive(item);
    if (mobile) {
      const cls = `relative flex w-full items-center ${
        isPashto ? 'justify-end' : 'justify-start'
      } rounded-lg px-2 py-3 text-lg font-medium transition-all duration-300 ${
        useLightNav
          ? active
            ? 'bg-black/[0.05] text-[#0a0a0a]'
            : 'text-gray-600 hover:bg-black/[0.03] hover:text-[#0a0a0a]'
          : active
            ? 'bg-[#D7FF00]/5 text-[#D7FF00]'
            : 'text-gray-300 hover:bg-white/[0.03] hover:text-[#D7FF00]'
      }`;
      const content = <span className='relative z-10'>{item.label}</span>;
      if (item.type === 'link') {
        return (
          <Link
            key={item.id}
            to={item.href}
            onClick={() => setIsMenuOpen(false)}
            className={cls}
          >
            {content}
          </Link>
        );
      }
      return (
        <Link
          key={item.id}
          to={`${homePath}#${item.id}-section`}
          onClick={handleScrollClick(item.id)}
          className={cls}
        >
          {content}
        </Link>
      );
    }

    const cls = navClass(active);
    const inner = (
      <>
        <span className='relative z-10'>{item.label}</span>
        <span
          className={`absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
            useLightNav
              ? 'bg-black/[0.04]'
              : headerBarSolid
                ? 'bg-white/5'
                : 'bg-white/10'
          }`}
        />
        <span
          className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 transition-all duration-300 ${
            useLightNav
              ? 'bg-[#0a0a0a]'
              : headerBarSolid
                ? 'bg-[#D7FF00]'
                : 'bg-white'
          } ${active ? 'w-3/4' : 'w-0 group-hover:w-3/4'}`}
        />
      </>
    );

    if (item.type === 'link') {
      return (
        <Link key={item.id} to={item.href} className={cls}>
          {inner}
        </Link>
      );
    }

    return (
      <Link
        key={item.id}
        to={`${homePath}#${item.id}-section`}
        onClick={handleScrollClick(item.id)}
        className={cls}
      >
        {inner}
      </Link>
    );
  };

  return (
    <header
      ref={headerRef}
      data-site-nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-in-out ${
        isMenuOpen
          ? useLightNav
            ? 'border-b border-black/10 bg-white/95 backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/90'
            : 'border-b border-white/15 bg-black/45 backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-black/35'
          : scrolled
            ? useLightNav
              ? 'border-b border-black/10 bg-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/35'
              : 'border-b border-white/10 bg-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-black/25'
            : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className='mx-auto max-w-7xl py-3.5 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:py-3 sm:pl-6 sm:pr-6 md:px-8'>
        <div className='flex min-h-[44px] items-center justify-between gap-3'>
          <Link
            to={homePath}
            onClick={handleLogoClick}
            className={`group relative min-w-0 shrink font-sans1 text-lg font-bold tracking-tight transition-all duration-300 sm:text-xl ${
              useLightNav
                ? 'text-[#0a0a0a] hover:text-[#0a0a0a]/70'
                : headerBarSolid
                  ? 'text-[#D7FF00] hover:text-white'
                  : 'text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] hover:text-white/85'
            }`}
          >
            <span className='relative z-10'>HSN.</span>
            <span
              className={`absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${
                useLightNav
                  ? 'bg-[#0a0a0a]'
                  : headerBarSolid
                    ? 'bg-[#D7FF00]'
                    : 'bg-white'
              }`}
            />
          </Link>

          <nav className='hidden items-center gap-1 md:flex'>
            {navItems.map((item) => renderNavItem(item))}
            <Button
              href={bookingUrl}
              target='_blank'
              rel='noopener noreferrer'
              size='sm'
              className='ml-4'
              icon={<Calendar />}
            >
              {isPashto ? 'د لیدنې وخت وټاکئ' : 'Book a call'}
            </Button>
            <div className='ml-2'>{themeToggleBtn}</div>
          </nav>

          <div className='flex items-center gap-1.5 md:hidden'>
            {themeToggleBtn}
            <button
              type='button'
              onClick={() => setIsMenuOpen((open) => !open)}
              className={`-mr-1 relative z-50 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors ${
                useLightNav
                  ? 'text-[#0a0a0a] hover:text-[#0a0a0a]/70'
                  : headerBarSolid
                    ? 'text-gray-400 hover:text-white'
                    : 'text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] hover:text-white/85'
              }`}
              aria-label='Toggle menu'
            >
              {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute left-0 right-0 top-full overflow-hidden border-b transition-all duration-500 ease-in-out md:hidden ${
          useLightNav
            ? 'border-black/10 bg-white/95 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/90'
            : 'border-white/10 bg-black/95 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/90'
        } ${isMenuOpen ? 'max-h-[640px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className='px-6 py-6'>
          <nav className='space-y-1'>
            {navItems.map((item) => renderNavItem(item, { mobile: true }))}
          </nav>
          <div
            className={`mt-4 border-t pt-6 ${
              useLightNav ? 'border-black/10' : 'border-white/10'
            }`}
          >
            <Button
              href={bookingUrl}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => setIsMenuOpen(false)}
              fullWidth
              icon={<Calendar />}
            >
              {isPashto ? 'د لیدنې وخت وټاکئ' : 'Book a call'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
