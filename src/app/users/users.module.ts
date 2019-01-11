import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './login-page/login-page.component';
import {IdentityService} from './shared/identity/identity.service';
import {CustomMaterialModule} from '../custom-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RegisterPageComponent} from './register-page/register-page.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    IdentityService
  ]
})
export class UsersModule {
}
