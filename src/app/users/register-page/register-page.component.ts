import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SignUpModel} from '../shared/sign-up.model';
import {PasswordValidator} from '../shared/password-validator';
import {IdentityService} from '../shared/identity/identity.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  showSpinner = true;
  hide = true;
  model: SignUpModel;
  registerForm: FormGroup;
  credentialsError = false;
  validMessage: string;

  constructor(private fb: FormBuilder, private identityService: IdentityService, private router: Router) {

    this.model = new SignUpModel();

  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'username': new FormControl('', []),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      'confirm_password': new FormControl('', Validators.required)
    }, {
      validator: PasswordValidator.passwordMatchValidator
    });
    this.showSpinner = false;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.showSpinner = true;
      this.model.email = this.registerForm.get('email').value;
      this.model.password = this.registerForm.get('password').value;
      this.model.userName = this.registerForm.get('username').value;
      this.identityService.signUp(this.model).subscribe(() => {
        this.router.navigate(['/']);
        this.showSpinner = false;
      }, (error) => {
        if (error.error.message) {
          this.credentialsError = true;
          this.validMessage = error.error.message;
          this.showSpinner = false;
        }
      });
    }
  }


  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.get('confirm_password');
  }



}
