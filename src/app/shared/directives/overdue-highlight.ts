import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOverdueHighlight]',
  standalone: false,
})
export class OverdueHighlight implements OnChanges {
  @Input('appOverdueHighlight') dueDate = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    const isOverdue = (dueDate: string) => new Date(dueDate) < new Date();

    if (this.dueDate && isOverdue(this.dueDate)) {
      // Renderer2 is the Angular-safe way to manipulate the DOM (works in SSR too)
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '4px solid #ef4444');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff8f8');
      this.renderer.setAttribute(this.el.nativeElement, 'title', 'This task is overdue!');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border-left');
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeAttribute(this.el.nativeElement, 'title');
    }
  }
}
