import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostSearchComponent } from './most-search.component';

describe('MostSearchComponent', () => {
  let component: MostSearchComponent;
  let fixture: ComponentFixture<MostSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
