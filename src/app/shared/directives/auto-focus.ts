import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
  standalone: false,
})
export class AutoFocus implements AfterViewInit {
  constructor(private el: ElementRef) {}

  // AfterViewInit — runs after the element is fully rendered in the DOM
  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }
}
