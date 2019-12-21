import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ServiceWorkerModule } from '@angular/service-worker';

import { ProfileComponent } from './pages/admin/profile/profile.component';
import { TicTacToeComponent } from './pages/games/tic-tac-toe/tic-tac-toe.component';
import { CreateTicTacToeComponent } from './pages/games/create-tic-tac-toe/create-tic-tac-toe.component';
import { PlayTicTacToeComponent } from './pages/games/play-tic-tac-toe/play-tic-tac-toe.component';
import { ChatRoomComponent } from './pages/games/chat-room/chat-room.component';
import { CreatechatComponent } from './pages/games/chat-room/createchat/createchat.component';
import { ChattingComponent } from './pages/games/chat-room/chatting/chatting.component';
import { TopNavComponent } from './shared/navigation/top-nav/top-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProfileComponent,
    TicTacToeComponent,
    CreateTicTacToeComponent,
    PlayTicTacToeComponent,
    ChatRoomComponent,
    CreatechatComponent,
    ChattingComponent,
    TopNavComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
