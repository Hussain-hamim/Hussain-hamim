import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  const headerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    let prevScrollPos = window.scrollY;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const headerElement = headerRef.current;
      if (!headerElement) return;

      if (prevScrollPos > currentScrollPos) {
        headerElement.style.transform = 'translateY(0)';
      } else {
        headerElement.style.transform = 'translateY(-200px)';
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (anchor) => () => {
    const element = document.getElementById(`${anchor}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  // Animation styles
  const getSnakeAnimation = (index) => ({
    animation: `snakeFadeIn 0.5s ease-out forwards`,
    animationDelay: `${index * 0.1}s`,
    opacity: 0,
  });

  return (
    // <header
    //   ref={headerRef}
    //   className='fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out
    //          bg-gray-900/70 backdrop-blur-xl border-b border-gray-700/40
    //          dark:bg-gray-900/70 dark:border-gray-600/50'
    // >
    <header
      ref={headerRef}
      className='fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out
             bg-white/30 backdrop-blur-xl 
             dark:bg-white/10 dark:border-white/20'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-8 py-3'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-3 md:space-x-6'>
            {/* Social Links with snake animation */}
            <a
              href='/'
              className='flex items-center space-x-3  hover:underline cursor-pointer font-sans1 text-[#D7FF00]'
            >
              HSN
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-white p-2 px-3 rounded-md border-[1px] border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'
              style={isLoaded ? getSnakeAnimation(socials.length) : {}}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className='md:hidden absolute top-16 right-4 w-56 rounded-md shadow-lg bg-gray-800 bg-opacity-95 dark:bg-gray-900 dark:bg-opacity-98 border border-gray-700 z-50'>
              <div className='py-1'>
                {[
                  'skills',
                  'experience',
                  'projects',
                  'mobile-projects',
                  'certificates',
                  'contactme',
                ].map((item, index) => (
                  <button
                    key={item}
                    onClick={handleClick(item)}
                    className='block w-full text-left px-4 py-2 text-white hover:bg-gray-700 hover:text-teal-300 dark:hover:text-teal-200 transition-all duration-200'
                    style={isLoaded ? getSnakeAnimation(index) : {}}
                  >
                    {item.charAt(0).toUpperCase() +
                      item.slice(1).replace(/([A-Z])/g, ' $1')}
                  </button>
                ))}
                <a
                  href='https://github.com/Hussain-hamim/Hussain-hamim/releases/download/v1.0.0/Hussain-resume.pdf'
                  className='block px-4 py-2 text-teal-300 hover:bg-teal-900 hover:bg-opacity-20 transition-all duration-200 dark:text-teal-200'
                  style={isLoaded ? getSnakeAnimation(5) : {}}
                >
                  Download Resume
                </a>
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-4'>
            {[
              'skills',
              'experience',
              'projects',
              'mobile-projects',
              'certificates',
              'contactme',
            ].map((item, index) => (
              <button
                key={item}
                onClick={handleClick(item)}
                className='text-white px-3 py-2 rounded hover:text-teal-400 dark:hover:text-teal-200 hover:-translate-y-0.5 transition-all duration-200'
                style={isLoaded ? getSnakeAnimation(index) : {}}
              >
                <span className=' hover:underline'>
                  {item.charAt(0).toUpperCase() +
                    item.slice(1).replace(/([A-Z])/g, ' $1')}
                </span>
              </button>
            ))}
            <a
              href='https://github.com/Hussain-hamim/Hussain-hamim/releases/download/v1.0.0/Hussain-resume.pdf'
              className='text-teal-300 border border-teal-300 px-4 py-2 rounded hover:bg-teal-300 hover:text-black hover:-translate-y-0.5 transition-all duration-200 dark:text-teal-200 dark:border-teal-200 dark:hover:bg-teal-200 dark:hover:text-gray-900'
              style={isLoaded ? getSnakeAnimation(5) : {}}
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* Add the keyframes to the document */}
      <style jsx global>{`
        @keyframes snakeFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
};

const socials = [
  { icon: faEnvelope, url: 'mailto: mohammadhussainafghan83@gmail.com' },
  { icon: faGithub, url: 'https://github.com/Hussain-hamim' },
  { icon: faLinkedin, url: 'https://www.linkedin.com/in/hussain-hamim/' },
  { icon: faTwitter, url: 'https://twitter.com/hussainhamim_' },
  { icon: faInstagram, url: 'https://www.instagram.com/hussainhamim_' },
];

export default Header;
