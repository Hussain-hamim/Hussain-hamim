import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TouchSomeGrassPage from './TouchSomeGrassPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <TouchSomeGrassPage />
    </MemoryRouter>
  );
}

let media;
let motionListener;

beforeEach(() => {
  media = {
    matches: false,
    addEventListener: jest.fn((_, callback) => { motionListener = callback; }),
    removeEventListener: jest.fn(),
  };
  window.matchMedia = jest.fn(() => media);
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});

afterEach(() => jest.restoreAllMocks());

test('keeps the landscape accessible when WebGL is unavailable and can pause motion', () => {
  const { container } = renderPage();
  expect(screen.getByRole('link', { name: '← Go lockin' })).toHaveAttribute('href', '/');
  expect(screen.getByRole('img')).toHaveAttribute('src', '/touch-some-grass/landscape.webp');
  fireEvent.click(screen.getByRole('button', { name: 'Pause meadow animation' }));
  expect(container.querySelector('main')).toHaveAttribute('data-paused', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Resume meadow animation' }));
  expect(container.querySelector('main')).toHaveAttribute('data-paused', 'false');
});

test('reduced motion removes all animated scenery, including when preference changes', () => {
  const { container } = renderPage();
  act(() => motionListener({ matches: true }));
  expect(container.querySelector('canvas')).toBeNull();
  expect(container.querySelector('.meadow__wildlife')).toBeNull();
  expect(screen.getByRole('img')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeDisabled();
  act(() => motionListener({ matches: false }));
  expect(container.querySelector('canvas')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeEnabled();
});

test('restores the document title and removes preference listeners on navigation away', () => {
  document.title = 'Portfolio';
  const { unmount } = renderPage();
  expect(document.title).toBe('Touch some grass');
  unmount();
  expect(document.title).toBe('Portfolio');
  expect(media.removeEventListener).toHaveBeenCalledWith('change', motionListener);
});
