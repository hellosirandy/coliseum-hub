import { Directive, DoCheck, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[golden]' // Attribute selector
})
export class GoldenDirective implements DoCheck {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngDoCheck() {
    const width = this.elementRef.nativeElement.offsetWidth;
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${width/1.414}px`);
  }
}
