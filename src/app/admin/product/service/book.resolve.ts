import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { Book } from '../models';
import { BookService } from './book.service';
import { take, mergeMap } from 'rxjs/operators';

@Injectable()
export class BooksResolve implements Resolve<Book[]> {
  constructor(private bookService: BookService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[]> | Observable<never>  {
    return this.bookService.getBookList().pipe(
      take(1),
      mergeMap(crisis => {
        if (crisis) {
          return of(crisis);
        } else {
          this.router.navigate(['/client/books']);
          return EMPTY;
        }
      })
    );
  }
}  