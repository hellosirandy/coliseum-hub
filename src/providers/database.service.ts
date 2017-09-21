import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Stadium } from '../models/stadium';

@Injectable()
export class DatabaseService {
  constructor(
    private database: AngularFireDatabase
  ) {

  }

  newStadium(stadium: Stadium) {
    return this.database.list('/stadiums').push(stadium);
  }

  updateStadium(id: string, updates:any) {
    return this.database.list('/stadiums').update(id, updates);
  }

  getLeagueStadium(league: string):FirebaseListObservable<Stadium[]> {
    return this.database.list('/stadiums', {
      query: {
        orderByChild: `leagues/${league}`,
        equalTo: true
      }
    });
  }

  getAllStadium():FirebaseListObservable<Stadium[]> {
    return this.database.list('/stadiums');
  }
}
