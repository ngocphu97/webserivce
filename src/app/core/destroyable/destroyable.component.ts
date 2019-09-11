import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class DetroyableComponent implements OnDestroy {

  protected componentDestroyed$: Subject<any>;

  constructor() {
    this.componentDestroyed$ = new Subject();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
