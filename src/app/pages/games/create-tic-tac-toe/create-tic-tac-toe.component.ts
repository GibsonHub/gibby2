import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { TicTacToeService } from 'src/app/services/tictactoe.service';
import { TicTacToeGameState } from 'src/app/models/games/TicTacToe/tictactoe.gamestate.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-tic-tac-toe',
  templateUrl: './create-tic-tac-toe.component.html',
  styleUrls: ['./create-tic-tac-toe.component.scss']
})
export class CreateTicTacToeComponent implements OnInit {

  form: FormGroup;
  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;

  currentGame: TicTacToeGameState;

  constructor(private _gameService: TicTacToeService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', []]
    });
  }

  async onSubmit() {
    console.log(this.form.value);
    const newGame:TicTacToeGameState = {
      name: this.form.value['name'],
      status: 'new'
    };
    this._gameService.add(newGame).then((ret) => {
      this.currentGame = ret;
      console.log(this.currentGame);
      //const ngId = '/games/tictactoe/play/' + ret.id;
      this.router.navigate(['games','tictactoe','play', ret.id]);
    });
  }

}
