import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShopMallComponent } from './product-shop-mall.component';

describe('ProductShopMallComponent', () => {
  let component: ProductShopMallComponent;
  let fixture: ComponentFixture<ProductShopMallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductShopMallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShopMallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
