import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenddingAccountComponent } from './pendding-account.component';

describe('PenddingAccountComponent', () => {
  let component: PenddingAccountComponent;
  let fixture: ComponentFixture<PenddingAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenddingAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenddingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
