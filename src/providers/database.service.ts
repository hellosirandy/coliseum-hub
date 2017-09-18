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
    console.log(stadium);
    return this.database.list('/stadiums').push(stadium);
  }
}
