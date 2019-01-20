import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {PagedResult} from '../models/paged-result';
import {environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  body: {},
  observe: 'response' as 'body',
  params: {}
};

export abstract class BaseApiService {

  protected apiURL = environment.apiUrl;

  protected constructor(private http: HttpClient, private authService: AuthService) {
  }

  protected get<TData>(url: string, params?: any, isProteted: boolean = false): Observable<TData> {
    return this.request<TData>('GET', url, null, params, isProteted)
      .pipe(map(response => {
        console.log(response);
        return response.body;
      }));
  }

  protected pagedResult<TData extends Object>(type: (new () => TData), url: string, params?: any, isProtected: boolean = false)
    : Observable<PagedResult<TData>> {
    return this.request<PagedResult<TData>>('GET', url, null, params, isProtected)
      .pipe(map(response => {
        console.log(response);
        const result = new PagedResult<TData>();
        const items: Array<TData> = [];
        // for (let i = 0; i < response.body.items.length; i++) {
        //   items.push(Object.assign(new type, response.body.items[i]));
        // }
        if (!(response.body.items === undefined)) {
          response.body.items.forEach(x => items.push(Object.assign(new type, x)));
        }
        Object.assign(result, response.body);
        result.items = items;
        return result;
      }));
  }

  protected post<TData>(url: string, data: any, isProtected: boolean = false): Observable<TData> {
    return this.request<TData>('POST', url, data, null, isProtected)
      .pipe(map(response => {
        console.log(response);
        return response.body;
      }));
  }

  protected put<TData>(url: string, data: any, isProtected: boolean = false): Observable<TData> {
    return this
      .request<TData>('PUT', url, data, null, isProtected)
      .pipe(map(response => response.body));
  }

  protected delete<TData>(url: string, isProtected: boolean = false): Observable<TData> {
    return this.request('DELETE', url, null, null, isProtected)
      .pipe(map(response => response.body));
  }

  private request<TData>(method: string, url: string, data?: TData, params?: any, isProtected: boolean = false)
    : Observable<HttpResponse<TData>> {
    const options = Object.assign({}, httpOptions);
    if (isProtected) {
      const token = this.authService.getAccessToken();
      options.headers = httpOptions.headers.append('Authorization', 'Bearer ' + token);
    }
    console.log(document.cookie.search('XSRF-TOKEN'));
    options.body = data;
    options.params = params;
    return this.http.request<HttpResponse<TData>>(method, `${this.apiURL}/${url}`, options);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
