import { Component } from '@angular/core';
import { MenuItem } from '../../models/menu-item';
@Component({
  selector: 'menu-list',
  templateUrl: 'menu-list.html'
})
export class MenuListComponent {

  baseballList: MenuItem[] = [
    {title: 'MLB', thumbnail: 'assets/images/mlb.png', collapse: []},
    {title: 'NPB', thumbnail: 'assets/images/npb.png', collapse: []},
  ];
  footballList: MenuItem[] = [
    {title: 'NFL', thumbnail: 'assets/images/nfl.png', collapse: []},
  ];
  basketballList: MenuItem[] = [
    {title: 'NBA', thumbnail: 'assets/images/nba.png', collapse: []},
  ];
  hockeyList: MenuItem[] = [
    {title: 'NHL', thumbnail: 'assets/images/nhl.png', collapse: []},
  ];
  menuList: MenuItem[] = [
    {title: 'Baseball', thumbnail: 'assets/images/baseball.png', collapse: this.baseballList},
    {title: 'Football', thumbnail: 'assets/images/football.png', collapse: this.footballList},
    {title: 'Basketball', thumbnail: 'assets/images/basketball.png', collapse: this.basketballList},
    {title: 'Hockey', thumbnail: 'assets/images/hockey.png', collapse: this.hockeyList},
  ];

  focusSport: string;

  constructor() {

  }

  handleSportClick(sport) {
    if (this.focusSport !== sport) {
      this.focusSport = sport;
    } else {
      this.focusSport = '';
    }
  }

}
