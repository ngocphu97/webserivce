import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { ExploreModel } from '../../models';

@Injectable()
export class ExploreService extends EntityCollectionServiceBase<ExploreModel> {

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
}
