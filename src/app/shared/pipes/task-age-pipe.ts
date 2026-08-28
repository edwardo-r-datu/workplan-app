import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskAge',
  standalone: false,
})
export class TaskAgePipe implements PipeTransform {
  transform(createdAt: string): string {
    const diffMs = Date.now() - new Date(createdAt).getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor(diffMs / (1000 * 60));

    if (days > 0) return `${days} day${days === 1 ? '' : 's'} ago`;
    if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    if (minutes > 0) return `${minutes} min ago`;
    return 'just now';
  }
}
