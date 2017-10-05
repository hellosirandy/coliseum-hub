import { Component } from '@angular/core'
import { ModalController, NavController, NavParams } from 'ionic-angular'
import { StadiumViewPage } from '../stadium-view/stadium-view'
import { EditStadiumPage } from '../edit-stadium/edit-stadium'

import { Stadium } from '../../models/stadium'

import { AuthService } from '../../providers/auth.service'
import { DatabaseService } from '../../providers/database.service'

import { Subscription } from 'rxjs/Subscription'

import { League } from '../../models/league'

@Component({
  selector: 'page-league-view',
  templateUrl: 'league-view.html',
})
export class LeagueViewPage {
  title: string=''
  stadiums: Stadium[]
  user=null
  userObs:Subscription
  stadiumObs:Subscription
  league: League
  
  constructor(
    private auth: AuthService,
    private database: DatabaseService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams,
  ) {
  }

  ionViewDidLoad() {
    this.league = this.navParams.get('league')
    this.title = this.league.name
    this.stadiumObs = this.database.getLeagueStadium(this.league.name).subscribe((res: Stadium[]) => {
      this.stadiums = res.sort(function(a, b) { return a.name.localeCompare(b.name)})
    })
    this.userObs = this.auth.getAuthState().subscribe(user => {
      this.user = user
    })
  }
  
  ionViewWillUnload() {
    this.userObs.unsubscribe()
    this.stadiumObs.unsubscribe()
  }

  handleStadiumTap(stadium) {
    this.navCtrl.push(StadiumViewPage, { stadium: stadium, stadiumKey: stadium.$key })
  }

  handleAddClick() {
    let modal = this.modalCtrl.create(EditStadiumPage, { fromLeague: this.league })
    modal.present()
  }

}
