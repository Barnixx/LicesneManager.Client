import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

const jwtTokenKey = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private isSessionStored: boolean;

  constructor(private jwtHelper: JwtHelperService) {
    this.isSessionStored = !!window.sessionStorage.getItem(jwtTokenKey);
    this.isUserLogged$.next(!!this.storage.getItem(jwtTokenKey));
  }

  private get storage() {
    return this.isSessionStored ? window.sessionStorage : window.localStorage;
  }

  public isAuthenticated(): boolean {
    const token = this.storage.getItem(jwtTokenKey);
    return !this.jwtHelper.isTokenExpired(token);
  }

  setAccessToken(accessToken: string, isSessionStored: boolean): void {
    this.isSessionStored = isSessionStored;
    this.storage.setItem(jwtTokenKey, accessToken);
    this.isUserLogged$.next(true);
  }

  getAccessToken(): string {
    return this.storage.getItem(jwtTokenKey);
  }

  removeAccessToken(): void {
    this.storage.removeItem(jwtTokenKey);
    this.isUserLogged$.next(false);
  }
}
