import { Component, Input, OnInit } from '@angular/core';

import { Stadium } from '../../models/stadium';

import { ImageService } from '../../providers/image.service';

@Component({
  selector: 'stadium-card',
  templateUrl: 'stadium-card.html'
})
export class StadiumCardComponent implements OnInit {
  @Input() stadium:Stadium=null;
  imageUrl: string=null

  constructor(
    private imageService: ImageService,
  ) {
  }

  ngOnInit() {
    this.imageUrl = this.stadium.images ? this.imageService.getThumbnail(this.stadium.images[0], 400) : null
  }

  getThumbnail(images) {
    if (images) {
      return this.imageService.getThumbnail(images[0], 400)
    } else {
      return null
    }
  }

  imgError() {
    this.imageUrl = this.stadium.images[0]
  }

}
