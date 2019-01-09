import {Injectable} from '@angular/core';
import {BaseApiService} from '../../shared/services/base-api.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../shared/services/auth/auth.service';
import {ConfigService} from '../../shared/services/config/config.service';
import {Observable} from 'rxjs';
import {PagedResult} from '../../shared/models/paged-result';
import {License} from '../../shared/models/license';

@Injectable({
  providedIn: 'root'
})
export class LicenseService extends BaseApiService {

  constructor(configService: ConfigService, http: HttpClient, authService: AuthService) {
    super(configService, http, authService);
  }

  browse(query): Observable<PagedResult<License>> {
    return super.pagedResult<License>(License, 'license', query, true);
  }

  update(license: License) {
    return super.put<License>('license', license, true);
  }
}
