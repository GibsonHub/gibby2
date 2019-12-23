import { Component, OnInit } from '@angular/core';

import { globalSubjects } from './shared/global.subjects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sideNavOpened: boolean = false;

  constructor() {}

  ngOnInit() {
    globalSubjects.contentfulSubject.subscribe((evt) => {
      console.log('app.component observed change to contentfulSubject');
    });
  }

  onOpenedChange(evt) {
    this.sideNavOpened = evt;
  }

  onTopNavSelected(evt) {
    console.log('app.component picked up topNavSelected event');
  }
}
