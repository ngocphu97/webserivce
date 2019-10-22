import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatailPageComponent } from './deatail-page.component';

describe('DeatailPageComponent', () => {
  let component: DeatailPageComponent;
  let fixture: ComponentFixture<DeatailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeatailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeatailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
