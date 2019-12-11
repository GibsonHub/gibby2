import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTicTacToeComponent } from './create-tic-tac-toe.component';

describe('CreateTicTacToeComponent', () => {
  let component: CreateTicTacToeComponent;
  let fixture: ComponentFixture<CreateTicTacToeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTicTacToeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTicTacToeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
