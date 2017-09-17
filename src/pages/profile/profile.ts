import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {
  user = null;

  constructor(
    private auth: AuthService,
  ) {
  }

  ngOnInit() {
    this.auth.getAuthState().subscribe(user => {
      this.user = user;
    });
  }

  handleSignInWithGoogleClick() {
    this.auth.signInWithGoogle().then(user => {
      console.log(user);
    });
  }

  handleSignInWithFacebookClick() {
    this.auth.signInWithFacebook().then(user => {
      console.log(user);
    });
  }

  handleSignOutClick() {
    this.auth.signOut();
  }

}
