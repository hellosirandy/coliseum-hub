import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StadiumViewPage } from '../stadium-view/stadium-view';

import { Stadium } from '../../models/stadium';

import { DatabaseService } from '../../providers/database.service';

@Component({
  selector: 'page-league-view',
  templateUrl: 'league-view.html',
})
export class LeagueViewPage {
  title: string='';
  stadiums: Stadium[];

  constructor(
    private database: DatabaseService,
    private navCtrl: NavController,
    private navParams: NavParams,
  ) {
  }

  ionViewDidLoad() {
    const league = this.navParams.get('league');
    this.title = league;
    this.database.getLeagueStadium(league).subscribe((res: Stadium[]) => {
      this.stadiums = res;
    });
  }

  handleStadiumTap(stadium) {
    this.navCtrl.push(StadiumViewPage, { stadium: stadium });
  }

}
