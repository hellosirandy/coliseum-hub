import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Stadium } from '../../models/stadium';

@Component({
  selector: 'page-stadium-view',
  templateUrl: 'stadium-view.html',
})
export class StadiumViewPage {
  stadium:Stadium=null;

  constructor(
    private navCtrl: NavController,
    navParams: NavParams
  ) {
    this.stadium = navParams.get('stadium');
  }

  ionViewDidLoad() {

  }

}
