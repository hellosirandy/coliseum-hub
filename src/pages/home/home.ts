import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { LeaguePage } from '../league/league';
import { EditStadiumPage } from '../edit-stadium/edit-stadium';

import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user=null;
  stadiums=[];

  constructor(
    private auth: AuthService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
  ) {

  }

  ionViewDidLoad() {
    this.auth.getAuthState().subscribe(user => {
      this.user = user;
    });
  }

  leagueChoosed(sport) {
    this.navCtrl.push(LeaguePage, { league: sport });
  }

  handleAddClick() {
    if (this.user) {
      let modal = this.modalCtrl.create(EditStadiumPage, { create: true });
      modal.present();
    }
  }

}
