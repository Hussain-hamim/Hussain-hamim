import { fireEvent, render, screen } from '@testing-library/react';
import ClientProjectsSection from './ClientProjectsSection';
import { scrollToSection } from '../utils/sectionNavigation';
jest.mock('../utils/sectionNavigation', () => ({ scrollToSection: jest.fn() }));

let nextFrame;
let now;
let reducedMotion;

beforeEach(() => {
  now = 0;
  reducedMotion = false;
  jest.spyOn(performance, 'now').mockImplementation(() => now);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    nextFrame = callback;
    return 1;
  });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: () => ({ matches: reducedMotion }),
  });
  jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1200);
});

afterEach(() => jest.restoreAllMocks());

const frame = time => {
  now = time;
  nextFrame(time);
};

test('pauses for trackpad interaction and resumes from the manually scrolled position', () => {
  render(<ClientProjectsSection />);
  const row = screen.getByRole('region', { name: /swipe or scroll horizontally/i });
  frame(0);
  frame(16);
  expect(row.scrollLeft).toBeGreaterThan(0);

  fireEvent.wheel(row, { deltaX: 240 });
  row.scrollLeft = 240; // The browser applies the native scroll gesture.
  frame(32);
  frame(1000);
  expect(row.scrollLeft).toBe(240);
  frame(2100);
  expect(row.scrollLeft).toBeGreaterThan(240);
  expect(row.scrollLeft).toBeLessThan(242);

  fireEvent.focus(row);
  const stopped = row.scrollLeft;
  frame(2200);
  frame(2300);
  expect(row.scrollLeft).toBe(stopped);
});

test('keeps manual scrolling available without automatic movement for reduced motion', () => {
  reducedMotion = true;
  render(<ClientProjectsSection />);
  const row = screen.getByRole('region', { name: /swipe or scroll horizontally/i });
  expect(row).toHaveAttribute('tabindex', '0');
  row.scrollLeft = 180;
  frame(0);
  frame(100);
  expect(row.scrollLeft).toBe(180);
});

test('ends the row with a contact CTA instead of demo projects', () => {
  render(<ClientProjectsSection />);
  expect(screen.queryByText('Bloom Market')).not.toBeInTheDocument();
  expect(screen.queryByText('Mono Creative')).not.toBeInTheDocument();
  const cta = screen.getByRole('link', { name: /your project here/i });
  expect(cta).toHaveAttribute('href', '#contactme-section');
  fireEvent.click(cta);
  expect(scrollToSection).toHaveBeenCalledWith('contactme');
});
