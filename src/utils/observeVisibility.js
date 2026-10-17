// Effects should run only while both their element and the page are visible.
export default function observeVisibility(element, onChange, { minimumRatio = 0 } = {}) {
  let disposed = false;
  let inView = typeof IntersectionObserver === 'undefined';
  let lastVisible;
  const update = () => {
    if (disposed) return;
    const visible = inView && !document.hidden;
    if (visible !== lastVisible) {
      lastVisible = visible;
      onChange(visible);
    }
  };
  const observer = typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting && (entry.intersectionRatio ?? 1) >= minimumRatio;
        update();
      }, { threshold: minimumRatio })
    : null;

  observer?.observe(element);
  document.addEventListener('visibilitychange', update);
  update();

  return () => {
    disposed = true;
    observer?.disconnect();
    document.removeEventListener('visibilitychange', update);
  };
}
