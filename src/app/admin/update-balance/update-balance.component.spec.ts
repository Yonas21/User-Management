import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBalanceComponent } from './update-balance.component';

describe('UpdateBalanceComponent', () => {
  let component: UpdateBalanceComponent;
  let fixture: ComponentFixture<UpdateBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
