import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AMBIENCE = `${process.env.PUBLIC_URL}/touch-some-grass/meadow-ambience.mp3`;
const VOLUME = 0.3;

export default function MeadowSound() {
  const audioRef = useRef(null);
  const fadeRef = useRef(0);
  const requestedRef = useRef(false);
  const requestRef = useRef(0);
  const [status, setStatus] = useState('off');
  const active = status === 'playing' || status === 'loading';

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      requestedRef.current = false;
      requestRef.current += 1;
      cancelAnimationFrame(fadeRef.current);
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    };
  }, []);

  const fadeTo = (target, duration, onComplete) => {
    cancelAnimationFrame(fadeRef.current);
    const audio = audioRef.current;
    const initial = audio.volume;
    const started = performance.now();
    const step = now => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = progress * progress * (3 - 2 * progress);
      audio.volume = initial + (target - initial) * eased;
      if (progress < 1) fadeRef.current = requestAnimationFrame(step);
      else onComplete?.();
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const toggleSound = async () => {
    const audio = audioRef.current;
    const request = ++requestRef.current;
    requestedRef.current = !requestedRef.current;
    if (!requestedRef.current) {
      setStatus('off');
      // Cancel a pending download/play immediately; fade out established playback.
      if (audio.paused || status === 'loading') {
        cancelAnimationFrame(fadeRef.current);
        audio.pause();
        audio.currentTime = 0;
      } else {
        fadeTo(0, 500, () => {
          audio.pause();
          audio.currentTime = 0;
        });
      }
      return;
    }

    cancelAnimationFrame(fadeRef.current);
    setStatus('loading');
    if (!audio.getAttribute('src')) audio.src = AMBIENCE;
    if (audio.error) audio.load();
    if (audio.paused) audio.volume = 0;
    try {
      // Invoked directly by a click/keyboard gesture to work with autoplay policies.
      await audio.play();
      if (request !== requestRef.current || !requestedRef.current) return;
      setStatus('playing');
      fadeTo(VOLUME, 1800);
    } catch {
      if (request !== requestRef.current) return;
      requestedRef.current = false;
      setStatus('error');
    }
  };

  const label = status === 'error'
    ? 'Retry nature sounds'
    : active ? 'Stop nature sounds' : 'Play nature sounds';

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload='none'
        aria-hidden='true'
        onPause={() => {
          if (!requestedRef.current) return;
          requestedRef.current = false;
          requestRef.current += 1;
          cancelAnimationFrame(fadeRef.current);
          setStatus('off');
        }}
        onError={() => {
          requestedRef.current = false;
          requestRef.current += 1;
          cancelAnimationFrame(fadeRef.current);
          setStatus('error');
        }}
      />
      <button
        type='button'
        className='meadow__sound'
        onClick={toggleSound}
        aria-label={label}
        aria-pressed={active}
        title={status === 'error' ? 'Sound could not load. Click to try again.' : label}
        data-playing={status === 'playing'}
      >
        {active ? <Volume2 size={17} strokeWidth={1.6} aria-hidden='true' /> : <VolumeX size={17} strokeWidth={1.6} aria-hidden='true' />}
        <span aria-live='polite'>
          {status === 'loading' ? 'Loading…' : status === 'error' ? 'Try sound' : active ? 'Sound on' : 'Sound off'}
        </span>
      </button>
    </>
  );
}
