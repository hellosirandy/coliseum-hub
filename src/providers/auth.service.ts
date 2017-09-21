import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';

@Injectable()
export class AuthService {
  private authState: Observable<firebase.User>;
  private currentUser: firebase.User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private platform: Platform,
  ) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  getAuthState():Observable<any> {
    return this.authState;
  }

  signInWithGoogle() {
    return this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider() );
  }

  signInWithFacebook() {
    if (this.platform.platforms().indexOf('mobile') > -1) {
      return this.afAuth.auth.signInWithRedirect( new firebase.auth.FacebookAuthProvider() );
    } else {
      return this.afAuth.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider() );
    }
  }

  isSignedIn() {
    if (this.currentUser == null) {
      return false;
    }
    return true;
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  updateUserProfile(updates) {
    return this.currentUser.updateProfile(updates);
  }

}
