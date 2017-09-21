import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[golden]' // Attribute selector
})
export class GoldenDirective implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    const width = this.elementRef.nativeElement.offsetWidth;
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${width/1.414}px`);
  }

  @HostListener('window:resize', ['$event']) windowresize(event) {
    const width = this.elementRef.nativeElement.offsetWidth;
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${width/1.414}px`);
  }
}
