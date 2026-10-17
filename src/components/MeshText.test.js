/* eslint-disable testing-library/no-node-access, testing-library/no-container -- These tests drive decorative canvas renderers with no accessible role. */
import { act, fireEvent, render, screen } from '@testing-library/react';
import MeshText from './MeshText';

const originalIntersectionObserver = global.IntersectionObserver;
const originalResizeObserver = global.ResizeObserver;
let frames;
let gl;
let context2d;
let setVisible;
let resizeObservers;
let width;

beforeEach(() => {
  frames = new Map();
  resizeObservers = [];
  width = 400;
  let nextFrame = 0;
  jest.spyOn(document, 'hidden', 'get').mockReturnValue(false);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    const id = ++nextFrame;
    frames.set(id, callback);
    return id;
  });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => frames.delete(id));
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({ width, height: 56, left: 0, top: 0 }));
  // Rendering is mocked; these tests exercise actual scheduling and cleanup.
  gl = new Proxy({}, {
    get(target, key) {
      if (/^[A-Z_0-9]+$/.test(key)) return 1;
      if (!target[key]) target[key] = jest.fn(() => ({}));
      return target[key];
    },
  });
  context2d = { clearRect: jest.fn(), fillText: jest.fn(), drawImage: jest.fn() };
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation((type) => type === 'webgl2' ? gl : context2d);
  global.IntersectionObserver = jest.fn((callback) => {
    setVisible = (isIntersecting) => act(() => callback([{ isIntersecting }]));
    return { observe: jest.fn(), disconnect: jest.fn() };
  });
  global.ResizeObserver = jest.fn((callback) => {
    resizeObservers.push(callback);
    return { observe: jest.fn(), disconnect: jest.fn() };
  });
});

afterEach(() => {
  global.IntersectionObserver = originalIntersectionObserver;
  global.ResizeObserver = originalResizeObserver;
  jest.restoreAllMocks();
});

function paintFrame() {
  act(() => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((callback) => callback());
  });
}

test('static hero text paints on demand and repaints after resizing without an idle loop', () => {
  render(<MeshText text='HUSSAIN' interactive={false} force={0} />);
  expect(frames.size).toBe(0);
  setVisible(true);
  paintFrame();
  expect(context2d.drawImage).toHaveBeenCalledTimes(1);
  expect(HTMLCanvasElement.prototype.getContext).not.toHaveBeenCalledWith('webgl2', expect.anything());
  expect(screen.getByText('HUSSAIN')).toHaveStyle({ opacity: '0' });
  expect(frames.size).toBe(0);
  width = 600;
  act(() => resizeObservers.forEach((callback) => callback()));
  expect(frames.size).toBe(1);
  paintFrame();
  expect(context2d.drawImage).toHaveBeenCalledTimes(2);
  expect(frames.size).toBe(0);
});

test('interactive text pauses outside the viewport, resumes once, and releases frames on unmount', () => {
  const { unmount } = render(<MeshText text='HUSSAIN' />);
  setVisible(true);
  paintFrame();
  expect(frames.size).toBe(0);
  setVisible(false);
  expect(frames.size).toBe(0);
  setVisible(true);
  setVisible(true);
  expect(frames.size).toBe(1);
  paintFrame();
  expect(gl.drawElements).toHaveBeenCalledTimes(2);
  unmount();
  expect(frames.size).toBe(0);
  expect(gl.deleteProgram).toHaveBeenCalledTimes(1);
});

test('interactive text wakes on pointer movement and stops when the spring settles', () => {
  const { container } = render(<MeshText text='HUSSAIN' />);
  setVisible(true);
  paintFrame();
  const move = (x) => fireEvent(container.firstChild, new MouseEvent('pointermove', { clientX: x, clientY: 20 }));
  move(40);
  paintFrame();
  move(60);
  paintFrame();
  expect(frames.size).toBe(1);
  fireEvent.pointerLeave(container.firstChild);
  for (let i = 0; i < 500 && frames.size; i += 1) paintFrame();
  expect(frames.size).toBe(0);
});

test('does not paint a static heading after unmounting while its font is loading', async () => {
  const originalFonts = document.fonts;
  let resolveFont;
  Object.defineProperty(document, 'fonts', { configurable: true, value: { load: () => new Promise(resolve => { resolveFont = resolve; }) } });
  try {
    const { unmount } = render(<MeshText text='HUSSAIN' interactive={false} />);
    setVisible(true);
    paintFrame();
    unmount();
    await act(async () => resolveFont());
    expect(context2d.drawImage).not.toHaveBeenCalled();
    expect(frames.size).toBe(0);
  } finally {
    Object.defineProperty(document, 'fonts', { configurable: true, value: originalFonts });
  }
});
