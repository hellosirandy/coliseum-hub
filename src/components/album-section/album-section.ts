import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'

import { Stadium } from '../../models/stadium'

import { ImageService } from '../../providers/image.service'

@Component({
  selector: 'album-section',
  templateUrl: 'album-section.html'
})
export class AlbumSectionComponent implements OnChanges {
  @Input() stadium:Stadium
  @Output() imageClick = new EventEmitter<number>()

  images:string[]=[]

  constructor(
    private imageService: ImageService,
  ) {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stadium.currentValue !== changes.stadium.previousValue) {
      this.images = this.stadium.images ? this.stadium.images : []
    }
  }

  getThumbnail(url) {
    return this.imageService.getThumbnail(url, 200)
  }

  handleImageClick(index) {
    this.imageClick.emit(index)
  }

}
