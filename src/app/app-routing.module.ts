import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './user/auth.guard';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { TicTacToeComponent } from './pages/games/tic-tac-toe/tic-tac-toe.component';
import { CreateTicTacToeComponent } from './pages/games/create-tic-tac-toe/create-tic-tac-toe.component';
import { PlayTicTacToeComponent } from './pages/games/play-tic-tac-toe/play-tic-tac-toe.component';
import { ChatRoomComponent } from './pages/games/chat-room/chat-room.component';
import { CreatechatComponent } from './pages/games/chat-room/createchat/createchat.component';
import { ChattingComponent } from './pages/games/chat-room/chatting/chatting.component';
import { ContentfulPageComponent } from './pages/contentful-page/contentful-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'view/:name/:id/:view', component: ContentfulPageComponent },
  { path: 'games/tictactoe', component: TicTacToeComponent },
  { path: 'games/tictactoe/create', component: CreateTicTacToeComponent },
  { path: 'games/tictactoe/play/:id', component: PlayTicTacToeComponent },
  { path: 'games/chat-room', component: ChatRoomComponent },
  { path: 'games/chat-room/create', component: CreatechatComponent },
  { path: 'games/chat-room/chatting/:id', component: ChattingComponent },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'kanban',
    loadChildren: () =>
      import('./kanban/kanban.module').then(m => m.KanbanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then(m => m.CustomersModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
