import { Component } from '@angular/core'
import { NavController, Platform } from 'ionic-angular'
import { DatabaseService } from '../../providers/database.service'
import { ImageService } from '../../providers/image.service'

import { Stadium } from '../../models/stadium'

import { StadiumViewPage } from '../stadium-view/stadium-view'

import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  items: Stadium[]=[]
  allStadiums: Stadium[]=[]
  searchType='name'
  searchInput: string
  mobile: boolean
  stadiumObs:Subscription
  

  constructor(
    private database: DatabaseService,
    private imageService: ImageService,
    private navCtrl: NavController,
    platform: Platform
  ) {
    this.mobile = platform.is('mobile')
  }

  ionViewDidLoad() {
    this.stadiumObs = this.database.getAllStadium().subscribe((res: Stadium[]) => {
      this.allStadiums = res
      this.handleSearchInput(this.searchInput)
    })
  }

  ionViewWillUnload() {
    this.stadiumObs.unsubscribe()
  }

  handleSearchInput(val: string) {
    if (val && val.trim() !== '') {
      this.items = this.allStadiums.filter((stadium: Stadium) => {
        return stadium[this.searchType].toLowerCase().includes(val.toLowerCase())
      })
    } else {
      this.items = []
    }
  }

  handleStadiumTapped(stadium) {
    this.navCtrl.push(StadiumViewPage, { stadium: stadium, stadiumKey: stadium.$key })
  }

  handleSearchTypeChange(event) {
    this.handleSearchInput(this.searchInput)
  }

  getThumbnail(images) {
    if (images) {
      return this.imageService.getThumbnail(images[0], 200)
    }
  }

}
