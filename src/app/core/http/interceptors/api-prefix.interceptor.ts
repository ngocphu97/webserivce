import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@app/env';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const hasBaseAPIURL = /^(http|https):/i.test(request.url);
    if (!hasBaseAPIURL && !request.url.includes('/assets')) {
      request = request.clone({ url: environment.apiBaseUrl + request.url });
    }

    return next.handle(request);
  }
}
