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
  leagueCategory: any={}
  sportCategory: any={}

  constructor(
    private database: DatabaseService,
  ) {

  }

  ngOnInit() {
    this.menuList = Sports.map(sport => {
      return <MenuItem>{
        title: sport.name,
        thumbnail: sport.logo,
        collapse: Leagues.filter(league => {return league.sport.name === sport.name}).map(league => {
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
      this.leagueCategory = {}
      this.sportCategory = {}
      stadiums.forEach(stadium => {
        for (let league in stadium.leagues) {
          if (this.leagueCategory[league]) {
            this.leagueCategory[league]++
          } else {
            this.leagueCategory[league] = 1
          }
        }
        for (let sport in stadium.sports)  {
          if (this.sportCategory[sport]) {
            this.sportCategory[sport]++
          } else {
            this.sportCategory[sport] = 1
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

  getMaxHeight(l, sport) {
    return { 
      maxHeight: this.focusSport === sport ? `${65 * l}px` : '0px',
      transition: `max-height ${0.1 * l}s ease`
    }
  }

}
