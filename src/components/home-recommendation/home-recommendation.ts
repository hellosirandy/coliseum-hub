import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core'

import { DatabaseService } from '../../providers/database.service'

import { FirebaseListObservable } from 'angularfire2/database';

import { Subscription } from 'rxjs/Subscription'

import { Stadium } from '../../models/stadium'

import * as shuffle from 'shuffle-array'

@Component({
  selector: 'home-recommendation',
  templateUrl: 'home-recommendation.html'
})
export class HomeRecommendationComponent implements OnInit, OnDestroy {
  @Input() type:string
  @Input() title:string
  @Output() stadiumTapped = new EventEmitter<Stadium>()

  stadiums: any[] = []
  stadiumObs:Subscription

  constructor(
    private database: DatabaseService
  ) {
    
  }

  ngOnInit() {
    let obs:FirebaseListObservable<Stadium[]> = this.type === 'league' ? this.database.getLeagueStadium(this.title) 
      : this.database.getPropertyStadium(this.type, this.title)
    this.stadiumObs = obs.take(1).subscribe(res => {
      this.stadiums = shuffle.pick(res, {'picks': 12})
    })
  }

  ngOnDestroy() {
    this.stadiumObs.unsubscribe()
  }

}
