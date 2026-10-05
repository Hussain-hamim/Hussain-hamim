import { act, fireEvent, render, screen } from '@testing-library/react';
import MeadowSound from './MeadowSound';

beforeEach(() => {
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
});

afterEach(() => jest.restoreAllMocks());

test('waits for a user gesture, starts the local looping recording and stops on demand', async () => {
  const { container } = render(<MeadowSound />);
  const audio = container.querySelector('audio');
  const wind = container.querySelectorAll('audio')[1];
  expect(audio).not.toHaveAttribute('src');
  expect(audio).toHaveAttribute('preload', 'none');
  expect(audio).toHaveAttribute('loop');
  expect(audio.play).not.toHaveBeenCalled();
  await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Play nature sounds' })));
  expect(audio.getAttribute('src')).toContain('meadow-ambience.mp3');
  expect(wind.getAttribute('src')).toContain('meadow-wind.mp3');
  expect(audio.play).toHaveBeenCalledTimes(2);
  expect(screen.getByRole('button', { name: 'Stop nature sounds' })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Stop nature sounds' }));
  expect(audio.pause).toHaveBeenCalled();
  expect(wind.currentTime).toBe(0);
  expect(screen.getByRole('button', { name: 'Play nature sounds' })).toHaveAttribute('aria-pressed', 'false');
});

test('offers retry after a playback rejection', async () => {
  HTMLMediaElement.prototype.play.mockRejectedValueOnce(new Error('Playback blocked'));
  render(<MeadowSound />);
  await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Play nature sounds' })));
  expect(screen.getByRole('button', { name: 'Retry nature sounds' })).toHaveAttribute('aria-pressed', 'false');
  await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Retry nature sounds' })));
  expect(screen.getByRole('button', { name: 'Stop nature sounds' })).toBeInTheDocument();
});

test('stopping during loading cannot switch the control back on after play resolves', async () => {
  let finishPlay;
  HTMLMediaElement.prototype.play.mockReturnValueOnce(new Promise(resolve => { finishPlay = resolve; }));
  render(<MeadowSound />);
  fireEvent.click(screen.getByRole('button', { name: 'Play nature sounds' }));
  fireEvent.click(screen.getByRole('button', { name: 'Stop nature sounds' }));
  await act(async () => finishPlay());
  expect(screen.getByRole('button', { name: 'Play nature sounds' })).toHaveAttribute('aria-pressed', 'false');
});

test('leaving the route releases the recording and cancels pending playback', async () => {
  const { container, unmount } = render(<MeadowSound />);
  const audio = container.querySelector('audio');
  await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Play nature sounds' })));
  unmount();
  expect(audio.pause).toHaveBeenCalled();
  expect(audio).not.toHaveAttribute('src');
  expect(audio.load).toHaveBeenCalled();
});

test('a failure in the wind layer stops both tracks and allows retry', async () => {
  HTMLMediaElement.prototype.play.mockResolvedValueOnce().mockRejectedValueOnce(new Error('Wind failed'));
  const { container } = render(<MeadowSound />);
  await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Play nature sounds' })));
  expect(screen.getByRole('button', { name: 'Retry nature sounds' })).toBeInTheDocument();
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(2);
  [...container.querySelectorAll('audio')].forEach(audio => expect(audio.currentTime).toBe(0));
});
