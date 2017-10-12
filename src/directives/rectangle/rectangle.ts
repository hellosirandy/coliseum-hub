import { Directive, DoCheck, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[rectangle]' // Attribute selector
})
export class RectangleDirective implements DoCheck {
  @HostBinding('style.height') height
  @Input() ratio:number

  constructor(
    private elementRef: ElementRef,
  ) {}

  ngDoCheck() {
    const width = this.elementRef.nativeElement.offsetWidth;
    this.height = `${width/this.ratio}px`
  }
}
