import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPieChartComponent } from './book-pie-chart.component';

describe('BookPieChartComponent', () => {
  let component: BookPieChartComponent;
  let fixture: ComponentFixture<BookPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
