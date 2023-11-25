import '@testing-library/jest-dom';

beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
});

afterAll(() => {
  vi.clearAllMocks();
});
