import { Directive, Renderer2, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[ngxVirtualScrollElement]'
})
export class NgxVirtualScrollElementDirective {

  itemHeight: number;
  _rangeStart = 0;

  @Input('rangeStart')
  set rangeStart(rangeStart: number) {
    this._rangeStart = rangeStart;
  }

  @Input('elemIndex')
  set elemIndex(elemIndex: number) {
    // this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(' + (this._rangeStart + elemIndex) * 25  + 'px)');
    this.renderer.setStyle(this.el.nativeElement, 'top',  (this._rangeStart + elemIndex) * 25  + 'px');
  }

  @Input('minRowHeight')
  set minRowHeight(minRowHeight: number) {
    this.itemHeight = minRowHeight;
    this.renderer.setStyle(this.el.nativeElement, 'min-height', this.itemHeight + 'px');
  }
  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'min-height', '25px');
  }

}