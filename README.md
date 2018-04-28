# ngx-virtual-scroll-list

Angular Directive to add virtual scroll.

Live Demo : https://mraghuram3.github.io/#/ngx-virtual-scroll-list

## Installation

To install this library, run:

```bash
$ npm install ngx-virtual-scroll-list --save
```

## Usage

Import `NgxVirtualScrollModule` in the root module

```ts
import { NgxVirtualScrollModule } from 'ngx-text-highlight';

@NgModule({
  imports: [
    // ...
    NgxVirtualScrollModule.forRoot(),
    ...
  ]
})
```

In your template

```html
<div ngxVirtualScroll [items]="data" [minRowHeight]="25" (change)="onChangeData($event)" class="parent">
    <div ngxVirtualScrollElement [minRowHeight]="25" *ngFor="let r of displayData;let i = index;" [rangeStart]="actualIndex" [elemIndex]="i">{{r}}</div>
</div>
```
- **ngxVirtualScroll**

  Add the directive to the div or other dom in which the elemnts are to be loaded 

- **[items]**: any[].

  The data which is populated on the virtual scroll list

- **[minRowHeight]**: number.

  The minimum height of the row in pixels.

- **(change)="onChangeData($event)"**:

  create two variables and update them with the events from change event as shown.

```ts
displayData = [];
actualIndex = 0;
.....
......
onChangeData(event: any) {
    this.displayData = event.data;
    this.actualIndex = event.startIndex;
  }
```

- **ngxVirtualScrollElement**

  Add the directive to the div for row elements of the virtual scroll.

- **[minRowHeight]**: number.

  The minimum height of the row in pixels.

- **[rangeStart]**: number.

  Pass the data from change event.

  ** include other inputs in ngxVirtualScrollElement row, like ngFor and [elemIndex] **

## License

MIT © [Raghu Ram M](mailto:mraghuram3@gmail.com)