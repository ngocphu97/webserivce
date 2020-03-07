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

  // appToken = 'EAAHhLYu93q0BAIhAqjUNKmEjHYr0z76ZA5zIiZBzq33e4subSy60Wi55iz0JOblmPifGBPiC5apY5A1wQi9nAXu5RBHwDeggIS3JErIYJZCaLQMBAcZBpib82mQ6eh4fNAAhxz6EK9zzTxYFCupDjw6QIaHNZAutI0pfLPA4DkDJfNzYFoWZB4FqlEoJstQEdpKJ37whmzRZCwPvSOlJS2O';
  appToken = '529060710964909|e4p0zb-uX6YbhQEJOcFGC3F_TFc';

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
