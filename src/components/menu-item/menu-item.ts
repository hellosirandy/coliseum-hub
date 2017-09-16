import { Component, Input } from '@angular/core';
@Component({
  selector: 'menu-item',
  templateUrl: 'menu-item.html'
})
export class MenuItemComponent {
  @Input() thumbnail: string;
  @Input() title: string;
  @Input() collapse: boolean;

  constructor() {
    console.log(this.thumbnail);
  }

}
