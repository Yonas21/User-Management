import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMallComponent } from './update-mall.component';

describe('UpdateMallComponent', () => {
  let component: UpdateMallComponent;
  let fixture: ComponentFixture<UpdateMallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
