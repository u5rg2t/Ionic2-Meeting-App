import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MeetingDetailsPage } from '../pages/meeting-details/meeting-details';
import { PollPopupPage } from '../pages/poll-popup/poll-popup';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyANp7vDEFelLvWWyeuPMUHLJK7XgoC2NaE",
    authDomain: "myfirstapp-836cf.firebaseapp.com",
    databaseURL: "https://myfirstapp-836cf.firebaseio.com",
    storageBucket: "myfirstapp-836cf.appspot.com",
    messagingSenderId: "144789932582"
  }

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MeetingDetailsPage,
    PollPopupPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), 
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MeetingDetailsPage,
    PollPopupPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
