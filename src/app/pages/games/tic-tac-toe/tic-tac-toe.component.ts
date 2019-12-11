import { Component, OnInit } from '@angular/core';

import { TicTacToeService } from 'src/app/services/tictactoe.service';
import { TicTacToeGameState } from 'src/app/models/games/TicTacToe/tictactoe.gamestate.model';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {

  currentGame: TicTacToeGameState;
  allGames: TicTacToeGameState[];
  
  constructor(private _gameService: TicTacToeService) { 
    this.currentGame = new TicTacToeGameState();
    
  }

  ngOnInit() {
    this._gameService.list().subscribe((list) => {
      console.log('Ok', list);
      this.allGames = list;
    });
  }

}
