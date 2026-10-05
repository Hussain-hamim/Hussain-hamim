import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const ASSETS = `${process.env.PUBLIC_URL}/touch-some-grass`;
const TRACKS = [
  { file: 'meadow-ambience.mp3', volume: 0.3 },
  { file: 'meadow-wind.mp3', volume: 0.18 },
];

export default function MeadowSound() {
  const audioRefs = useRef([]);
  const fadeRef = useRef(0);
  const requestedRef = useRef(false);
  const requestRef = useRef(0);
  const [status, setStatus] = useState('off');
  const active = status === 'playing' || status === 'loading';

  useEffect(() => {
    const recordings = audioRefs.current.slice();
    return () => {
      requestedRef.current = false;
      requestRef.current += 1;
      cancelAnimationFrame(fadeRef.current);
      recordings.forEach(audio => {
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
      });
    };
  }, []);

  const stopRecordings = () => {
    audioRefs.current.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  };

  const fadeTo = (level, duration, onComplete) => {
    cancelAnimationFrame(fadeRef.current);
    const initial = audioRefs.current.map(audio => audio.volume);
    const started = performance.now();
    const step = now => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = progress * progress * (3 - 2 * progress);
      audioRefs.current.forEach((audio, index) => {
        audio.volume = initial[index] + (TRACKS[index].volume * level - initial[index]) * eased;
      });
      if (progress < 1) fadeRef.current = requestAnimationFrame(step);
      else onComplete?.();
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const playbackFailed = () => {
    requestedRef.current = false;
    requestRef.current += 1;
    cancelAnimationFrame(fadeRef.current);
    stopRecordings();
    setStatus('error');
  };

  const toggleSound = async () => {
    const recordings = audioRefs.current;
    const request = ++requestRef.current;
    requestedRef.current = !requestedRef.current;
    if (!requestedRef.current) {
      setStatus('off');
      if (recordings.every(audio => audio.paused) || status === 'loading') {
        cancelAnimationFrame(fadeRef.current);
        stopRecordings();
      } else {
        fadeTo(0, 500, stopRecordings);
      }
      return;
    }

    cancelAnimationFrame(fadeRef.current);
    setStatus('loading');
    try {
      // Start both tracks in the same user gesture; no autoplay or third-party requests.
      const starts = recordings.map((audio, index) => {
        if (!audio.getAttribute('src')) audio.src = `${ASSETS}/${TRACKS[index].file}`;
        if (audio.error) audio.load();
        if (audio.paused) audio.volume = 0;
        return audio.play();
      });
      await Promise.all(starts);
      if (request !== requestRef.current || !requestedRef.current) return;
      setStatus('playing');
      fadeTo(1, 1800);
    } catch {
      if (request === requestRef.current) playbackFailed();
    }
  };

  const label = status === 'error'
    ? 'Retry nature sounds'
    : active ? 'Stop nature sounds' : 'Play nature sounds';

  return (
    <>
      {TRACKS.map((track, index) => (
        <audio
          key={track.file}
          ref={element => { audioRefs.current[index] = element; }}
          loop
          preload='none'
          aria-hidden='true'
          onPause={event => {
            // Ignore a queued pause event from an earlier load or stop operation.
            if (!requestedRef.current || !event.currentTarget.paused) return;
            requestedRef.current = false;
            requestRef.current += 1;
            cancelAnimationFrame(fadeRef.current);
            stopRecordings();
            setStatus('off');
          }}
          onError={playbackFailed}
        />
      ))}
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
