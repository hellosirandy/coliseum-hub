import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { FirebaseConfig } from '../environments/environment';

@Injectable()
export class StorageService {
  constructor() {
    const firebaseApp = firebase.initializeApp(FirebaseConfig);
  }
}
