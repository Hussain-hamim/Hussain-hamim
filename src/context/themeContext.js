import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal, flushSync } from 'react-dom';

const STORAGE_KEY = 'hsn-theme';

const THEME_BG = {
  light: '#CACBCD',
  dark: '#0B1215',
};

const WIPE_MS = 720;

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

function supportsViewTransition() {
  return typeof document !== 'undefined' && 'startViewTransition' in document;
}

/**
 * Dark expands from the top-right toggle.
 * Light expands from the bottom-left corner.
 */
function getWipeOrigin(next, trigger) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (next === 'light') {
    return { x: 0, y: vh, r: Math.hypot(vw, vh) };
  }

  const triggerRect = trigger?.getBoundingClientRect?.();
  const buttons = Array.from(
    document.querySelectorAll('[data-theme-toggle]')
  );
  const btn =
    (triggerRect?.width > 0 && triggerRect?.height > 0 ? trigger : null) ||
    buttons.find((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }) || buttons[0];

  if (!btn) {
    return {
      x: vw - 40,
      y: 40,
      r: Math.hypot(vw, vh),
    };
  }

  const rect = btn.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const r = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y));
  return { x, y, r };
}

/** Fallback: circular paint from the toggle, then removed. */
function ThemeWipe({ color, origin }) {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div
      className='theme-wipe theme-wipe--circle'
      style={{
        backgroundColor: color,
        '--theme-wipe-x': `${origin.x}px`,
        '--theme-wipe-y': `${origin.y}px`,
        '--theme-wipe-r': `${Math.ceil(origin.r)}px`,
      }}
      aria-hidden='true'
    />,
    document.body
  );
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const initial = readStoredTheme();
    if (typeof document !== 'undefined') applyThemeClass(initial);
    return initial;
  });
  const [wipe, setWipe] = useState(null);
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
    async (next, trigger) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setIsThemeAnimating(true);

      const root = document.documentElement;

      if (prefersReducedMotion()) {
        commitTheme(next);
        busyRef.current = false;
        setIsThemeAnimating(false);
        return;
      }

      const origin = getWipeOrigin(next, trigger);

      if (supportsViewTransition()) {
        root.dataset.themeWipe = 'circle';
        try {
          const transition = document.startViewTransition(() => {
            flushSync(() => {
              commitTheme(next);
            });
          });
          await transition.ready;
          const animation = root.animate(
            {
              clipPath: [
                `circle(0px at ${origin.x}px ${origin.y}px)`,
                `circle(${Math.ceil(origin.r)}px at ${origin.x}px ${origin.y}px)`,
              ],
            },
            {
              duration: WIPE_MS,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              fill: 'both',
              pseudoElement: '::view-transition-new(root)',
            }
          );
          await animation.finished;
        } catch {
          commitTheme(next);
        } finally {
          delete root.dataset.themeWipe;
          busyRef.current = false;
          setIsThemeAnimating(false);
        }
        return;
      }

      setWipe({ color: THEME_BG[next], origin });
      window.setTimeout(() => {
        commitTheme(next);
        requestAnimationFrame(() => {
          setWipe(null);
          busyRef.current = false;
          setIsThemeAnimating(false);
        });
      }, WIPE_MS);
    },
    [commitTheme]
  );

  const setTheme = useCallback(
    (next) => {
      const resolved = next === 'dark' ? 'dark' : 'light';
      if (resolved === theme || busyRef.current) return;
      runWipe(resolved);
    },
    [theme, runWipe]
  );

  const toggleTheme = useCallback((trigger) => {
    if (busyRef.current) return;
    runWipe(theme === 'dark' ? 'light' : 'dark', trigger);
  }, [theme, runWipe]);

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
    <ThemeContext.Provider value={value}>
      {children}
      {wipe ? <ThemeWipe color={wipe.color} origin={wipe.origin} /> : null}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
