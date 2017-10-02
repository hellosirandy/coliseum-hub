import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { LeagueViewPage } from '../league-view/league-view';
import { EditStadiumPage } from '../edit-stadium/edit-stadium';

import { AuthService } from '../../providers/auth.service';
import { DatabaseService } from '../../providers/database.service';

import { Leagues } from '../../statics/sports-leagues-teams'
import { Stadium } from '../../models/stadium'
import { League } from '../../models/league'

import * as shuffle from 'shuffle-array'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user=null;
  mlbStadiums:Stadium[]=[]
  nflStadiums:Stadium[]=[]

  carousels: any={}
  carouselsName: League[]

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
    this.database.getLeagueStadium('MLB').subscribe((res: Stadium[]) => {
      this.mlbStadiums = shuffle.pick(res, {'picks': 6})
    })
    this.database.getLeagueStadium('NFL').subscribe((res: Stadium[]) => {
      this.nflStadiums = shuffle.pick(res, {'picks': 6})
    })
    this.generateCarousel()
  }
  
  generateCarousel() {
    this.carouselsName = shuffle.pick(Leagues, {'picks': 4})
    for (let league of this.carouselsName) {
      this.carousels[league.name] = []
      this.database.getLeagueStadium(league.name).subscribe((res: Stadium[]) => {
        this.carousels[league.name] = shuffle.pick(res, {'picks': 6})
      })
    }
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
