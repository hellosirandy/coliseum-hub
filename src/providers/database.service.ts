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

  getLeagueStadium(league: string) {
    return <FirebaseListObservable<Stadium[]>>this.database.list('/stadiums', {
      query: {
        orderByChild: `leagues/${league}`,
        equalTo: true
      }
    });
  }
}
