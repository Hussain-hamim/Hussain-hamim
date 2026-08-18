import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { flushSync } from 'react-dom';

const STORAGE_KEY = 'hsn-theme';
const WIPE_MS = 520;
const WIPE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  setTheme: () => {},
  toggleTheme: () => {},
  isThemeAnimating: false,
});

function readStoredTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    /* ignore */
  }
  return 'light';
}

function applyThemeClass(theme) {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
  root.style.colorScheme = theme;
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function originFromEvent(event) {
  const target = event?.currentTarget;
  if (target?.getBoundingClientRect) {
    const box = target.getBoundingClientRect();
    return {
      x: box.left + box.width / 2,
      y: box.top + box.height / 2,
    };
  }
  if (typeof event?.clientX === 'number' && typeof event?.clientY === 'number') {
    return { x: event.clientX, y: event.clientY };
  }
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const initial = readStoredTheme();
    if (typeof document !== 'undefined') applyThemeClass(initial);
    return initial;
  });
  const [isThemeAnimating, setIsThemeAnimating] = useState(false);
  const busyRef = useRef(false);

  useEffect(() => {
    applyThemeClass(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0B1215' : '#CACBCD');
    }
  }, [theme]);

  const commitTheme = useCallback((next) => {
    setThemeState(next === 'dark' ? 'dark' : 'light');
  }, []);

  const runWipe = useCallback(
    async (next, origin) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setIsThemeAnimating(true);

      const finish = () => {
        busyRef.current = false;
        setIsThemeAnimating(false);
      };

      if (prefersReducedMotion() || typeof document.startViewTransition !== 'function') {
        commitTheme(next);
        finish();
        return;
      }

      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? window.innerHeight / 2;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      try {
        const transition = document.startViewTransition(() => {
          flushSync(() => {
            commitTheme(next);
          });
        });
        await transition.ready;
        const animation = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: WIPE_MS,
            easing: WIPE_EASE,
            pseudoElement: '::view-transition-new(root)',
          }
        );
        await animation.finished.catch(() => {});
      } catch {
        commitTheme(next);
      } finally {
        finish();
      }
    },
    [commitTheme]
  );

  const setTheme = useCallback(
    (next, event) => {
      const resolved = next === 'dark' ? 'dark' : 'light';
      if (resolved === theme || busyRef.current) return;
      runWipe(resolved, originFromEvent(event));
    },
    [theme, runWipe]
  );

  const toggleTheme = useCallback(
    (event) => {
      if (busyRef.current) return;
      runWipe(theme === 'dark' ? 'light' : 'dark', originFromEvent(event));
    },
    [theme, runWipe]
  );

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme,
      isThemeAnimating,
    }),
    [theme, setTheme, toggleTheme, isThemeAnimating]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
