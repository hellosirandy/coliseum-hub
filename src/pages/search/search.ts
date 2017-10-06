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
        if (this.searchType !== 'tenants') {
          return stadium[this.searchType].toLowerCase().includes(val.toLowerCase())
        } else {
          return this.keysIncludes(Object.keys(stadium.tenants), val.toLowerCase())
        }
      })
    } else {
      this.items = []
    }
  }

  keysIncludes(keys: string[], val: string):boolean {
    for (let key of keys) {
      if (key.toLowerCase().includes(val)) {
        return true
      }
    }
    return false
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

  getSubtitle(stadium: Stadium) {
    let result:string
    if (this.searchType !== 'tenants') {
      result =  stadium[this.searchType]
    } else {
      result =  decodeURI(Object.keys(stadium.tenants).join(', '))
    }
    return this.highlightSearchText(result)
  }

  getTitle(name: string) {
    if (this.searchType !== 'name') {
      return name
    } else {
      return this.highlightSearchText(name)
    }
  }

  highlightSearchText(fullText: string) {
    const start = fullText.toLowerCase().indexOf(this.searchInput.toLowerCase())
    const end = start + this.searchInput.length
    return fullText.slice(0, start) + '<strong>' + fullText.slice(start, end) + '</strong>' + fullText.slice(end)
  }

}
