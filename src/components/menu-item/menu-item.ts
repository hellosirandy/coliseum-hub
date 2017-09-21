import { Component, Input } from '@angular/core';
@Component({
  selector: 'menu-item',
  templateUrl: 'menu-item.html'
})
export class MenuItemComponent {
  @Input() thumbnail: string;
  @Input() title: string;
  @Input() subtitle: number;
  @Input() collapse: boolean;

  constructor() {

  }

}
