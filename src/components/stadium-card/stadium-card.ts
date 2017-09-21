import { Component, Input } from '@angular/core';

import { Stadium } from '../../models/stadium';

@Component({
  selector: 'stadium-card',
  templateUrl: 'stadium-card.html'
})
export class StadiumCardComponent {
  @Input() stadium:Stadium=null;
  

  constructor() {

  }

}
