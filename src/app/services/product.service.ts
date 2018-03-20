import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from '../shared/config';
import { HttpClient } from '../shared/http-client';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }
  all(search: Object = {}): Observable<any> {
    console.log(search);
    return this.http.get(`${config.url.bssPo}products`, search)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
