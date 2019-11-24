import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InplaceEditGridComponent } from './inplace-edit-grid.component';

describe('InplaceEditGridComponent', () => {
  let component: InplaceEditGridComponent;
  let fixture: ComponentFixture<InplaceEditGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InplaceEditGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InplaceEditGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
