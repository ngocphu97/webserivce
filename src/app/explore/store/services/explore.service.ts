import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subscriber } from 'rxjs';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { ExploreModel, AdSuggestion } from '../../models';

declare var FB: any;

@Injectable()
export class ExploreService extends EntityCollectionServiceBase<ExploreModel> {

  appToken = 'EAAiuHmVRhiQBAETPAbSpLHi9muBtpv179pVIZBNZCSr7vooiykQm93IyJr6X2O62qqZCIjQCdY0zqH4hzpqGSbBQEHHbZAgyw7mnBsaAtDH54AwJxppFxtZCtZAZC6bzCPCrxnw3ZCLdub6bNUcnxS3cxgSZCVQaUXn0lQcTdeTSsHAZDZD';

  constructor(
    private http: HttpClient,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('Explore', serviceElementsFactory);
  }

  getExploreList(keyword: string, locale): Observable<Array<ExploreModel>> {
    return this.http.get<Array<ExploreModel>>
      (`https://graph.facebook.com/search?type=adinterest&limit=10000&q=[${keyword}]&locale=${locale}&access_token=${this.appToken}`);
  }

  getAdInterestSuggesstionsList(keyword: string): Observable<Array<AdSuggestion>> {
    return this.http.get<Array<AdSuggestion>>
      (`https://graph.facebook.com/search?type=adinterestsuggestion&limit=10000&interest_list=["${keyword}"]&access_token=${this.appToken}`);
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
}
