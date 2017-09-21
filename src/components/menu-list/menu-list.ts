import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../../models/menu-item';
import { Sports, Leagues } from '../../statics/sports-leagues-teams';

import { DatabaseService } from '../../providers/database.service';

@Component({
  selector: 'menu-list',
  templateUrl: 'menu-list.html'
})
export class MenuListComponent implements OnInit {
  @Output() leagueChoosed = new EventEmitter<string>();
  menuList: MenuItem[]=[];

  focusSport: string;
  category: any={}

  constructor(
    private database: DatabaseService,
  ) {

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
    });
    this.database.getAllStadium().subscribe(stadiums => {
      stadiums.forEach(stadium => {
        for (let league in stadium.leagues) {
          if (this.category[league]) {
            this.category[league]++;
          } else {
            this.category[league] = 1;
          }
        }
      });
    });
  }

  handleSportTap(sport) {
    if (this.focusSport !== sport) {
      this.focusSport = sport;
    } else {
      this.focusSport = '';
    }
  }

}
