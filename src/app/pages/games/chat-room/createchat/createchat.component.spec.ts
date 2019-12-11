import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatechatComponent } from './createchat.component';

describe('CreatechatComponent', () => {
  let component: CreatechatComponent;
  let fixture: ComponentFixture<CreatechatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatechatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatechatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
