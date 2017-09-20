import { Injectable } from '@angular/core';
import { Sports, Leagues, Teams } from '../statics/sports-leagues-teams';

@Injectable()
export class StaticService {
  constructor(

  ) {

  }

  getSports() {
    return Sports;
  }

  getLeagues(sports: string[]) {
    
  }
}
