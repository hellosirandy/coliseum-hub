import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { FirebaseConfig } from '../environments/environment';

@Injectable()
export class StorageService {
  storage:firebase.storage.Storage=null;

  constructor(
  ) {
    firebase.initializeApp(FirebaseConfig);
    this.storage = firebase.storage();
  }

  uploadSingleFile(file: File):Observable<string> {
    const d = new Date().getTime().toString();
    const filename = d + file.name;
    const ref = this.storage.ref('images/' + filename);
    const task = ref.put(file);
    return Observable.create(observer => {
        task.on('state_changed',
          null,
          null,
          () => {
            observer.next(task.snapshot.downloadURL);
            observer.complete();
          }
        );
    });
  }

  uploadMultipleFiles(files: File[]):Observable<string[]> {
    return Observable.create(observer => {
      Observable.forkJoin(
        files.map(file =>
          this.uploadSingleFile(file)
        )
      ).subscribe(urls => {
        observer.next(urls);
        observer.complete();
      });
    });
  }

  removeFile(url: string) {
    return Observable.create(observer => {
      let fileName = this.getFileName(url)
      const desertRef = this.storage.ref('images/' + fileName)
      desertRef.delete().then(res => {
        console.log('deleted', res)
      }).catch(res => {
        console.log('failed', res)
      })
      observer.next(this.getFileName(url))
      observer.complete()
    })
  }

  getFileName(url) {
    return url.substring(url.indexOf("images%2F")+9, url.indexOf("?alt=media"));
  }
}
