import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'page-poll-popup',
  templateUrl: 'poll-popup.html'
})
export class PollPopupPage {

  rawMeeting: FirebaseObjectObservable<any>;
  meeting: any;
  questions: any;

  constructor(public navCtrl: NavController, public navParams:NavParams, public angularFire: AngularFire, public viewCtrl: ViewController) {
    
    this.rawMeeting = this.angularFire.database.object('/meetings/' + this.navParams.get('$key'));
    
    this.rawMeeting.subscribe(snapshot => {
        this.meeting = snapshot;
        this.questions = this.meeting.questions;
        this.showPoll(); 
    });
  }

  showPoll(){
    if(!this.meeting.questionactive){
      this.viewCtrl.dismiss();
    }
  }

  ionViewDidLoad() {
  
  }

}
