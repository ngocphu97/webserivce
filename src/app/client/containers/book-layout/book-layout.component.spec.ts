import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLayoutComponent } from './book-layout.component';

describe('BookLayoutComponent', () => {
  let component: BookLayoutComponent;
  let fixture: ComponentFixture<BookLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
