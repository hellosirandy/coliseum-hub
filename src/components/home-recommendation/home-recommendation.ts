import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core'

import { DatabaseService } from '../../providers/database.service'
import { TranslateService } from '@ngx-translate/core'

import { FirebaseListObservable } from 'angularfire2/database'

import { Subscription } from 'rxjs/Subscription'

import { Stadium } from '../../models/stadium'

import * as shuffle from 'shuffle-array'

@Component({
  selector: 'home-recommendation',
  templateUrl: 'home-recommendation.html'
})
export class HomeRecommendationComponent implements OnInit, OnDestroy {
  @Input() type:string
  @Input() value:string
  @Output() stadiumTapped = new EventEmitter<Stadium>()

  stadiums: any[] = []
  stadiumObs:Subscription

  title: string
  subtitle: string

  constructor(
    private database: DatabaseService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit() {
    let obs:FirebaseListObservable<Stadium[]> = this.type === 'league' ? this.database.getLeagueStadium(this.value) 
      : this.database.getPropertyStadium(this.type, this.value)
    this.stadiumObs = obs.take(1).subscribe(res => {
      this.stadiums = shuffle.pick(res, {'picks': 6})
    })
    this.setTitle()
    this.setSubTitle()
  }

  ngOnDestroy() {
    this.stadiumObs.unsubscribe()
  }

  setTitle() {
    switch(this.type) {
      case 'capacity':
        this.title = this.value + '+'
        break
      case 'openingDate':
        this.translate.get('OVER_YEARS_AGO', {value: this.value}).subscribe(res => {
          this.title = res
        })
        break
      default:
        this.title = this.value
        break
    }
  }

  setSubTitle() {
    this.translate.get(this.typeToUpperCase()).subscribe(res => {
      this.subtitle = res
    })
  }

  typeToUpperCase():string {
    if (this.type === 'openingDate') {
      return 'OPENING_DATE'
    } else {
      return this.type.toUpperCase()
    }
  }

}
