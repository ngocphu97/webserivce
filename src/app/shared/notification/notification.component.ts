import { Component, OnInit, Inject, HostListener, OnDestroy } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { timer, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  private duration = 10000;
  private componentDestroyed$: Subject<boolean>;
  private mouseenter$: Subject<boolean>;
  private timerSubscription: Subscription;

  constructor(
    private snackBarRef: MatSnackBarRef<NotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {

    this.componentDestroyed$ = new Subject();
    this.mouseenter$ = new Subject();

    if (this.data.duration && this.data.duration > 0) {
      this.duration = data.duration;
    }

    if (!this.data.title) {
      this.data.title = 'App';
    }
  }

  @HostListener('mouseenter')
  onMouseenter() {
    this.mouseenter$.next();
    this.mouseenter$.complete();

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  @HostListener('mouseleave')
  onMouseleave() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = timer(this.duration).pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => {
      this.snackBarRef.dismiss();
    });
  }

  ngOnInit() {
    this.setupAutoClose();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onClose() {
    this.snackBarRef.dismiss();
  }

  private setupAutoClose() {
    timer(this.duration).pipe(
      takeUntil(this.mouseenter$)
    ).subscribe(() => {
      this.onClose();
    });
  }

}
