import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductPageComponent } from './detail-product-page.component';

describe('DetailProductPageComponent', () => {
  let component: DetailProductPageComponent;
  let fixture: ComponentFixture<DetailProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailProductPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
