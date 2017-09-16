import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-league',
  templateUrl: 'league.html',
})
export class LeaguePage {
  title: string='';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    this.title = this.navParams.get('league');
    console.log(this.navParams.get('league'));

  }

}
