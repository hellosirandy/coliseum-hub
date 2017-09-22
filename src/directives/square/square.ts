import { Directive, DoCheck, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[square]' // Attribute selector
})
export class SquareDirective implements DoCheck {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngDoCheck() {
    const width = this.elementRef.nativeElement.offsetWidth;
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${width}px`);
  }
}
