import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from '../shared/config';
import { HttpClient } from '../shared/http-client';
import { Prefix } from '../models/prefix.model';

@Injectable()
export class PrefixService {

  constructor(private http: HttpClient) { }
  create(prefix: Prefix): Observable<Prefix> {
    return this.http.post(`${config.url.ocs}prefixes`, prefix)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get(id:number): Observable<Prefix> {
    return this.http.get(`${config.url.ocs}prefixes/${id}`)
      .map((res: Response) => res.json() as Prefix)
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  update(prefix: Prefix, id: number): Observable<Prefix> {
    return this.http.put(`${config.url.ocs}prefixes/${id}`, prefix)
      .map((res: Response) => res.json() as Prefix)
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  delete(id: number): Observable<Prefix> {
    return this.http.delete(`${config.url.ocs}prefixes/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  all(search: Object = {}): Observable<any> {
    return this.http.get(`${config.url.ocs}prefixes`, search)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
