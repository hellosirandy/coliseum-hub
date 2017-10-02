import { Component, Input } from '@angular/core'

import { Stadium } from '../../models/stadium'

import { ImageService } from '../../providers/image.service'
import { League } from '../../models/league'

@Component({
  selector: 'carousel',
  templateUrl: 'carousel.html'
})
export class CarouselComponent {
  @Input() content: Stadium[]
  @Input() league: League={name: null, logo: null, sport: null}

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

}
