import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/env';

@Injectable()
export class DashboardService {

  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getBookCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  getBookByCategory(categoryId: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/books?category=${categoryId}`);
  }

}
