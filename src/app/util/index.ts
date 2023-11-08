export const parseNext = (next: string, fallback = 0): number =>
  next ? parseInt(next.match(/\d*$/)[0], 10) : fallback;
