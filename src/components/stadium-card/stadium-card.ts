import { Component, Input } from '@angular/core';

import { Stadium } from '../../models/stadium';

import { ImageService } from '../../providers/image.service';

@Component({
  selector: 'stadium-card',
  templateUrl: 'stadium-card.html'
})
export class StadiumCardComponent {
  @Input() stadium:Stadium=null;
  

  constructor(
    private imageService: ImageService,
  ) {

  }

}
