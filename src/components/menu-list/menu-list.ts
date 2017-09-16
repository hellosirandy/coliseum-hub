import { Component } from '@angular/core';
@Component({
  selector: 'menu-list',
  templateUrl: 'menu-list.html'
})
export class MenuListComponent {
  baseball: any[]=[{img: "assets/images/mlb.png", title: "MLB"}, {img: "assets/images/npb.png", title: "NPB"}]
  football: any[]=[{img: "assets/images/nfl.png", title: "NFL"}]
  basketball: any[]=[{img: "assets/images/nba.png", title: "NBA"}]
  hockey: any[]=[{img: "assets/images/nhl.png", title: "NHL"}]

  constructor() {

  }

}
