import { Component } from '@angular/core';

/**
 * Generated class for the AlbumSectionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'album-section',
  templateUrl: 'album-section.html'
})
export class AlbumSectionComponent {

  text: string;

  constructor() {
    console.log('Hello AlbumSectionComponent Component');
    this.text = 'Hello World';
  }

}
