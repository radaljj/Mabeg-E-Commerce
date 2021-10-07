import { ProizvodService } from 'src/app/services/proizvod.service';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProizvodListaComponent } from './components/proizvod-lista/proizvod-lista.component';
import { Routes,RouterModule, Router } from '@angular/router';
import { ProizvodKategorijaMeniComponent } from './components/proizvod-kategorija-meni/proizvod-kategorija-meni.component';
import { PretragaComponent } from './components/pretraga/pretraga.component';
import { ProizvodDetaljComponent } from './components/proizvod-detalj/proizvod-detalj.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/korpa-status/cart-status.component';
import { CartDetailsComponent } from './components/korpa-detalji/cart-details.component';
import { CheckoutComponent } from './components/kupovina/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OKTA_CONFIG, OktaAuthModule,OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import myAppConfig from './config/my-app-config';

const oktaConfig = Object.assign({
  onAuthRequired: (injector) => {
    const router = injector.get(Router);

    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const routes:Routes=[ 
{path: 'login/callback', component: OktaCallbackComponent},
{path: 'login', component: LoginComponent},

{path:'kupovina',component:CheckoutComponent},
{path:'korpa-detalji',component:CartDetailsComponent},
{path:'proizvodi/:id',component:ProizvodDetaljComponent},
{path:'search/:keyword',component:ProizvodListaComponent},
{path:'kategorija/:id',component:ProizvodListaComponent},
{path:'kategorija',component:ProizvodListaComponent},
{path:'proizvodi',component:ProizvodListaComponent},
{path:'',redirectTo:'/kategorija',pathMatch:'full'},
{path:'**',redirectTo:'/kategorija',pathMatch:'full'},

];

@NgModule({
  declarations: [
    AppComponent,
    ProizvodListaComponent,
    ProizvodKategorijaMeniComponent,
    PretragaComponent,
    ProizvodDetaljComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
  
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OktaAuthModule,
    
ToastrModule.forRoot(),
  ],
  providers: [ProizvodService,{provide:OKTA_CONFIG,useValue:oktaConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
