import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomePageComponent} from './home-page/home-page.component';
import {CustomMaterialModule} from './custom-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {ConfigService} from './shared/services/config/config.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './shared/services/auth/auth.service';
import {UsersModule} from './users/users.module';
import {JwtModule} from '@auth0/angular-jwt';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import {LicenseComponent} from './licenses/license/license.component';
import {IdentityService} from './users/shared/identity/identity.service';
import {LicenseService} from './licenses/shared/license.service';
import {AddLicenseComponent} from './licenses/add-license/add-license.component';


// registerLocaleData(localePl, 'pl');
export function tokenGetter() {
  if (localStorage.getItem('access_token')) {
    return localStorage.getItem('access_token');
  }
  if (sessionStorage.getItem('access_token')) {
    return sessionStorage.getItem('access_token');
  }
  return null;
}
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LicenseComponent,
    AddLicenseComponent,
  ],
  entryComponents: [
    AddLicenseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      enableTracing: true
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['https://localhost:5001'],
      }
    }),
    BrowserAnimationsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    UsersModule
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'pl' },
    ConfigService,
    AuthService,
    IdentityService,
    LicenseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
