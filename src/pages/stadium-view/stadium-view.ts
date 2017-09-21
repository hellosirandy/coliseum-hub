import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Stadium } from '../../models/stadium';
import { EditStadiumPage } from '../edit-stadium/edit-stadium';

import { AuthService } from '../../providers/auth.service';

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

  constructor(
    private auth: AuthService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    navParams: NavParams
  ) {
    this.stadium = navParams.get('stadium');
  }

  ionViewDidLoad() {
    this.userObs = this.auth.getAuthState().subscribe(user => {
      this.user = user;
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
