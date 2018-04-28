import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxVirtualScrollModule } from './ngx-virtual-scroll-list/ngx-virtual-scroll.module';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, NgxVirtualScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
