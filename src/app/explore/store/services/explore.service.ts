import { Injectable } from '@angular/core';

import { Observable, Subscriber } from 'rxjs';

import { ExploreModel, AdSuggestion } from '../../models';

declare let FB: any;

@Injectable()
export class ExploreService {

  appToken = 'EAAiuHmVRhiQBAETPAbSpLHi9muBtpv179pVIZBNZCSr7vooiykQm93IyJr6X2O62qqZCIjQCdY0zqH4hzpqGSbBQEHHbZAgyw7mnBsaAtDH54AwJxppFxtZCtZAZC6bzCPCrxnw3ZCLdub6bNUcnxS3cxgSZCVQaUXn0lQcTdeTSsHAZDZD';

  constructor() {}

  getExploreList(keyword: string, locale: string): Observable<Array<ExploreModel>> {
    return new Observable((observer: Subscriber<Array<ExploreModel>>) => {
      FB.api('/search', 'GET', {
        type: 'adinterest',
        access_token: this.appToken,
        q: [...keyword],
        locale: locale,
        limit: 10000
      }, (response) => {
        observer.next(response);
        observer.complete();
      });
    })
  }

  getAdinterestSuggestion(keyword: string): Observable<Array<AdSuggestion>> {
    return new Observable((observer: Subscriber<Array<AdSuggestion>>) => {
      FB.api('/search', 'GET', {
        type: 'adinterestsuggestion',
        access_token: this.appToken,
        interest_list: [keyword],
        limit: 10000
      }, (response) => {
        observer.next(response);
        observer.complete();
      });
    });
  }

  exchangeToken(token: string) {
    return new Observable((observer: Subscriber<Array<AdSuggestion>>) => {
      FB.api('/oauth', 'GET', {
        grant_type: 'fb_exchange_token',
        client_id: '2443245385778724',
        client_secret: '0b4facb054c87818804b36c561a1c139',
        fb_exchange_token: token,
      }, (response) => {
        observer.next(response);
        observer.complete();
      });
    });
  }
}
