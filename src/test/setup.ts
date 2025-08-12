import '@testing-library/jest-dom';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.ResizeObserver = global.ResizeObserver || ResizeObserverMock;
