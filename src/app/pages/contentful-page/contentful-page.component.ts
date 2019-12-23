import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

import { ContentfulService } from 'src/app/services/contentful.service';
import { IndependantExchangeService } from 'src/app/services/independant-exchange.service';

@Component({
  selector: 'app-contentful-page',
  templateUrl: './contentful-page.component.html',
  styleUrls: ['./contentful-page.component.scss']
})
export class ContentfulPageComponent implements OnInit {

  contentfulId: string;
  contentfulView: string;

  contentfulFields: any;

  constructor(private route: ActivatedRoute, public afAuth: AngularFireAuth, private contentful: ContentfulService, private exchangeService: IndependantExchangeService) { }

  ngOnInit() {
    //console.log(this.route.snapshot.paramMap);
    this.contentfulId = this.route.snapshot.paramMap.get('id').toString();
    this.contentfulView = this.route.snapshot.paramMap.get('view') ? this.route.snapshot.paramMap.get('view').toString() : 'default';
    //console.log('id: ' + this.contentfulId, 'view: ' + this.contentfulView);

    this.loadPage(this.contentfulId);

    this.exchangeService.contentfulSubject.subscribe((obj) => {
      this.pageChanged(obj);
    });

  }

  loadPage(id: string){
    this.contentfulId = id;
    this.contentful.getContent(this.contentfulId).then((r) => {
      this.contentfulFields = r.fields;
      //console.log('done', this.contentfulFields);
    }).catch((err) => {
      console.log(err);
    });
  }

  pageChanged(obj) {
    //console.log('pageChanged: ', obj);
    if (obj && obj['contentId']){
      this.loadPage(obj['contentId']);
    }
    
  }

}
