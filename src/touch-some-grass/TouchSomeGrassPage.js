import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MeadowCanvas from './MeadowCanvas';
import MeadowSound from './MeadowSound';
import './TouchSomeGrass.css';

const ASSETS = `${process.env.PUBLIC_URL}/touch-some-grass`;

function Butterfly({ variant }) {
  return (
    <span className={`meadow__flight meadow__flight--${variant}`}>
      <span className='meadow__butterfly'>
        <span className='meadow__wing meadow__wing--left'>
          <img src={`${ASSETS}/butterfly.png`} alt='' draggable='false' />
        </span>
        <span className='meadow__wing meadow__wing--right'>
          <img src={`${ASSETS}/butterfly.png`} alt='' draggable='false' />
        </span>
      </span>
    </span>
  );
}

export default function TouchSomeGrassPage() {
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [userPaused, setUserPaused] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const paused = reducedMotion || userPaused || hidden;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Touch some grass';
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = event => setReducedMotion(event.matches);
    const updateVisibility = () => setHidden(document.hidden);
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      document.title = previousTitle;
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  return (
    <main className='meadow' data-paused={paused} data-ready={ready}>
      <Link className='meadow__back' to='/'>
        ← Go lockin
      </Link>
      <MeadowSound />
      <img
        className='meadow__landscape'
        src={`${ASSETS}/landscape.webp`}
        alt='A peaceful alpine valley at sunset, with a little cabin, green meadows and wildflowers.'
        fetchpriority='high'
        decoding='async'
        onLoad={onReady}
      />
      {!reducedMotion && <MeadowCanvas src={`${ASSETS}/landscape.webp`} paused={paused} onReady={onReady} />}
      {!reducedMotion && (
        <div className='meadow__wildlife' aria-hidden='true'>
          <Butterfly variant='near' />
          <Butterfly variant='far' />
          {[0, 1, 2, 3].map(index => (
            <span className={`meadow__drift meadow__drift--${index}`} key={index}>
              <img className='meadow__leaf' src={`${ASSETS}/leaf.png`} alt='' draggable='false' />
            </span>
          ))}
        </div>
      )}
      <button
        className='meadow__pause'
        type='button'
        aria-label={paused ? 'Resume meadow animation' : 'Pause meadow animation'}
        aria-pressed={userPaused}
        disabled={reducedMotion}
        onClick={() => setUserPaused(value => !value)}
      />
    </main>
  );
}
