import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from '../shared/config';
import { HttpClient } from '../shared/http-client';
import { User } from '../models/user.model';
import { SessionService } from './session.service';
import { Credentials } from '../models/credentials.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private sessionService: SessionService) { }
  private redirectURL: string = null;
  getRedirectURL(): string {
    return this.redirectURL;
  }

  setRedirectURL(url: string) {
    this.redirectURL = url;
    return url;
  }

  login(credentials: Credentials): Observable<User> {
    return this.http.post(`${config.url.middleware}user/login`, credentials)
      .map((res: Response) => this.sessionService.setCurrentUser(res.json()))
      .catch((error: any) => Observable.throw(error.json() ||
        'Server error'));
  }

  logout(): Observable<any> {
    return this.http.get(`${config.url.middleware}user/logout`)
      .map((res: Response) => this.sessionService.setCurrentUser(null))
      .catch((error: any) => Observable.throw(error.json() ||
        'Server error'));
  }

  session(): Observable<User> {
    console.log('fetching session');
    return this.http.get(`${config.url.middleware}user/session`)
      .map((res: Response) => this.sessionService.setCurrentUser(res.json()))
      .catch((error: any) => Observable.throw(error.json() ||
        'Server error'));
  }

  create(user: User): Observable<User> {
    return this.http.post(`${config.url.middleware}users`, user)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() ||
        'Server error'));
  }

  get(id: number): Observable<User> {
    return this.http.get(`${config.url.middleware}users/${id}`)
      .map((res: Response) => res.json() as User)
      .catch((error: any) => Observable.throw(error.json().message ||
        'Server error'));
  }

  update(user: User, id: number): Observable<User> {
    return this.http.put(`${config.url.middleware}users/${id}`, user)
      .map((res: Response) => res.json() as User)
      .catch((error: any) => Observable.throw(error.json().message ||
        'Server error'));
  }

  delete(id: number): Observable<User> {
    return this.http.delete(`${config.url.middleware}users/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() ||
        'Server error'));
  }

  all(search: Object = {}): Observable<any> {
    return this.http.get(`${config.url.middleware}users`, search)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() ||
        'Server error'));
  }
}
