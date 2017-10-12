import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { Stadium } from '../../models/stadium';
import { EditStadiumPage } from '../edit-stadium/edit-stadium';

import { AuthService } from '../../providers/auth.service';
import { DatabaseService } from '../../providers/database.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-stadium-view',
  templateUrl: 'stadium-view.html',
})
export class StadiumViewPage {
  stadium:Stadium=null
  cover:string
  user=null

  userObs:Subscription
  stadiumObs: Subscription
  segment="about"

  constructor(
    private auth: AuthService,
    private database: DatabaseService,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.userObs = this.auth.getAuthState().subscribe(user => {
      this.user = user;
    });
    this.stadiumObs = this.database.getStadium(this.navParams.get('stadiumKey')).subscribe(stadium => {
      this.stadium = stadium;
      this.cover = stadium.images ? stadium.images[0] : null
    });
  }

  ionViewWillUnload() {
    this.userObs.unsubscribe()
  }

  handleEditClick() {
    let modal = this.modalCtrl.create(EditStadiumPage, { stadium: this.stadium })
    modal.present()
  }

}
