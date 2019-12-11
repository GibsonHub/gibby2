
export class TicTacToeGameState{
    id?: string;
    name?: string;
    status?: string = 'open';
    playerTurn?: number;

    spaces?: Array<Array<Object>>;

    constructor() {
        this.spaces = [];
        // this.spaces.push(this.gameRow());
        // this.spaces.push(this.gameRow());
        // this.spaces.push(this.gameRow());
        //console.log(this.spaces);

        this.spaces.push(['', '', '']);
        this.spaces.push(['', '', '']);
        this.spaces.push(['', '', '']);
    }

    // private gameRow() {
    //     return ['', '', ''];
    // }
}