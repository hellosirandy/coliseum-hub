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

  uploadFile(file:File):firebase.storage.UploadTask {
    const d = new Date().getTime().toString();
    const filename = d + file.name;
    const ref = this.storage.ref('images/' + filename);
    return ref.put(file);
  }
}
