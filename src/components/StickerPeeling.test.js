/* eslint-disable testing-library/no-node-access, testing-library/no-container -- Inspect the decorative canvas and fallback image to verify renderer lifecycle and resource cleanup. */
import React, { StrictMode } from 'react';
import { act, cleanup, render } from '@testing-library/react';
import StickerPeeling from './StickerPeeling';

const mockRenderers = [];
const mockStop = jest.fn();
let mockWebGLFailure = false;
jest.mock('three', () => ({
  ...jest.requireActual('three'),
  WebGLRenderer: class {
    constructor({ canvas }) {
    if (mockWebGLFailure) throw new Error('WebGL unavailable');
    Object.assign(this, {
      domElement: canvas,
      shadowMap: {},
      getContext: () => ({ isContextLost: () => false }),
      setSize: jest.fn(), setPixelRatio: jest.fn(), render: jest.fn(),
      dispose: jest.fn(), forceContextLoss: jest.fn(),
    });
    mockRenderers.push(this);
    }
  },
}));
jest.mock('framer-motion', () => ({
  useMotionValue: () => require('react').useRef({}).current,
  useMotionValueEvent: jest.fn(),
  animate: () => ({ stop: mockStop }),
}));

const OriginalImage = global.Image;
let images;
let frames;
beforeEach(() => {
  mockRenderers.length = 0;
  mockStop.mockClear();
  mockWebGLFailure = false;
  images = [];
  frames = new Map();
  let id = 0;
  global.Image = jest.fn(() => {
    const image = document.createElement('img');
    images.push(image);
    return image;
  });
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => { frames.set(++id, callback); return id; });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => frames.delete(id));
});
afterEach(() => { cleanup(); global.Image = OriginalImage; jest.restoreAllMocks(); });
const sticker = <StickerPeeling image='/icon.png' imageWidth={20} imageHeight={20} backColor='rgba(0,0,0,0)' hovered />;

function flushFrame() {
  act(() => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach(callback => callback());
  });
}

test('keeps its image until the textured frame is painted, then disposes all graphics resources', async () => {
  const { container, unmount } = render(sticker);
  const renderer = mockRenderers[0];
  const scene = renderer.render.mock.calls[0][0];
  const mesh = scene.getObjectByProperty('type', 'SkinnedMesh');
  const shadow = scene.getObjectByProperty('type', 'DirectionalLight').shadow;
  const plane = scene.getObjectByProperty('type', 'Mesh');
  const disposables = [mesh.geometry, mesh.skeleton, ...new Set(mesh.material), plane.geometry, plane.material, shadow];
  expect(container.querySelector('img')).toHaveAttribute('src', '/icon.png');
  expect(container.querySelector('canvas')).toHaveStyle({ opacity: '0' });
  act(() => images[0].onload());
  expect(container.querySelector('img')).toBeInTheDocument();
  flushFrame();
  expect(container.querySelector('img')).toBeNull();
  expect(container.querySelector('canvas')).toHaveStyle({ opacity: '1' });
  const textures = new Set(mesh.material.flatMap(material => [material.map, material.emissiveMap]).filter(Boolean));
  const spies = [...disposables, ...textures].map(resource => jest.spyOn(resource, 'dispose'));
  unmount();
  await act(async () => { await Promise.resolve(); });
  spies.forEach(spy => expect(spy).toHaveBeenCalled());
  expect(renderer.dispose).toHaveBeenCalledTimes(1);
  expect(renderer.forceContextLoss).toHaveBeenCalledTimes(1);
  expect(frames.size).toBe(0);
  expect(mockStop).toHaveBeenCalled();
});

test('cancels pending texture and animation work when an interaction ends before loading', async () => {
  const { unmount } = render(sticker);
  const lateLoad = images[0].onload;
  const renderer = mockRenderers[0];
  unmount();
  const paints = renderer.render.mock.calls.length;
  expect(images[0].onload).toBeNull();
  expect(images[0].onerror).toBeNull();
  expect(images[0]).not.toHaveAttribute('src');
  act(() => lateLoad());
  await act(async () => { await Promise.resolve(); });
  expect(renderer.render).toHaveBeenCalledTimes(paints);
  expect(frames.size).toBe(0);
});

test('does not lose a connected canvas context during StrictMode effect replay', async () => {
  const { unmount } = render(<StrictMode>{sticker}</StrictMode>);
  await act(async () => { await Promise.resolve(); });
  expect(mockRenderers).toHaveLength(2);
  expect(mockRenderers[0].dispose).toHaveBeenCalledTimes(1);
  expect(mockRenderers[0].forceContextLoss).not.toHaveBeenCalled();
  expect(mockRenderers[1].dispose).not.toHaveBeenCalled();
  unmount();
  await act(async () => { await Promise.resolve(); });
  expect(mockRenderers[1].forceContextLoss).toHaveBeenCalledTimes(1);
  expect(frames.size).toBe(0);
});

test('keeps a usable image with no animation work when WebGL cannot initialize', () => {
  mockWebGLFailure = true;
  const { container } = render(sticker);
  expect(container.querySelector('img')).toHaveAttribute('src', '/icon.png');
  expect(container.querySelector('canvas')).toBeNull();
  expect(frames.size).toBe(0);
});
