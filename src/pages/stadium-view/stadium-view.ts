import { Component, ElementRef, ViewChild } from '@angular/core'
import { Content, ModalController, NavParams } from 'ionic-angular'
import { Stadium } from '../../models/stadium'
import { EditStadiumPage } from '../edit-stadium/edit-stadium'
import { ImageSliderPage } from '../image-slider/image-slider'

import { AuthService } from '../../providers/auth.service'
import { DatabaseService } from '../../providers/database.service'

import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'page-stadium-view',
  templateUrl: 'stadium-view.html',
})
export class StadiumViewPage {
  @ViewChild(Content) content: Content

  stadium:Stadium=null
  cover:string
  user=null

  userObs:Subscription
  stadiumObs: Subscription
  segment="about"

  constructor(
    private auth: AuthService,
    private database: DatabaseService,
    private elementRef: ElementRef,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.userObs = this.auth.getAuthState().subscribe(user => {
      this.user = user;
    });
    this.stadiumObs = this.database.getStadium(this.navParams.get('stadiumKey')).subscribe(stadium => {
      this.stadium = stadium;
      this.cover = stadium.images ? stadium.images[0] : null
    });
  }
  
  ionViewDidEnter() {
    const width = this.elementRef.nativeElement.offsetWidth
    const height = this.elementRef.nativeElement.offsetHeight
    if (width > height) {
      this.content.scrollToBottom()
    }
  }

  ionViewWillUnload() {
    this.userObs.unsubscribe()
    this.stadiumObs.unsubscribe()
  }

  handleEditClick() {
    const modal = this.modalCtrl.create(EditStadiumPage, { stadium: this.stadium })
    modal.present()
  }

  handleImageClick() {
    const modal = this.modalCtrl.create(
      ImageSliderPage, 
      { images: this.stadium.images }
    )
    modal.present()
  }

}
