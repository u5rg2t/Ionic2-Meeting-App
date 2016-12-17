import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { PollPopupPage } from '../poll-popup/poll-popup';


@Component({
  selector: 'page-meeting-details',
  templateUrl: 'meeting-details.html'
})
export class MeetingDetailsPage {

  rawMeeting: FirebaseObjectObservable<any>;
  meeting;

  constructor(public navCtrl: NavController, public navParams:NavParams, public angularFire: AngularFire, public modalCtrl: ModalController) {

    this.rawMeeting = angularFire.database.object('/meetings/' + navParams.get('$key'));
    
    this.rawMeeting.subscribe(snapshot => {
        this.meeting = snapshot;
        this.showPoll(); 
    });

  }

  showPoll():void{
    if(this.meeting.questionactive){
      let profileModal = this.modalCtrl.create(PollPopupPage, this.meeting);
      profileModal.present();
    }
  }

  ionViewDidLoad() {

  }

}
