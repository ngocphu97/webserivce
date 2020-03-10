import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { AuthState } from '../reducers';
import { selectIsApproved } from '../selectors/login-page.selector';

@Injectable()
export class IsApproveGuard implements CanActivate {

  private isApproved$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<AuthState>
  ) {

    this.isApproved$ = this.store.pipe(
      select(selectIsApproved),
      take(1),
      tap(isApproved => {
        if (!isApproved) {
          this.router.navigate(['./explore/pending-account']);
        } else {
          return true;
        }
      })
    );
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.isApproved$;
  }
}
