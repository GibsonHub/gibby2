import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sideNavOpened: boolean = false;

  constructor() {}

  ngOnInit() {
  }

  onOpenedChange(evt) {
    this.sideNavOpened = evt;
  }

  onTopNavSelected(evt) {
    console.log('app.component picked up topNavSelected event');
  }
}
