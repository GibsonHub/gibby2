import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditGridComponent } from './profile-edit-grid.component';

describe('ProfileEditGridComponent', () => {
  let component: ProfileEditGridComponent;
  let fixture: ComponentFixture<ProfileEditGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
