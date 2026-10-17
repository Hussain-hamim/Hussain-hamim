import React, { lazy, StrictMode } from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import LazyWhenVisible from './LazyWhenVisible';
import { scrollToSection } from '../utils/sectionNavigation';

const originalObserver = global.IntersectionObserver;
let observers;
let frames;
beforeEach(() => {
  observers = [];
  frames = new Map();
  let nextId = 0;
  global.IntersectionObserver = jest.fn((callback, options) => {
    const observer = { callback, options, observe: jest.fn(), disconnect: jest.fn() };
    observers.push(observer);
    return observer;
  });
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => { frames.set(++nextId, callback); return nextId; });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => frames.delete(id));
  Element.prototype.scrollIntoView = jest.fn();
});
afterEach(() => { cleanup(); global.IntersectionObserver = originalObserver; jest.restoreAllMocks(); });
async function settle() {
  await act(async () => { await Promise.resolve(); });
  await act(async () => {
    const pending = [...frames.values()]; frames.clear(); pending.forEach(callback => callback());
  });
}

test('imports content only within 400px and retains the same fallback during the download', async () => {
  let resolve;
  const load = jest.fn(() => new Promise(done => { resolve = done; }));
  const Child = lazy(load);
  render(<LazyWhenVisible fallback={<div>Reserved photo area</div>}><Child /></LazyWhenVisible>);
  expect(load).not.toHaveBeenCalled();
  expect(observers[0].options.rootMargin).toBe('400px 0px');
  act(() => observers[0].callback([{ isIntersecting: true }]));
  expect(load).toHaveBeenCalledTimes(1);
  expect(screen.getByText('Reserved photo area')).toBeInTheDocument();
  await act(async () => resolve({ default: () => <div>Photos</div> }));
  expect(screen.getByText('Photos')).toBeInTheDocument();
});

test.each(['en', 'ps'])('navigation loads preceding content and the contact form before scrolling (%s)', async locale => {
  let resolveFirst;
  let resolveForm;
  const First = lazy(() => new Promise(resolve => { resolveFirst = resolve; }));
  const Form = lazy(() => new Promise(resolve => { resolveForm = resolve; }));
  render(<main dir={locale === 'ps' ? 'rtl' : 'ltr'}>
    <LazyWhenVisible fallback={<div>Photos placeholder</div>}><First /></LazyWhenVisible>
    <section id='contactme-section'>
      <h2>Contact</h2>
      <LazyWhenVisible fallback={<div>Form placeholder</div>}><Form /></LazyWhenVisible>
    </section>
  </main>);
  let navigation;
  await act(async () => { navigation = scrollToSection('#contactme-section'); });
  expect(resolveFirst).toEqual(expect.any(Function));
  expect(resolveForm).toEqual(expect.any(Function));
  expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  await act(async () => resolveFirst({ default: () => <div>Photos</div> }));
  expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  await act(async () => resolveForm({ default: () => <input aria-label='Name' /> }));
  await settle();
  await navigation;
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
});

test('waits for an initial section chunk and cancels stale navigation on route changes', async () => {
  const controller = new AbortController();
  const first = scrollToSection('contactme', { signal: controller.signal });
  controller.abort();
  await first;
  let navigation;
  await act(async () => { navigation = scrollToSection('projects'); });
  render(<StrictMode><LazyWhenVisible eager><section id='projects-section'>Work</section></LazyWhenVisible></StrictMode>);
  await settle();
  await navigation;
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
});

test('a newer navigation cancels an older pending destination', async () => {
  const first = scrollToSection('missing');
  render(<section id='projects-section'>Work</section>);
  await scrollToSection('projects');
  await first;
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
});
