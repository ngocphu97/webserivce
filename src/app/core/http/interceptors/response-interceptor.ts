import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      filter((event: HttpEvent<any>) => {
        return event.type === HttpEventType.Response;
      }),
      map((response: HttpResponse<any>) => {
        return response;
      })
    );
  }
}
