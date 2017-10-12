import { Component } from '@angular/core';

/**
 * Generated class for the AboutSectionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'about-section',
  templateUrl: 'about-section.html'
})
export class AboutSectionComponent {

  text: string;

  constructor() {
    console.log('Hello AboutSectionComponent Component');
    this.text = 'Hello World';
  }

}
