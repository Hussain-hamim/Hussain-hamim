import observeVisibility from './observeVisibility';

const originalObserver = global.IntersectionObserver;
let hidden;
let notify;
let disconnect;

beforeEach(() => {
  hidden = false;
  jest.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden);
  disconnect = jest.fn();
  global.IntersectionObserver = jest.fn((callback) => {
    notify = (isIntersecting) => callback([{ isIntersecting }]);
    return { observe: jest.fn(), disconnect };
  });
});

afterEach(() => {
  global.IntersectionObserver = originalObserver;
  jest.restoreAllMocks();
});

test('runs effects only in view and in a visible tab, ignoring redundant events', () => {
  const onChange = jest.fn();
  const stop = observeVisibility(document.createElement('div'), onChange);
  expect(onChange).toHaveBeenLastCalledWith(false);
  notify(true);
  expect(onChange).toHaveBeenLastCalledWith(true);
  notify(true);
  expect(onChange).toHaveBeenCalledTimes(2);
  hidden = true;
  document.dispatchEvent(new Event('visibilitychange'));
  expect(onChange).toHaveBeenLastCalledWith(false);
  notify(false);
  hidden = false;
  document.dispatchEvent(new Event('visibilitychange'));
  expect(onChange).toHaveBeenCalledTimes(3);
  notify(true);
  expect(onChange).toHaveBeenLastCalledWith(true);
  stop();
  expect(disconnect).toHaveBeenCalledTimes(1);
  notify(false);
  hidden = true;
  document.dispatchEvent(new Event('visibilitychange'));
  expect(onChange).toHaveBeenCalledTimes(4);
});

test('keeps tab visibility controls working without IntersectionObserver', () => {
  global.IntersectionObserver = undefined;
  const onChange = jest.fn();
  const stop = observeVisibility(document.createElement('div'), onChange);
  expect(onChange).toHaveBeenLastCalledWith(true);
  hidden = true;
  document.dispatchEvent(new Event('visibilitychange'));
  expect(onChange).toHaveBeenLastCalledWith(false);
  hidden = false;
  document.dispatchEvent(new Event('visibilitychange'));
  expect(onChange).toHaveBeenLastCalledWith(true);
  stop();
});
