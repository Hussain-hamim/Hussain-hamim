import { StrictMode } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import ProjectPreview from './ProjectPreview';
import { ProjectPreviewProvider } from '../context/previewContext';

let observers;
let hidden;
const originalObserver = global.IntersectionObserver;
const originalRequestIdle = window.requestIdleCallback;
const originalCancelIdle = window.cancelIdleCallback;

beforeEach(() => {
  jest.useFakeTimers();
  observers = [];
  hidden = false;
  window.requestIdleCallback = undefined;
  window.cancelIdleCallback = undefined;
  jest.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden);
  jest.spyOn(document, 'readyState', 'get').mockReturnValue('complete');
  global.IntersectionObserver = jest.fn((callback) => {
    const observer = {
      notify: (isIntersecting, intersectionRatio = 1) => act(() => callback([{ isIntersecting, intersectionRatio }])),
      observe: jest.fn(),
      disconnect: jest.fn(),
    };
    observers.push(observer);
    return observer;
  });
});

afterEach(() => {
  cleanup();
  jest.clearAllTimers();
  jest.useRealTimers();
  global.IntersectionObserver = originalObserver;
  window.requestIdleCallback = originalRequestIdle;
  window.cancelIdleCallback = originalCancelIdle;
  jest.restoreAllMocks();
});

function Gallery({ titles = ['IdeaHunt', 'TalentFound', 'ProveIt AI', 'TimeCircle'] }) {
  return (
    <ProjectPreviewProvider>
      {titles.map((title) => (
        <div key={title} className='relative aspect-[40/21]'>
          <ProjectPreview title={title} url={`https://example.com/${encodeURIComponent(title)}`} poster='/cover.jpg' />
        </div>
      ))}
    </ProjectPreviewProvider>
  );
}

function advance(ms) {
  act(() => jest.advanceTimersByTime(ms));
}

function startVisiblePreviews() {
  advance(0);
  advance(200);
}

function play(title) {
  fireEvent.click(screen.getByRole('button', { name: `Play live preview of ${title} now` }));
}

test('shows covers and play controls before starting embedded websites', () => {
  render(<Gallery />);
  startVisiblePreviews();
  expect(screen.getAllByRole('img')).toHaveLength(4);
  expect(screen.getAllByRole('button', { name: /Play live preview of/ })).toHaveLength(4);
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  expect(screen.queryAllByTitle(/live preview$/)).toHaveLength(0);
});

test('automatically loads visible previews one by one, keeps the cover until load, and caps active sites at two', () => {
  render(<Gallery />);
  observers.forEach((observer) => observer.notify(true));
  startVisiblePreviews();
  const firstFrame = screen.getByTitle('IdeaHunt live preview');
  expect(firstFrame).toHaveAttribute('src', 'https://example.com/IdeaHunt');
  expect(firstFrame).toHaveClass('opacity-0');
  expect(screen.getByRole('img', { name: 'IdeaHunt' })).toBeVisible();
  expect(screen.getAllByTitle(/live preview$/)).toHaveLength(1);
  advance(1000);
  expect(screen.getAllByTitle(/live preview$/)).toHaveLength(1);
  fireEvent.load(firstFrame);
  expect(firstFrame).toHaveClass('opacity-100');
  expect(screen.queryByRole('button', { name: 'Play live preview of IdeaHunt now' })).not.toBeInTheDocument();
  advance(200);
  const secondFrame = screen.getByTitle('TalentFound live preview');
  expect(secondFrame).toHaveClass('opacity-0');
  fireEvent.load(secondFrame);
  advance(1000);
  expect(screen.getAllByTitle(/live preview$/)).toHaveLength(2);
  observers[0].notify(false);
  expect(firstFrame).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Play live preview of IdeaHunt now' })).toBeInTheDocument();
  advance(200);
  expect(screen.getByTitle('ProveIt AI live preview')).toBeInTheDocument();
  expect(screen.getAllByTitle(/live preview$/)).toHaveLength(2);
});

test('waits for the portfolio to finish loading before it starts any embedded site', () => {
  jest.spyOn(document, 'readyState', 'get').mockReturnValue('loading');
  render(<Gallery titles={['IdeaHunt']} />);
  observers[0].notify(true);
  advance(3000);
  expect(screen.queryAllByTitle(/live preview$/)).toHaveLength(0);
  fireEvent(window, new Event('load'));
  startVisiblePreviews();
  expect(screen.getByTitle('IdeaHunt live preview')).toBeInTheDocument();
});

test('clicking play starts immediately without waiting for page load or the automatic delay', () => {
  jest.spyOn(document, 'readyState', 'get').mockReturnValue('loading');
  render(<Gallery titles={['IdeaHunt']} />);
  observers[0].notify(true);
  play('IdeaHunt');
  const frame = screen.getByTitle('IdeaHunt live preview');
  expect(frame).toHaveClass('opacity-0');
  expect(screen.getByRole('img', { name: 'IdeaHunt' })).toBeVisible();
  // Further clicks must not restart a site that is already loading.
  play('IdeaHunt');
  expect(screen.getByTitle('IdeaHunt live preview')).toBe(frame);
  fireEvent.load(frame);
  expect(frame).toHaveClass('opacity-100');
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  fireEvent(window, new Event('load'));
  startVisiblePreviews();
  expect(screen.getByTitle('IdeaHunt live preview')).toBe(frame);
});

test('play gives a waiting card priority immediately without exceeding two active sites', () => {
  render(<Gallery />);
  observers.forEach((observer) => observer.notify(true));
  startVisiblePreviews();
  const firstFrame = screen.getByTitle('IdeaHunt live preview');
  // Jump ahead of TalentFound even while IdeaHunt is still loading.
  play('TimeCircle');
  expect(screen.getByTitle('TimeCircle live preview')).toBeInTheDocument();
  expect(screen.queryByTitle('TalentFound live preview')).not.toBeInTheDocument();
  expect(screen.getAllByTitle(/live preview$/)).toHaveLength(2);
  // Clicking another queued card also works when both slots are occupied.
  play('TalentFound');
  expect(firstFrame).not.toBeInTheDocument();
  expect(screen.getByTitle('TalentFound live preview')).toBeInTheDocument();
  expect(screen.queryByTitle('ProveIt AI live preview')).not.toBeInTheDocument();
  expect(screen.getAllByTitle(/live preview$/)).toHaveLength(2);
  expect(screen.getByRole('button', { name: 'Play live preview of IdeaHunt now' })).toBeInTheDocument();
  fireEvent.load(screen.getByTitle('TalentFound live preview'));
  fireEvent.load(screen.getByTitle('TimeCircle live preview'));
  advance(1000);
  expect(screen.getAllByTitle(/live preview$/)).toHaveLength(2);
  // A displaced visible card stays eligible for automatic loading later.
  observers[1].notify(false);
  observers[2].notify(false);
  advance(200);
  expect(screen.getByTitle('IdeaHunt live preview')).toHaveClass('opacity-0');
  expect(screen.getAllByTitle(/live preview$/)).toHaveLength(2);
});

test('does not load barely visible cards or cards scrolled past before the dwell finishes', () => {
  render(<Gallery titles={['IdeaHunt']} />);
  observers[0].notify(true, 0.1);
  startVisiblePreviews();
  expect(screen.queryAllByTitle(/live preview$/)).toHaveLength(0);
  observers[0].notify(true);
  advance(100);
  observers[0].notify(false);
  advance(1000);
  expect(screen.queryAllByTitle(/live preview$/)).toHaveLength(0);
  observers[0].notify(true);
  advance(200);
  expect(screen.getByTitle('IdeaHunt live preview')).toBeInTheDocument();
});

test('unloads offscreen and hidden-tab previews and automatically resumes with the image first', () => {
  render(<Gallery titles={['IdeaHunt']} />);
  observers[0].notify(true);
  startVisiblePreviews();
  fireEvent.load(screen.getByTitle('IdeaHunt live preview'));
  observers[0].notify(false);
  expect(screen.queryAllByTitle(/live preview$/)).toHaveLength(0);
  observers[0].notify(true);
  advance(200);
  expect(screen.getByTitle('IdeaHunt live preview')).toHaveClass('opacity-0');
  hidden = true;
  fireEvent(document, new Event('visibilitychange'));
  advance(200);
  expect(screen.queryAllByTitle(/live preview$/)).toHaveLength(0);
  hidden = false;
  fireEvent(document, new Event('visibilitychange'));
  advance(200);
  expect(screen.getByTitle('IdeaHunt live preview')).toHaveClass('opacity-0');
});

test('a stalled site returns to its cover, frees the queue, and can be retried by clicking', () => {
  render(<Gallery titles={['IdeaHunt', 'TalentFound']} />);
  observers.forEach((observer) => observer.notify(true));
  startVisiblePreviews();
  const stalledFrame = screen.getByTitle('IdeaHunt live preview');
  advance(20000);
  expect(stalledFrame).not.toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'IdeaHunt' })).toBeVisible();
  advance(200);
  expect(screen.getByTitle('TalentFound live preview')).toBeInTheDocument();
  play('IdeaHunt');
  expect(screen.getByTitle('IdeaHunt live preview')).not.toBe(stalledFrame);
  expect(screen.getByTitle('IdeaHunt live preview')).toHaveClass('opacity-0');
});

test('uses idle time and cancels a pending idle start when the card leaves view', () => {
  const idleCallbacks = new Map();
  let nextId = 0;
  window.requestIdleCallback = jest.fn((callback) => {
    idleCallbacks.set(++nextId, callback);
    return nextId;
  });
  window.cancelIdleCallback = jest.fn((id) => idleCallbacks.delete(id));
  const flushIdle = () => act(() => {
    const pending = [...idleCallbacks.values()];
    idleCallbacks.clear();
    pending.forEach((callback) => callback());
  });
  render(<Gallery titles={['IdeaHunt']} />);
  observers[0].notify(true);
  advance(0);
  expect(screen.queryAllByTitle(/live preview$/)).toHaveLength(0);
  flushIdle();
  advance(200);
  expect(screen.queryAllByTitle(/live preview$/)).toHaveLength(0);
  const staleCallback = [...idleCallbacks.values()][0];
  observers[0].notify(false);
  expect(window.cancelIdleCallback).toHaveBeenCalled();
  act(() => staleCallback());
  expect(screen.queryAllByTitle(/live preview$/)).toHaveLength(0);
  observers[0].notify(true);
  advance(200);
  flushIdle();
  expect(screen.getByTitle('IdeaHunt live preview')).toBeInTheDocument();
});

test('route changes release active frames and pending work under StrictMode', () => {
  const { rerender, unmount } = render(<StrictMode><Gallery titles={['IdeaHunt']} /></StrictMode>);
  observers.forEach((observer) => observer.notify(true));
  startVisiblePreviews();
  expect(screen.getByTitle('IdeaHunt live preview')).toBeInTheDocument();
  rerender(<StrictMode><Gallery titles={['TalentFound']} /></StrictMode>);
  expect(screen.queryAllByTitle(/live preview$/)).toHaveLength(0);
  observers.forEach((observer) => observer.notify(true));
  advance(200);
  expect(screen.getByTitle('TalentFound live preview')).toBeInTheDocument();
  unmount();
  advance(30000);
  observers.forEach((observer) => expect(observer.disconnect).toHaveBeenCalled());
  expect(screen.queryAllByTitle(/live preview$/)).toHaveLength(0);
});
