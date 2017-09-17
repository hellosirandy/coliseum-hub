import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { LeaguePage } from '../league/league';
import { EditStadiumPage } from '../edit-stadium/edit-stadium';
import { AuthService } from '../../providers/auth.service';
import { StorageService } from '../../providers/storage.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  user=null;

  constructor(
    private auth: AuthService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private storage: StorageService,
  ) {

  }

  ngOnInit() {
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
