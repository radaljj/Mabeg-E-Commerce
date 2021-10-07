import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import myAppConfig from 'src/app/config/my-app-config';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

oktaSignin:any;

  constructor(private oktaSevis:OktaAuthService) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/providni_logo.png',
      features:{registration:true},
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    });
   }

   ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'}, 
      (response) => {
        if (response.status === 'SUCCESS') {
          this.oktaSevis.signInWithRedirect();
        }
      },
      (error) => {
        throw error;
      }
    );
  }

}
