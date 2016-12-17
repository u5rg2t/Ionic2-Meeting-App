import { Component } from '@angular/core';
import { MeetingDetailsPage } from '../meeting-details/meeting-details';

import { NavController, AlertController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  meetings: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public angularFire: AngularFire, public alertCtrl: AlertController) {
    this.meetings = angularFire.database.list('/meetings');
  
  }

  showMeeting(meeting):void{
    this.navCtrl.push(MeetingDetailsPage, meeting);
  }
  addMeeting():void{
    let promt = this.alertCtrl.create({
      title: 'Add meeting name and logo',
      message:'Add a meeting name and logo',
      inputs: [
        {
            name: 'name', 
            placeholder: 'Add a meeting name'
        }, 
        {
            name: 'logo', 
            placeholder: 'Logo URL'
        }
      ],
      buttons:[
        {
          text:'Cancel',
          handler: data => {
            console.log("Clicked cancel...");
          }
        }, 
        {
          text:'Add',
          handler: data => {
            console.log("Add cancel...");
            this.meetings.push({
              name: data.name,
              logo: data.logo,
              colour: '#ccc',
              id: 12345,
              questionactive: false,
              questions:[
                {
                  question: "What is your favorite colour?",
                  active: true,
                  type: "singlechoice",
                  options:[
                    {option: "Blue"},
                    {option: "Green"},
                    {option: "Red"},
                    {option: "Orange"}
                  ]
                },
                {
                  question: "What is your favorite car?",
                  active: false,
                  type: "singlechoice",
                  options:[
                    {option: "BMW"},
                    {option: "Audi"},
                    {option: "Ford"},
                    {option: "Volkswagen"}
                  ]
                },
                {
                  question: "What is your favorite food?",
                  active: false,
                  type: "singlechoice",
                  options:[
                    {option: "Pizza"},
                    {option: "Pasta"},
                    {option: "Thai"},
                    {option: "Mexican"}
                  ]
                }
              ]
            });
          }
        }
      ]
    }); 

    promt.present();
    }

  editMeeting(meeting):void{
      let promt = this.alertCtrl.create({
        title: 'Edit meeting name and logo',
        message:'Edit a meeting name and logo',
        inputs: [
          {
              name: 'name', 
              placeholder: meeting.name
          }, 
          {
              name: 'logo', 
              placeholder: meeting.logo
          }
        ],
        buttons:[
          {
            text:'Cancel',
            handler: data => {
              console.log("Clicked cancel...");
            }
          }, 
          {
            text:'Update',
            handler: data => {

              let newName:String = meeting.name;
              let newLogo:String = meeting.logo;

              if(data.name != ''){
                newName = data.name; 
              }

              if(data.logo != ''){
                newLogo = data.logo; 
              }            

              this.meetings.update(meeting.$key, {
                name: newName,
                logo: newLogo,
                colour: '#ccc',
                id: 12345,
                questionactive: false,
                questions:[]
              });
            }
          }
        ]
      }); 

      promt.present();
      
    }

  deleteMeeting(meetingID):void{
      let promt = this.alertCtrl.create({
        title: 'Delete meeting',
        buttons:[
          {
            text:'Cancel',
            handler: data => {
              console.log("Clicked cancel...");
            }
          }, 
          {
            text:'Delete',
            handler: data => {
              this.meetings.remove(meetingID);
            }
          }
        ]
      }); 
      promt.present();
    }
  }
