import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { ContentfulService } from 'src/app/services/contentful.service';
import { IndependantExchangeService } from './../../services/independant-exchange.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  contentfulNavigation: any;
  
  @Output()
  navSelectEmit: EventEmitter<any>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public afAuth: AngularFireAuth, private contentful: ContentfulService, private exchangeService: IndependantExchangeService) {}

  ngOnInit() {
    const $me = this;
    this.contentful.getContent('3yvxoYMYJNQhKgYJQGj3XO').then((result) => {
      $me.contentfulNavigation = result.fields['jsonObject'].topNavigation;
    });
  }

  
  topNavSelected(evt, menuItem) {
    this.exchangeService.updateSubject(menuItem);
  }

}
