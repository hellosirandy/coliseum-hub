import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { FirebaseConfig } from '../environments/environment';

@Injectable()
export class StorageService {
  storage:firebase.storage.Storage=null;

  constructor() {
    firebase.initializeApp(FirebaseConfig);
    this.storage = firebase.storage();
  }

  uploadFile(file, progress, finish) {
    const d = new Date().getTime().toString();
    const filename = d + file.name;
    const ref = this.storage.ref('images/' + filename);
    const task = ref.put(file);
    task.on('state_changed',
      progress,
      (err) => {
        console.log(err);
      },
      () => {
        finish(task.snapshot)
      }
    )
  }
}
