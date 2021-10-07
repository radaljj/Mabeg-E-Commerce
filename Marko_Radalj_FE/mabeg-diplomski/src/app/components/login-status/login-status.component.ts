import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;


  constructor(private oktaServis:OktaAuthService) { }

  ngOnInit(): void {
    this.oktaServis.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    );
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
    this.oktaServis.signOut();
  }

  getUserDetails() {
    if (this.isAuthenticated) {

      // Fetch the logged in user details (user's claims)
      //
      // user full name is exposed as a property name
      this.oktaServis.getUser().then(
        (res) => {
          this.userFullName = res.name!;
        }
      );
    }
  }



}
