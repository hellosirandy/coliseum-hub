import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { LeaguePage } from '../league/league';
import { NewStadiumPage } from '../new-stadium/new-stadium';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  leagueChoosed(sport) {
    this.navCtrl.push(LeaguePage, { league: sport });
  }

  handleAddClick() {
    let modal = this.modalCtrl.create(NewStadiumPage);
    modal.present();
  }

}
