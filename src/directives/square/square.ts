import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[square]' // Attribute selector
})
export class SquareDirective implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    const width = this.elementRef.nativeElement.offsetWidth;
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${width}px`);
  }

}
