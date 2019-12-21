import { Injectable } from '@angular/core';

import * as contentful from 'contentful';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import * as marked from 'marked';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private client = contentful.createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.token
  });

  constructor() { }

  logContent(contentId) {
    this.client.getEntry(contentId).then((entry) => {
      console.log(entry);
    });
  }

  getContent(contentId) {
    // const promise = this.client.getEntry(contentId);
    // return from(promise).subscribe((result) => {
    //   return result;
    // });
    return this.client.getEntry(contentId);
  }

  markdownToHtml(md: string) {
    return marked(md);
  }

  
}
