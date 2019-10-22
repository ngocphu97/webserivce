import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLocationPageComponent } from './product-location-page.component';

describe('ProductLocationPageComponent', () => {
  let component: ProductLocationPageComponent;
  let fixture: ComponentFixture<ProductLocationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLocationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLocationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
