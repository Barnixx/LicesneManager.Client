import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.removeAccessToken();
    this.router.navigate(['/sign-in']);
  }
}
