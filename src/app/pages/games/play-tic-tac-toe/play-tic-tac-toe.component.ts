import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TicTacToeService } from 'src/app/services/tictactoe.service';
import { TicTacToeGameState } from 'src/app/models/games/TicTacToe/tictactoe.gamestate.model';

@Component({
  selector: 'app-play-tic-tac-toe',
  templateUrl: './play-tic-tac-toe.component.html',
  styleUrls: ['./play-tic-tac-toe.component.scss']
})
export class PlayTicTacToeComponent implements OnInit {

  currentGame: TicTacToeGameState;
  requestId: string;
  playerNumber: number = 0;
  hasInit: boolean = false;
  storedGame: any;
  
  constructor(private _gameService: TicTacToeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.requestId = this.route.snapshot.paramMap.get('id');
    //this.storedGame = localStorage.getItem('game_' + this.requestId);
    if (!this.hasInit) {
      this.hasInit = true;
      this.initGame();
    }
  }

  initGame() {
    this._gameService.get(this.requestId).subscribe((rec) => {
      this.currentGame = rec;
      if (this.currentGame.status == 'new') {
        rec.status = 'player-1-ready';
        this._gameService.update(rec).then((res) => {
          console.log('player-1-ready');
          this.playerNumber = 1;
          //localStorage.setItem('game_' + this.requestId, res);
        });
      } else if (this.currentGame.status == 'player-1-ready') {
        //rec.status = 'player-2-ready';
        rec.status = 'playing';
        this._gameService.update(rec).then((res) => {
          console.log('player-2-ready');
          console.log('playing');
          this.playerNumber = 2;
        });
      }
      
    });
  }

}
