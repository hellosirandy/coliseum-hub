import { Component, Input } from '@angular/core'

import { Stadium } from '../../models/stadium'

@Component({
  selector: 'carousel',
  templateUrl: 'carousel.html'
})
export class CarouselComponent {
  @Input() content: Stadium[]

  constructor() {
    
  }

}
