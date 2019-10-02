import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksTypeChartComponent } from './books-type-chart.component';

describe('BooksTypeChartComponent', () => {
  let component: BooksTypeChartComponent;
  let fixture: ComponentFixture<BooksTypeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksTypeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksTypeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
