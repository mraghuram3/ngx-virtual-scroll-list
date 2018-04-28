import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxVirtualScrollDirective } from './ngx-virtual-scroll.directive';
import { NgxVirtualScrollElementDirective } from './ngx-virtual-scroll-element.directive';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxVirtualScrollDirective, NgxVirtualScrollElementDirective],
  exports: [
    NgxVirtualScrollDirective, NgxVirtualScrollElementDirective
  ]
})
export class NgxVirtualScrollModule { }
