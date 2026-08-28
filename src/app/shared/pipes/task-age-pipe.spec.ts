import { TaskAgePipe } from './task-age-pipe';

describe('TaskAgePipe', () => {
  let pipe: TaskAgePipe;

  beforeEach(() => {
    pipe = new TaskAgePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "just now" for a timestamp less than a minute ago', () => {
    const now = new Date().toISOString();
    expect(pipe.transform(now)).toBe('just now');
  });

  it('should return minutes ago for a timestamp several minutes old', () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    expect(pipe.transform(fiveMinutesAgo)).toBe('5 min ago');
  });

  it('should return hours ago for a timestamp several hours old', () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
    expect(pipe.transform(threeHoursAgo)).toBe('3 hours ago');
  });

  it('should return "1 day ago" (singular) for a timestamp one day old', () => {
    const oneDayAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString();
    expect(pipe.transform(oneDayAgo)).toBe('1 day ago');
  });

  it('should return plural days for multiple days', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
    expect(pipe.transform(threeDaysAgo)).toBe('3 days ago');
  });
});
