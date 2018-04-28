import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  data = [];
  displayData = [];
  actualIndex = 0;

  constructor() {

    for (let i = 0; i < 100000; i++) {
      this.data.push(i);
    }
  }

}
