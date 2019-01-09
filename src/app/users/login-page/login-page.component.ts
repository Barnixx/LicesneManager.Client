import {AfterViewInit, Component, OnInit} from '@angular/core';
import {IdentityService} from '../shared/identity/identity.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth/auth.service';
import {Router} from '@angular/router';
import {SignInModel} from '../shared/sign-in.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, AfterViewInit {

  hide = true;
  model: SignInModel;
  loginForm: FormGroup;
  credentialsError = false;

  constructor(private identityService: IdentityService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    // console.log(this.authService.isUserLogged$.getValue());
    // if (this.authService.isAuthenticated()) {
    //   this.router.navigate(['/']);
    // }
    this.model = new SignInModel();
    this.loginForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required
      ])
    });
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is <strong>required</strong>' :
      this.email.hasError('email') ? 'Please enter a valid email address' :
        '';
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.model.email = this.loginForm.get('email').value;
      this.model.password = this.loginForm.get('password').value;
      this.identityService.signIn(this.model).subscribe(token => {
        const isSessionStored = !this.model.rememberMe;
        this.authService.setAccessToken(token.accessToken, isSessionStored);
        this.router.navigate(['/']);
      }, (error) => {
        if (error.error.code === 'invalid_credentials') {
          this.credentialsError = true;
        }
      });
    }
  }

  ngAfterViewInit(): void {

  }
}
