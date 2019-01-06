import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {LoginPageComponent} from './users/login-page/login-page.component';
import {LoginGuard} from './users/guard/login.guard';

export const ROUTES: Routes = [
  {path: '', component: HomePageComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  {path: 'sign-in', component: LoginPageComponent, canActivate: [LoginGuard]},
];
