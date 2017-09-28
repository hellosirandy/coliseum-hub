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

  getBackgroundImage(images) {
    if (images) {
      return this.imageService.getThumbnail(images[0], 400)
    } else {
      return null;
    }
  }

  imgError(image) {
    console.log('image error');
    // image.onerror = null;
    // setTimeout(function (){
    //   let img = new Image();
    //   img.src = image.src;
    //  }, 1000);
  }

}
