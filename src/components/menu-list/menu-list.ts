import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../../models/menu-item';
import { Sports, Leagues, Teams } from '../../statics/sports-leagues-teams';
@Component({
  selector: 'menu-list',
  templateUrl: 'menu-list.html'
})
export class MenuListComponent implements OnInit {
  @Output() leagueChoosed = new EventEmitter<string>();
  menuList: MenuItem[]=[];

  focusSport: string;

  constructor() {

  }

  ngOnInit() {
    this.menuList = Sports.map(sport => {
      return <MenuItem>{
        title: sport.name,
        thumbnail: sport.logo,
        collapse: Leagues[sport.name].map(league => {
          const logo = league.logo.split('.');
          return <MenuItem>{
            title: league.name,
            thumbnail: `${logo[0]}-64.${logo[1]}`,
            collapse: [],
          }
        }),
      }
    })
  }

  handleSportClick(sport) {
    if (this.focusSport !== sport) {
      this.focusSport = sport;
    } else {
      this.focusSport = '';
    }
  }

}
