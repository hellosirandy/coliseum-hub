import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Stadium } from '../../models/stadium';
import { EditStadiumPage } from '../edit-stadium/edit-stadium';

import { AuthService } from '../../providers/auth.service';
import { DatabaseService } from '../../providers/database.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-stadium-view',
  templateUrl: 'stadium-view.html',
})
export class StadiumViewPage {
  stadium:Stadium=null;
  user=null;

  userObs:Subscription;
  stadiumObs: Subscription;

  constructor(
    private auth: AuthService,
    private database: DatabaseService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
    // this.stadium = navParams.get('stadium');
  }

  ionViewDidLoad() {
    this.userObs = this.auth.getAuthState().subscribe(user => {
      this.user = user;
    });
    this.stadiumObs = this.database.getStadium(this.navParams.get('stadiumKey')).subscribe(stadium => {
      this.stadium = stadium;
    });
  }

  ionViewWillUnload() {
    this.userObs.unsubscribe();
  }

  handleEditClick() {
    let modal = this.modalCtrl.create(EditStadiumPage, { create: false, stadium: this.stadium });
    modal.present();
  }

}
