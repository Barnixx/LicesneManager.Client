import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from '../../../shared/services/config/config.service';
import {BaseApiService} from '../../../shared/services/base-api.service';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {JwtModel} from '../jwt.model';
import {SignInModel} from '../sign-in.model';
import {SignUpModel} from '../sign-up.model';


@Injectable({
  providedIn: 'root'
})
export class IdentityService extends BaseApiService {

  constructor(configService: ConfigService, http: HttpClient, authService: AuthService) {
    super(configService, http, authService);
  }

  signUp(model: SignUpModel): Observable<any> {
    return super.post<any>('sign-up', model, false);
  }

  signIn(model: SignInModel): Observable<JwtModel> {
    return super.post<JwtModel>('sign-in', model, false);
  }


}
