/* eslint-disable testing-library/no-node-access, testing-library/no-container -- These tests drive decorative canvas renderers with no accessible role. */
import { act, fireEvent, render } from '@testing-library/react';
import ParticleLetter from './ParticleLetter';

const originalIntersectionObserver = global.IntersectionObserver;
const originalResizeObserver = global.ResizeObserver;
let frames, visible, resize, ctx;
beforeEach(() => {
  jest.useFakeTimers();
  frames = new Map();
  let id = 0;
  jest.spyOn(document, 'hidden', 'get').mockReturnValue(false);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(fn => { frames.set(++id, fn); return id; });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => frames.delete(id));
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 24, height: 24 });
  ctx = {
    clearRect: jest.fn(), fillText: jest.fn(), drawImage: jest.fn(),
    measureText: () => ({ width: 10 }),
    getImageData: (_x, _y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4).fill(255) }),
    createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }),
    putImageData: jest.fn(),
  };
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(ctx);
  global.IntersectionObserver = jest.fn(callback => {
    visible = value => act(() => callback([{ isIntersecting: value }]));
    return { observe() {}, disconnect() {} };
  });
  global.ResizeObserver = jest.fn(callback => {
    resize = () => callback([{ contentRect: { width: 24, height: 24 } }]);
    return { observe() {}, disconnect() {} };
  });
});
afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
  global.IntersectionObserver = originalIntersectionObserver;
  global.ResizeObserver = originalResizeObserver;
});
const frame = () => act(() => { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn()); });
const config = { enabled: true, hoverType: 'roam', transition: { duration: 0.1 } };

test('keeps roaming animation, sleeps after assembly, and wakes for scattering and pointer interaction', async () => {
  const { container, rerender, unmount } = render(<ParticleLetter letter='H' assembled={false} hoverConfig={config} />);
  await act(async () => resize());
  visible(true);
  frame();
  expect(frames.size).toBe(1);
  rerender(<ParticleLetter letter='H' assembled hoverConfig={config} />);
  act(() => jest.advanceTimersByTime(200));
  frame();
  expect(ctx.putImageData).toHaveBeenCalled();
  expect(frames.size).toBe(0);
  fireEvent.mouseMove(container.querySelector('canvas'), { clientX: 10, clientY: 10 });
  expect(frames.size).toBe(1);
  fireEvent.mouseLeave(container.querySelector('canvas'));
  frame();
  rerender(<ParticleLetter letter='H' assembled={false} hoverConfig={config} />);
  frame();
  expect(frames.size).toBe(1);
  visible(false);
  expect(frames.size).toBe(0);
  visible(true);
  expect(frames.size).toBe(1);
  unmount();
  expect(frames.size).toBe(0);
  act(() => jest.runOnlyPendingTimers());
  expect(frames.size).toBe(0);
});

test('does not restart drawing when asynchronous initialization finishes after unmount', async () => {
  const { unmount } = render(<ParticleLetter letter='H' assembled hoverConfig={config} />);
  act(() => resize());
  visible(true);
  unmount();
  await Promise.resolve();
  expect(frames.size).toBe(0);
  expect(ctx.putImageData).not.toHaveBeenCalled();
});
