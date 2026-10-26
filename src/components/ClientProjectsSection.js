import { useEffect, useRef } from 'react';
import './ClientProjectsSection.css';
import { scrollToSection } from '../utils/sectionNavigation';

// Public links are optional; private projects remain unlinked.
const CLIENT_PROJECTS = [
  {
    name: 'Royal Pawz USA',
    category: 'Pet care · Mobile app & website',
    description: 'Contributed to both the mobile app and website for a dog and cat grooming service in Houston, Texas.',
    image: '/images/client-projects/royal-pawz-cover.svg',
    imageAlt: 'Royal Pawz concept cover in cream, royal blue, and yellow, with the Royal Pawz logo on the right',
    url: 'https://www.royalpawzusa.com/',
  },
  {
    name: 'Creatify',
    category: 'Creative tools · Web app',
    description: 'A creative workspace for pitch decks, moodboards, video reviews, contracts, and production timelines.',
    image: '/images/client-projects/creatify-cover.svg',
    imageAlt: 'Creatify concept cover with its logo, blue accents, and the supplied all-in-one platform artwork',
    url: 'https://creatifyhub-beta.vercel.app/',
  },
  {
    name: 'FG Kiosk & Restaurant',
    category: 'Restaurant · Online ordering',
    description: 'A restaurant website with an interactive menu, delivery and pickup ordering for a local favourite in Thayngen, Switzerland.',
    image: '/images/client-projects/fg-restaurant-cover.svg',
    imageAlt: 'FG Kiosk restaurant concept cover in warm cream and terracotta, with a pizza menu preview',
    url: 'https://www.fg-restaurant.com/',
  },
  {
    name: 'Fahim Group',
    category: 'Retail & wholesale · E-commerce',
    description: 'An online storefront for groceries and everyday essentials, serving homes and businesses across Switzerland.',
    image: '/images/client-projects/fahim-group-cover.svg',
    imageAlt: 'Fahim Group concept storefront in forest green and cream, with a grocery shopping bag',
    url: 'https://www.fahimgroup.co/',
  },
  {
    name: 'Radefy Sarafi Online',
    category: 'Currency exchange · Web app',
    image: '/images/client-projects/radefy-cover.svg',
    imageAlt: 'Radefy concept cover with a currency exchange interface in midnight blue and mint',
  },
];

export default function ClientProjectsSection() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const viewport = scrollRef.current;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    let previousTime;
    let resumeAt = 0;
    let pointerDown = false;
    let hovered = false;
    let focused = false;
    let position = viewport.scrollLeft;

    const interact = () => { resumeAt = performance.now() + 2000; };
    const start = () => { pointerDown = true; interact(); };
    const end = () => { pointerDown = false; interact(); };
    const enter = event => { if (event.pointerType === 'mouse') hovered = true; };
    const leave = () => { hovered = false; };
    const focus = () => { focused = true; };
    const blur = event => { focused = viewport.contains(event.relatedTarget); interact(); };

    const tick = time => {
      const elapsed = previousTime === undefined ? 0 : Math.min(time - previousTime, 50);
      previousTime = time;
      if (!motionPreference.matches && !pointerDown && !hovered && !focused && time >= resumeAt) {
        const groupWidth = viewport.firstElementChild.firstElementChild.offsetWidth;
        position += elapsed * 0.035;
        if (groupWidth > 0 && position >= groupWidth) position %= groupWidth;
        viewport.scrollLeft = position;
      } else {
        position = viewport.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };

    // Native scrolling preserves touch momentum and horizontal trackpad gestures.
    viewport.addEventListener('wheel', interact, { passive: true });
    viewport.addEventListener('touchmove', interact, { passive: true });
    viewport.addEventListener('pointerdown', start);
    viewport.addEventListener('pointerenter', enter);
    viewport.addEventListener('pointerleave', leave);
    viewport.addEventListener('keydown', interact);
    viewport.addEventListener('focusin', focus);
    viewport.addEventListener('focusout', blur);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener('wheel', interact);
      viewport.removeEventListener('touchmove', interact);
      viewport.removeEventListener('pointerdown', start);
      viewport.removeEventListener('pointerenter', enter);
      viewport.removeEventListener('pointerleave', leave);
      viewport.removeEventListener('keydown', interact);
      viewport.removeEventListener('focusin', focus);
      viewport.removeEventListener('focusout', blur);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
    };
  }, []);

  return (
    <section id='client-projects' className='client-projects bg-surface-alt py-12 text-ink md:py-16' aria-labelledby='client-projects-heading'>
      <div className='mx-auto mb-8 max-w-4xl px-4 md:px-8'>
        <div>
          <h2 id='client-projects-heading' className='text-2xl font-medium tracking-tight'>
            Client <span className='text-ink-muted'>projects</span>
          </h2>
        </div>
      </div>
      <div ref={scrollRef} className='client-projects-window' tabIndex={0} role='region' aria-label='Client projects — swipe or scroll horizontally to browse' dir='ltr'>
        <div className='client-projects-track'>
          {[0, 1].map(copy => (
            <div className='client-projects-group' key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
              {CLIENT_PROJECTS.map(project => {
                const Card = project.url ? 'a' : 'article';
                return (
                <Card className='client-project-card' key={project.name}
                  {...(project.url ? { href: project.url, target: '_blank', rel: 'noopener noreferrer', tabIndex: copy === 1 ? -1 : undefined, 'aria-label': `${project.name} — visit website (opens in a new tab)` } : {})}>
                  <div className='client-project-preview'>
                    <img src={project.image} alt={project.imageAlt || `${project.name} demo website preview`} width='720' height='500' loading='lazy' />
                  </div>
                  <div className='client-project-caption'>
                    <h3>{project.name}{project.url ? <span aria-hidden='true'> ↗</span> : null}</h3>
                    <p className='client-project-category'>{project.category}</p>
                  </div>
                </Card>
                );
              })}
              <a
                className='client-project-card client-project-card--cta'
                href='#contactme-section'
                tabIndex={copy === 1 ? -1 : undefined}
                onClick={event => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  scrollToSection('contactme');
                }}
              >
                <span className='client-project-cta-plus' aria-hidden='true'>+</span>
                <span className='client-project-cta-eyebrow'>Up next</span>
                <h3>Your project here.</h3>
                <p>Have an idea in mind?<br />Let’s bring it to life.</p>
                <span className='client-project-cta-link'>Let’s talk <span aria-hidden='true'>↗</span></span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
