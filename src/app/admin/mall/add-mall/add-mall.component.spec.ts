import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMallComponent } from './add-mall.component';

describe('AddMallComponent', () => {
  let component: AddMallComponent;
  let fixture: ComponentFixture<AddMallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
