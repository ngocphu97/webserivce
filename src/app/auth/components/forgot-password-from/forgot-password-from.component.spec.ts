import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordFromComponent } from './forgot-password-from.component';

describe('ForgotPasswordFromComponent', () => {
  let component: ForgotPasswordFromComponent;
  let fixture: ComponentFixture<ForgotPasswordFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
