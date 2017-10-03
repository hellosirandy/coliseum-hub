import { Component, Input, ViewChild } from '@angular/core'
import { Slides } from 'ionic-angular';

import { Stadium } from '../../models/stadium'

import { ImageService } from '../../providers/image.service'

@Component({
  selector: 'carousel',
  templateUrl: 'carousel.html'
})
export class CarouselComponent {
  @ViewChild(Slides) slides: Slides
  @Input() content: Stadium[]

  currentStadium: Stadium;

  constructor(
    private imageService: ImageService
  ) {
    
  }

  getSliderImage(url: string) {
    return this.imageService.getThumbnail(url, 800)
  }

  getLeagueIcon(url: string) {
    return this.imageService.getLeagueIcon(url)
  }

  handleSlideChanged() {
    let currentIndex = this.slides.getActiveIndex()-1
    if (currentIndex == this.content.length) {
      currentIndex = 0
    }
    this.currentStadium = this.content[currentIndex]
  }

}
