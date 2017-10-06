import { Component } from '@angular/core'
import { ModalController, NavController } from 'ionic-angular'
import { LeagueViewPage } from '../league-view/league-view'
import { EditStadiumPage } from '../edit-stadium/edit-stadium'
import { StadiumViewPage } from '../stadium-view/stadium-view'

import { AuthService } from '../../providers/auth.service'
import { DatabaseService } from '../../providers/database.service'

import { Leagues } from '../../statics/sports-leagues-teams'
import { Stadium } from '../../models/stadium'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user=null;

  carousels:Stadium[]=[];

  category: any={}

  constructor(
    private auth: AuthService,
    private database: DatabaseService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
  ) {}

  ionViewDidLoad() {
    this.auth.getAuthState().subscribe(user => {
      this.user = user;
    })
  }

  leagueChoosed(leagueName) {
    const league = Leagues.filter( league => league.name === leagueName )[0]
    this.navCtrl.push(LeagueViewPage, { league: league });
  }

  handleAddClick() {
    if (this.user) {
      let modal = this.modalCtrl.create(EditStadiumPage);
      modal.present();
    }
  }

  handleStadiumTapped(stadium) {
    this.navCtrl.push(StadiumViewPage, { stadium: stadium, stadiumKey: stadium.$key })
  }

}
