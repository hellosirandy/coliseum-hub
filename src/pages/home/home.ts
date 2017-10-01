import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { LeagueViewPage } from '../league-view/league-view';
import { EditStadiumPage } from '../edit-stadium/edit-stadium';

import { AuthService } from '../../providers/auth.service';
import { DatabaseService } from '../../providers/database.service';

import { Leagues } from '../../statics/sports-leagues-teams'
import { Stadium } from '../../models/stadium'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  user=null;
  mlbStadiums:Stadium[]=[];

  category: any={}
  
  constructor(
    private auth: AuthService,
    private database: DatabaseService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
  ) {

  }

  ngOnInit() {
    this.database.getLeagueStadium('MLB').subscribe((res: Stadium[]) => {
      this.mlbStadiums = res.slice(0, 6)
    })
  }

  ionViewDidLoad() {
    this.auth.getAuthState().subscribe(user => {
      this.user = user;
    });
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

}
