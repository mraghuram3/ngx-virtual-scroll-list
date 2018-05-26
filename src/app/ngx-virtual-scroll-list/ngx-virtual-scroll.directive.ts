import { Directive, Renderer2, ElementRef, Input, AfterViewInit, Output, EventEmitter, HostListener } from '@angular/core';

import {Observable} from 'rxjs/Rx';

import 'rxjs/add/observable/fromEvent';

@Directive({
  selector: '[ngxVirtualScroll]'
})
export class NgxVirtualScrollDirective implements AfterViewInit{
  data = [];
  scrollerHeight = 0;
  itemCount: number;
  start = 0;
  itemHeight = 25;
  screenHieght: number;
  screenItemsLen: number;
  cachedItemsLen: number;
  lastRepaintY;
  maxBuffer: number;
  displayData = [];

  fire = true;

  @Output()
  private change: EventEmitter<ScollData> = new EventEmitter<ScollData>();

  @Input('items')
  set items(items: any[]){
    this.data = items;
    this.itemCount = items.length;
  }

  @Input('minRowHeight')
  set minRowHeight(minRowHeight: number) {
    this.itemHeight = minRowHeight;
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.start = 0;
  }
  ngAfterViewInit() {

    const observables = this.getObservables(this.el.nativeElement);
    observables.scroll.forEach((event: any) => {
       this.processData(event);
    });

    this.screenHieght = this.el.nativeElement.clientHeight;
    this.screenItemsLen = Math.floor(this.screenHieght / this.itemHeight);
    this.cachedItemsLen = this.screenItemsLen * 5;
    this.scrollerHeight = this.itemCount * this.itemHeight;
    this.maxBuffer = this.screenItemsLen * this.itemHeight;
    const div = this.renderer.createElement('div');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(div, 'opacity', '0');
    this.renderer.setStyle(div, 'position', 'absolute');
    this.renderer.setStyle(div, 'top', '0px');
    this.renderer.setStyle(div, 'left', '0px');
    this.renderer.setStyle(div, 'width', '1px');
    this.renderer.setStyle(div, 'height', this.scrollerHeight + 'px');
    this.renderer.appendChild(this.el.nativeElement, div);
    this.updateData(this.start);
  }

  processData(event: any) {
    const scrollTop = event.target.scrollTop;

    if (!this.lastRepaintY || Math.abs(scrollTop - this.lastRepaintY) > this.maxBuffer) {
     let first =  Math.floor(scrollTop / this.itemHeight) - this.screenItemsLen;
       if (first < 0) {
         first = 0;
       } else if (first > this.data.length - this.screenItemsLen){
        first = this.data.length - this.screenItemsLen;
      }
     this.start = first;
     this.updateData(this.start);
     this.lastRepaintY = scrollTop;
     event.preventDefault();
    }
  }

  updateData(start) {
    let end = start + this.cachedItemsLen;

    if (end > this.itemCount - this.screenItemsLen) {
       end = this.itemCount;
      }

    this.displayData = this.data.slice(start, end);

    const Data = new ScollData();
    Data.data = this.displayData;
    Data.startIndex = start;
    this.change.emit(Data);
  }

  getObservables(domItem) {
    const scroll = Observable.fromEvent(domItem, 'scroll');
    return { scroll };
  }
}

class ScollData {
  data: Array<any>;
  startIndex: number;
}

