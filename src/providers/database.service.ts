import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
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

  updateStadium(key: string, updates:any):firebase.Promise<any> {
    return this.database.object(`/stadiums/${key}`).update(updates);
  }

  getStadium(key: string): FirebaseObjectObservable<Stadium> {
    return this.database.object(`/stadiums/${key}`);
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

  getPropertyStadium(property: string, value: any):FirebaseListObservable<Stadium[]> {
    let query
    switch(property){
      case 'capacity':
        query = {
          orderByChild: property,
          startAt: value
        }
        break
      case 'openingDate':
        const date = new Date(new Date().setFullYear(new Date().getFullYear() - value))
        const dateString = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
        query = {
          orderByChild: property,
          endAt: dateString
        }
        break
      default:
        query = {
          orderByChild: property,
          equalTo: value
        }
    }
    return this.database.list('/stadiums', { query });
  }
}
