import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNewListComponent } from './customer-new-list.component';

describe('CustomerNewListComponent', () => {
  let component: CustomerNewListComponent;
  let fixture: ComponentFixture<CustomerNewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerNewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
