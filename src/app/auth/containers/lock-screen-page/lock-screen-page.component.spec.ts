import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockScreenPageComponent } from './lock-screen-page.component';

describe('LockScreenPageComponent', () => {
  let component: LockScreenPageComponent;
  let fixture: ComponentFixture<LockScreenPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockScreenPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockScreenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
