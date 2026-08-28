import { Pipe, PipeTransform } from '@angular/core';
import { Priority } from '../../core/models';

const PRIORITY_MAP: Record<Priority, string> = {
  [Priority.Low]:      '🟢 Low',
  [Priority.Medium]:   '🟡 Medium',
  [Priority.High]:     '🔴 High',
  [Priority.Critical]: '🟣 Critical',
};

@Pipe({
  name: 'priorityLabel',
  standalone: false,
})
export class PriorityLabelPipe implements PipeTransform {
  transform(value: Priority): string {
    return PRIORITY_MAP[value] ?? value;
  }
}
