import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndependantExchangeService {
  private _contentfulSubject: BehaviorSubject<object> = new BehaviorSubject<object>({});
  public contentfulSubject: Observable<object> = this._contentfulSubject.asObservable();

  constructor() { }

  updateSubject(obj: object) {
    this._contentfulSubject.next(obj);
  }
}
