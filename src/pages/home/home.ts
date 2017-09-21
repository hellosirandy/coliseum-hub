import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { LeagueViewPage } from '../league-view/league-view';
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
    this.navCtrl.push(LeagueViewPage, { league: sport });
  }

  handleAddClick() {
    if (this.user) {
      let modal = this.modalCtrl.create(EditStadiumPage, { create: true });
      modal.present();
    }
  }

}
