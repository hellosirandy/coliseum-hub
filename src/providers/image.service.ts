import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {
  constructor() {

  }

  getThumbnail(url: string, size: 100 | 200 | 400 | 800):string {
    const offsetString = 'images%2F'
    const index = url.indexOf(offsetString) + offsetString.length
    const thumbnailUrl = url.slice(0, index) + `thumb${size}_` + url.slice(index)
    return thumbnailUrl
  }
}