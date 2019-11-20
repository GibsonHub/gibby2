import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sideNavOpened: boolean = false;

  constructor() {}

  onOpenedChange(evt) {
    this.sideNavOpened = evt;
  }
}
