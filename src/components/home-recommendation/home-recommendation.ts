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
    const width = window.innerWidth
    let picks = 10
    if (width < 768) {
      picks = 6
    } else if (width < 992) {
      picks = 8
    }
    let obs:FirebaseListObservable<Stadium[]> = this.type === 'league' ? this.database.getLeagueStadium(this.title) 
      : this.database.getPropertyStadium(this.type, this.title)
    this.stadiumObs = obs.take(1).subscribe(res => {
      this.stadiums = shuffle.pick(res, {'picks': picks})
    })
  }

  ngOnDestroy() {
    this.stadiumObs.unsubscribe()
  }

}
