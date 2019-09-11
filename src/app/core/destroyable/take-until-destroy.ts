import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const destroy$ = Symbol('componentDestroy$');

/**
 * @example
 *
 *  this.pending$.pipe(
 *     takeUntilDestroy(this)
 *  ).subscribe((pending) => {
 *     console.log('pending: ', pending)
 *  });
 *
 * @param() component
 */
export const takeUntilDestroy = <T>(component: any): MonoTypeOperatorFunction<T> => {
  if (component[destroy$] === undefined) {
    addDestroyObservableToComponent(component);
  }

  return takeUntil<T>(component[destroy$]);
};

/**
 * @internal
 */
function addDestroyObservableToComponent(component: any) {
  component[destroy$] = new Observable<void>((subscriber) => {
    const orignalDestroy = component.ngOnDestroy;

    component.ngOnDestroy = () => {
      subscriber.next();
      subscriber.complete();

      if (orignalDestroy) {
        orignalDestroy.call(component);
      }
    };

    return (_: any) => (component[destroy$] = undefined);
  });
}
