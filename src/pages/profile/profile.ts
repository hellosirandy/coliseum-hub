import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    private auth: AuthService,
  ) {
  }

  ionViewDidLoad() {

  }

  handleLoginClick() {
    this.auth.signInWithGoogle().then(user => {
      console.log(user);
    });
  }

}
