import { Component, OnInit, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { ContentfulService } from 'src/app/services/contentful.service';
import { globalSubjects } from '../global.subjects';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  contentfulNavigation: any;
  
  navSelectEmit: EventEmitter<any>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public afAuth: AngularFireAuth, private contentful: ContentfulService) {}

  ngOnInit() {
    const $me = this;
    this.contentful.getContent('3yvxoYMYJNQhKgYJQGj3XO').then((result) => {
      console.log('nav', result.fields['jsonObject'].topNavigation);
      $me.contentfulNavigation = result.fields['jsonObject'].topNavigation;
    });
  }

  
  topNavSelected(evt, menuItem) {
    console.log('topNavSelected', menuItem);
    this.navSelectEmit = new EventEmitter<any>();
    this.navSelectEmit.emit(menuItem);

    globalSubjects.contentfulSubject.source = new Observable<any>();
  }

}
