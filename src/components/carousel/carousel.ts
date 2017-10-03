import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
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
  @Output() stadiumTapped = new EventEmitter<any>();
  
  currentStadium: {name: string, properties: any[]}
  stadiumContent: any[]

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
    const stadium = this.content[currentIndex]
    this.currentStadium = {name: stadium.name, properties: this.generateCurrentStadium(stadium)}
  }

  generateCurrentStadium(stadium: Stadium) {
    let currentStadium = []
    for(let property in stadium) {
      if (property !== 'images') {
        let title, content
        if (property === 'openingDate') {
          title = 'opened'
        } else {
          title = property
        }
        if (stadium[property] instanceof Object) {
          content = Object.keys(stadium[property]).join(', ')
        } else {
          content = stadium[property]
        }
        title = title.charAt(0).toUpperCase()+title.slice(1)
        content = decodeURI(content)
        currentStadium.push({ title, content })
      }
    }
    return currentStadium
  }

  handleSlideTap(stadium) {
    this.stadiumTapped.emit(stadium)
  }

}
