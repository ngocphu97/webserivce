import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockScreenFormComponent } from './unlock-screen-form.component';

describe('UnlockScreenFormComponent', () => {
  let component: UnlockScreenFormComponent;
  let fixture: ComponentFixture<UnlockScreenFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlockScreenFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockScreenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
