import { Component } from '@angular/core';
import { NavParams, Platform, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-image-slider',
  templateUrl: 'image-slider.html',
})
export class ImageSliderPage {

  images:string[]=[]
  ios: boolean=false
  initialSlide: number=0

  constructor(
    navParams: NavParams,
    platform: Platform,
    private viewCtrl: ViewController,
  ) {
    this.images = navParams.get('images') ? navParams.get('images') : []
    this.initialSlide = navParams.get('index')
    this.ios = platform.is('ios')
  }

  ionViewDidLoad() {
    
  }

  handleCloseClick() {
    this.viewCtrl.dismiss()
  }

}
