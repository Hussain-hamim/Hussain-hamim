import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink } from 'lucide-react';
export default function HeroProjectLink({ project, className }) {
  const linkRef = useRef(null);
  const closeTimer = useRef(null);
  const [position, setPosition] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const close = () => {
    clearTimeout(closeTimer.current);
    setPosition(null);
  };
  const keepOpen = () => clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    keepOpen();
    closeTimer.current = setTimeout(() => setPosition(null), 600);
  };
  const open = () => {
    keepOpen();
    if (!position) setLoaded(false);
    const rect = linkRef.current.getBoundingClientRect();
    const width = Math.min(360, window.innerWidth - 32);
    const height = width * 0.625 + 42 + 16;
    const above = rect.top > height + 24;
    setPosition({
      width,
      left: Math.max(16, Math.min(rect.left, window.innerWidth - width - 16)),
      top: above ? rect.top - height : rect.bottom,
      paddingTop: above ? 0 : 16,
      paddingBottom: above ? 16 : 0,
    });
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);
  useEffect(() => {
    if (!position) return undefined;
    const dismiss = () => setPosition(null);
    const onKey = (event) => {
      if (event.key === 'Escape') dismiss();
    };
    const reposition = () => {
      const rect = linkRef.current.getBoundingClientRect();
      const height = position.width * 0.625 + 58;
      const above = rect.top > height + 24;
      setPosition({
        width: position.width,
        left: Math.max(16, Math.min(rect.left, window.innerWidth - position.width - 16)),
        top: above ? rect.top - height : rect.bottom,
        paddingTop: above ? 0 : 16,
        paddingBottom: above ? 16 : 0,
      });
    };
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', dismiss);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', dismiss);
      window.removeEventListener('keydown', onKey);
    };
  }, [position]);

  return (
    <>
      <a
        ref={linkRef}
        href={project.live}
        target='_blank'
        rel='noopener noreferrer'
        className={className}
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
        onFocus={open}
        onBlur={scheduleClose}
      >
        {project.title}
      </a>
      {position && createPortal(
        <a
          href={project.live}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`Visit ${project.title}`}
          onMouseEnter={keepOpen}
          onMouseLeave={scheduleClose}
          onFocus={keepOpen}
          onBlur={close}
          style={position}
          className='fixed z-[100] text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
        >
          <span className='block overflow-hidden rounded-xl border border-line bg-surface shadow-2xl'>
          <span className='flex h-[42px] items-center justify-between px-3 font-sans3 text-xs font-medium'>
            <span>{project.title}</span>
            <ExternalLink className='h-3.5 w-3.5 text-ink-muted' strokeWidth={1.75} aria-hidden='true' />
          </span>
          <span className='relative block aspect-[8/5] w-full overflow-hidden bg-panel'>
            {!loaded && (
              <span role='status' className='absolute inset-0 flex items-center justify-center font-sans3 text-xs text-ink-muted'>
                Loading live preview…
              </span>
            )}
            <iframe
              src={project.live}
              title={`${project.title} live website preview`}
              sandbox='allow-scripts allow-same-origin'
              tabIndex={-1}
              loading='eager'
              onLoad={() => setLoaded(true)}
              style={{ width: '1024px', height: '640px', transform: `scale(${position.width / 1024})` }}
              className={`pointer-events-none absolute left-0 top-0 origin-top-left border-0 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </span>
          </span>
        </a>,
        document.body
      )}
    </>
  );
}
