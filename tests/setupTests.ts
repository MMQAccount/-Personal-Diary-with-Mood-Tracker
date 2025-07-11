import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserver;

globalThis.URL.createObjectURL = vi.fn();

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
