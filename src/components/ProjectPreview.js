import { useEffect, useId, useRef } from 'react';
import { Play } from 'lucide-react';
import { useProjectPreview } from '../context/previewContext';
import observeVisibility from '../utils/observeVisibility';

function LiveFrame({ id, url, title, large, loaded }) {
  const { releasePreview, previewLoaded } = useProjectPreview();

  useEffect(() => {
    if (loaded) return undefined;
    // Keep the cover and allow another attempt if a remote site never loads.
    const timer = window.setTimeout(() => releasePreview(id), 20000);
    return () => window.clearTimeout(timer);
  }, [id, loaded, releasePreview]);

  return (
    <iframe
      src={url}
      title={`${title} live preview`}
      className={`pointer-events-none absolute inset-0 h-[285.714286%] w-[285.714286%] origin-top-left scale-[0.35] border-0 transition-opacity duration-300 motion-reduce:transition-none ${
        large ? 'md:h-[133.333333%] md:w-[133.333333%] md:scale-[0.75]' : ''
      } ${loaded ? 'opacity-100' : 'opacity-0'}`}
      loading='eager'
      sandbox='allow-scripts allow-same-origin'
      tabIndex={-1}
      onLoad={() => previewLoaded(id)}
    />
  );
}

export default function ProjectPreview({
  url,
  title,
  poster,
  posterSrcSet,
  posterSizes,
  large = false,
  posterLoading = 'lazy',
  posterPriority,
}) {
  const id = useId();
  const containerRef = useRef(null);
  const { activeIds, loadedIds, requestPreview, releasePreview, playPreviewNow } = useProjectPreview();
  const active = activeIds.includes(id);
  const loaded = loadedIds.includes(id);

  useEffect(() => {
    const disconnect = observeVisibility(containerRef.current, (visible) => {
      if (visible) requestPreview(id);
      else releasePreview(id);
    }, { minimumRatio: 0.15 });
    return () => {
      disconnect();
      releasePreview(id);
    };
  }, [id, url, requestPreview, releasePreview]);

  return (
    <div ref={containerRef} className='absolute inset-0 overflow-hidden bg-panel'>
      <img
        src={poster}
        srcSet={posterSrcSet}
        sizes={posterSizes}
        alt={title}
        className='absolute inset-0 h-full w-full object-cover object-top'
        loading={posterLoading}
        fetchpriority={posterPriority}
        decoding='async'
      />
      {active ? (
        <LiveFrame
          key={url}
          id={id}
          url={url}
          title={title}
          large={large}
          loaded={loaded}
        />
      ) : null}
      {!loaded ? (
        <button
          type='button'
          onClick={() => playPreviewNow(id)}
          aria-label={`Play live preview of ${title} now`}
          className='absolute bottom-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7FF00]'
        >
          <Play className='h-3 w-3 shrink-0 fill-current text-[#D7FF00]' aria-hidden='true' />
        </button>
      ) : null}
    </div>
  );
}
