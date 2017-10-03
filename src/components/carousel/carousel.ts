import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'

import { Stadium } from '../../models/stadium'

import { ImageService } from '../../providers/image.service'
import { League } from '../../models/league'

@Component({
  selector: 'carousel',
  templateUrl: 'carousel.html'
})
export class CarouselComponent implements OnChanges {
  @Input() content: Stadium[]

  constructor(
    private imageService: ImageService
  ) {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  getSliderImage(url: string) {
    return this.imageService.getThumbnail(url, 800)
  }

  getLeagueIcon(url: string) {
    return this.imageService.getLeagueIcon(url)
  }

}
