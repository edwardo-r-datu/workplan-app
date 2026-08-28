import { PriorityLabelPipe } from './priority-label-pipe';
import { Priority } from '../../core/models';

describe('PriorityLabelPipe', () => {
  let pipe: PriorityLabelPipe;

  beforeEach(() => {
    pipe = new PriorityLabelPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform LOW to green emoji label', () => {
    expect(pipe.transform(Priority.Low)).toBe('🟢 Low');
  });

  it('should transform MEDIUM to yellow emoji label', () => {
    expect(pipe.transform(Priority.Medium)).toBe('🟡 Medium');
  });

  it('should transform HIGH to red emoji label', () => {
    expect(pipe.transform(Priority.High)).toBe('🔴 High');
  });

  it('should transform CRITICAL to purple emoji label', () => {
    expect(pipe.transform(Priority.Critical)).toBe('🟣 Critical');
  });
});
