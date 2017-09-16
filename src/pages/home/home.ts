import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  constructor(
    private navCtrl: NavController
  ) {

  }

  handleSportClick(sport) {
    console.log(sport);
  }

}
