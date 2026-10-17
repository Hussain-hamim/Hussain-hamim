const deferredContent = new Map();
let currentNavigation;

export function registerDeferredContent(element, reveal) {
  deferredContent.set(element, reveal);
  return () => deferredContent.delete(element);
}

function waitForTarget(id, signal) {
  const existing = document.getElementById(id);
  if (existing || signal.aborted) return Promise.resolve(existing);
  return new Promise((resolve) => {
    const finish = (element) => {
      observer.disconnect();
      signal.removeEventListener('abort', cancel);
      resolve(element);
    };
    const cancel = () => finish(null);
    const observer = new MutationObserver(() => {
      const element = document.getElementById(id);
      if (element) finish(element);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    signal.addEventListener('abort', cancel, { once: true });
  });
}

function nextFrame(signal) {
  return new Promise((resolve) => {
    const cancel = () => { cancelAnimationFrame(frame); resolve(); };
    const frame = requestAnimationFrame(() => {
      signal.removeEventListener('abort', cancel);
      resolve();
    });
    signal.addEventListener('abort', cancel, { once: true });
  });
}

// Wait for real content, including deferred regions above the destination, before
// measuring the final scroll position. A newer navigation cancels the old one.
export async function scrollToSection(anchor, { signal } = {}) {
  currentNavigation?.abort();
  const navigation = new AbortController();
  currentNavigation = navigation;
  const cancel = () => navigation.abort();
  signal?.addEventListener('abort', cancel, { once: true });
  if (signal?.aborted) navigation.abort();
  const name = anchor.replace(/^#/, '');
  const id = name.endsWith('-section') ? name : `${name}-section`;
  try {
    const target = await waitForTarget(id, navigation.signal);
    if (!target || navigation.signal.aborted) return;
    const revealed = new Set();
    while (!navigation.signal.aborted) {
      const pending = [...deferredContent].filter(([element]) =>
        element.isConnected && !revealed.has(element) && (
          element.contains(target) || target.contains(element) ||
          (element.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING)
        )
      );
      if (!pending.length) break;
      await Promise.race([
        Promise.all(pending.map(([element, reveal]) => { revealed.add(element); return reveal(); })),
        new Promise(resolve => navigation.signal.addEventListener('abort', resolve, { once: true })),
      ]);
      if (!navigation.signal.aborted) await nextFrame(navigation.signal);
    }
    if (!navigation.signal.aborted && target.isConnected) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } finally {
    signal?.removeEventListener('abort', cancel);
    navigation.abort();
    if (currentNavigation === navigation) currentNavigation = null;
  }
}
