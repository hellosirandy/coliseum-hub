import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database.service';
import { Stadium } from '../../models/stadium';

@Component({
  selector: 'page-league',
  templateUrl: 'league.html',
})
export class LeaguePage {
  title: string='';
  stadiums: Stadium[];

  constructor(
    private database: DatabaseService,
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

}
