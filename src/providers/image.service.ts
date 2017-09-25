import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {
  constructor() {

  }

  getThumbnail(url: string, type: "small" | "big"):string {
    const offsetString = 'images%2F'
    const index = url.indexOf(offsetString) + offsetString.length
    return url.slice(0, index) + type + 'thumb_' + url.slice(index)
  }
}