import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTicTacToeComponent } from './play-tic-tac-toe.component';

describe('PlayTicTacToeComponent', () => {
  let component: PlayTicTacToeComponent;
  let fixture: ComponentFixture<PlayTicTacToeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayTicTacToeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayTicTacToeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
