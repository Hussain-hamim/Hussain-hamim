import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import OnDemandSticker from './OnDemandSticker';

let visibility;
let hidden;
const originalObserver = global.IntersectionObserver;
const mockCleanup = jest.fn();
let mockFailure = false;
jest.mock('./StickerPeeling', () => ({
  __esModule: true,
  default: function MockSticker({ hovered, pressed }) {
    require('react').useEffect(() => mockCleanup, []);
    if (mockFailure) throw new Error('WebGL unavailable');
    return <span data-testid='renderer' data-hovered={String(hovered)} data-pressed={String(pressed)} />;
  },
}));

beforeEach(() => {
  jest.useFakeTimers();
  mockCleanup.mockClear();
  mockFailure = false;
  hidden = false;
  jest.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden);
  global.IntersectionObserver = jest.fn(callback => {
    visibility = visible => act(() => callback([{ isIntersecting: visible, intersectionRatio: 1 }]));
    return { observe: jest.fn(), disconnect: jest.fn() };
  });
});
afterEach(() => {
  cleanup();
  jest.clearAllTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
  global.IntersectionObserver = originalObserver;
});
function show() {
  const view = render(<a href='/example'>Visit site<OnDemandSticker image='/icon.png' imageWidth={20} imageHeight={20} /></a>);
  visibility(true);
  return view;
}
const flush = async () => act(async () => { await Promise.resolve(); });

test('keeps visible icons as images until the parent link is hovered', async () => {
  show();
  expect(screen.queryByTestId('renderer')).not.toBeInTheDocument();
  expect(screen.getByAltText('')).toHaveAttribute('width', '20');
  fireEvent.pointerEnter(screen.getByRole('link'));
  await flush();
  expect(screen.getByTestId('renderer')).toHaveAttribute('data-hovered', 'true');
  expect(screen.getByRole('link')).toHaveAttribute('href', '/example');
});

test('allows return animation and cancels delayed release on quick re-entry', async () => {
  show();
  const link = screen.getByRole('link');
  fireEvent.pointerEnter(link);
  await flush();
  fireEvent.pointerLeave(link);
  expect(screen.getByTestId('renderer')).toHaveAttribute('data-hovered', 'false');
  act(() => jest.advanceTimersByTime(300));
  expect(screen.getByTestId('renderer')).toBeInTheDocument();
  fireEvent.pointerEnter(link);
  act(() => jest.advanceTimersByTime(500));
  expect(mockCleanup).not.toHaveBeenCalled();
  fireEvent.pointerLeave(link);
  act(() => jest.advanceTimersByTime(350));
  expect(screen.queryByTestId('renderer')).not.toBeInTheDocument();
  expect(mockCleanup).toHaveBeenCalledTimes(1);
});

test('supports keyboard focus and touch press without consuming navigation', async () => {
  show();
  const link = screen.getByRole('link');
  fireEvent.focus(link);
  await flush();
  expect(screen.getByTestId('renderer')).toHaveAttribute('data-hovered', 'true');
  fireEvent.blur(link);
  act(() => jest.advanceTimersByTime(350));
  fireEvent.pointerDown(link);
  await flush();
  expect(screen.getByTestId('renderer')).toHaveAttribute('data-pressed', 'true');
  fireEvent.pointerUp(link);
  act(() => jest.advanceTimersByTime(350));
  expect(screen.queryByTestId('renderer')).not.toBeInTheDocument();
});

test('releases immediately offscreen or in a hidden tab and cancels timers on unmount', async () => {
  const { unmount } = show();
  const link = screen.getByRole('link');
  fireEvent.pointerEnter(link);
  await flush();
  visibility(false);
  expect(screen.queryByTestId('renderer')).not.toBeInTheDocument();
  visibility(true);
  fireEvent.pointerEnter(link);
  await flush();
  hidden = true;
  fireEvent(document, new Event('visibilitychange'));
  expect(screen.queryByTestId('renderer')).not.toBeInTheDocument();
  hidden = false;
  fireEvent(document, new Event('visibilitychange'));
  expect(screen.queryByTestId('renderer')).not.toBeInTheDocument();
  unmount();
  expect(jest.getTimerCount()).toBe(0);
});

test('keeps the ordinary image and link when the effect fails', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  mockFailure = true;
  show();
  fireEvent.pointerEnter(screen.getByRole('link'));
  await flush();
  expect(screen.queryByTestId('renderer')).not.toBeInTheDocument();
  expect(screen.getByAltText('')).toHaveAttribute('src', '/icon.png');
  expect(screen.getByRole('link')).toHaveAttribute('href', '/example');
});
