import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule
      ],
      providers: [
        { provide: MatSnackBarRef, useValue: {} },
        { provide: MAT_SNACK_BAR_DATA, useValue: {} }
      ],
      declarations: [NotificationComponent]
    })
      .compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<NotificationComponent> = TestBed.createComponent(NotificationComponent);
    const component: NotificationComponent = fixture.componentInstance;
    fixture.detectChanges();

    return { fixture, component };
  }

  it('should create the notification component', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });
});
