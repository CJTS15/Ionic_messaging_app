import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { Sim } from '@ionic-native/sim';
// import { Messages } from '../home/message';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	
	public num:string;
	public message:string;

	constructor(
		public navCtrl: NavController, 
		public alertCtrl: AlertController, 
		private sms: SMS, 
		private sim: Sim) {
	}

	addContact(){

	}


	sendAlert(){

    let app = {
      sendSMS: function(){
        let num = (<HTMLInputElement>document.getElementById('num')).value.toString();
        let message = (<HTMLInputElement>document.getElementById('message')).value;
      },

      //for marshmallow
      checkSMSPermission: function(){
        let success = function (hasPermission){
          if(hasPermission){
            this.sms.send(this.message);
          }
          else {}
      };
      let error = function (e){
        alert('Something went wrong:' +e)};
        this.sms.hasPermission(success, error);
      }
    };

    let option = {
      replaceLineBreaks: false,
      android: {
        intent: ''
      }
    };

    let ionic_alert = this.alertCtrl.create({
      title: 'Send Message',
      subTitle: 'Ok?',
      buttons: [
      {
        text: 'Send',
        handler: data => {
          console.log("click");

          this.sms.send(this.num, this.message, option)
          .then(()=>{
            alert('Message Send Successfully!');
            this.num = "";
            this.message = "";
          },()=>{
            alert('Message Not Sent');
          });

          this.sim.getSimInfo()
          .then((info)=> console.log('Sim info: ',info));
          this.sim.hasReadPermission()
          .then((info)=> console.log('Has permission ', info));
          this.sim.requestReadPermission()
          .then(()=> console.log('Permission Granted'),
                ()=> console.log('Permission Denied')
          );
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
        
      ]
    });
    ionic_alert.present();
  }		
}
