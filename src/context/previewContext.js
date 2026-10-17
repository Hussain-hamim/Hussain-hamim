import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';

const PreviewContext = createContext(null);
const MAX_ACTIVE_PREVIEWS = 2;

function updateQueue(state, { type, id }) {
  switch (type) {
    case 'request':
      if (state.waiting.includes(id) || state.active.some((preview) => preview.id === id)) return state;
      return { ...state, waiting: [...state.waiting, id] };
    case 'release':
      if (!state.waiting.includes(id) && !state.active.some((preview) => preview.id === id)) return state;
      return {
        waiting: state.waiting.filter((previewId) => previewId !== id),
        active: state.active.filter((preview) => preview.id !== id),
      };
    case 'start':
      if (!state.waiting.includes(id) || state.active.length >= MAX_ACTIVE_PREVIEWS || state.active.some((preview) => !preview.loaded)) return state;
      return {
        waiting: state.waiting.filter((previewId) => previewId !== id),
        active: [...state.active, { id, loaded: false }],
      };
    case 'start-now': {
      if (state.active.some((preview) => preview.id === id)) return state;
      // A click skips automatic delays, but still keeps the active-site limit.
      const displaced = state.active.length >= MAX_ACTIVE_PREVIEWS ? state.active[0] : null;
      const waiting = state.waiting.filter((previewId) => previewId !== id);
      return {
        waiting: displaced ? [...waiting, displaced.id] : waiting,
        active: [
          ...state.active.filter((preview) => preview.id !== displaced?.id),
          { id, loaded: false },
        ],
      };
    }
    case 'loaded':
      if (!state.active.some((preview) => preview.id === id && !preview.loaded)) return state;
      return {
        ...state,
        active: state.active.map((preview) => preview.id === id ? { ...preview, loaded: true } : preview),
      };
    default:
      return state;
  }
}

function scheduleWhenIdle(callback, delay = 0) {
  let idleId;
  let cancelled = false;
  const run = () => {
    if (!cancelled) callback();
  };
  const timer = window.setTimeout(() => {
    if (window.requestIdleCallback) {
      idleId = window.requestIdleCallback(run, { timeout: 1200 });
    } else {
      run();
    }
  }, delay);
  return () => {
    cancelled = true;
    window.clearTimeout(timer);
    if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
  };
}

export function ProjectPreviewProvider({ children }) {
  const [pageReady, setPageReady] = useState(false);
  const [queue, dispatch] = useReducer(updateQueue, { waiting: [], active: [] });
  const requestPreview = useCallback((id) => dispatch({ type: 'request', id }), []);
  const releasePreview = useCallback((id) => dispatch({ type: 'release', id }), []);
  const previewLoaded = useCallback((id) => dispatch({ type: 'loaded', id }), []);
  const playPreviewNow = useCallback((id) => dispatch({ type: 'start-now', id }), []);

  // Let the portfolio's own images, fonts and scripts finish before starting sites.
  useEffect(() => {
    let cancelIdle;
    const ready = () => {
      cancelIdle = scheduleWhenIdle(() => setPageReady(true));
    };
    if (document.readyState === 'complete') ready();
    else window.addEventListener('load', ready, { once: true });
    return () => {
      window.removeEventListener('load', ready);
      cancelIdle?.();
    };
  }, []);

  useEffect(() => {
    if (!pageReady || !queue.waiting.length || queue.active.length >= MAX_ACTIVE_PREVIEWS || queue.active.some((preview) => !preview.loaded)) return undefined;
    // A short dwell avoids loading cards the visitor quickly scrolls past.
    return scheduleWhenIdle(() => {
      if (!document.hidden) dispatch({ type: 'start', id: queue.waiting[0] });
    }, 200);
  }, [pageReady, queue]);

  const value = useMemo(
    () => ({
      activeIds: queue.active.map((preview) => preview.id),
      loadedIds: queue.active.filter((preview) => preview.loaded).map((preview) => preview.id),
      requestPreview,
      releasePreview,
      previewLoaded,
      playPreviewNow,
    }),
    [queue.active, requestPreview, releasePreview, previewLoaded, playPreviewNow]
  );

  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>;
}

export function useProjectPreview() {
  return useContext(PreviewContext);
}
