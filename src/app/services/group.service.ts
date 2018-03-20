import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from '../shared/config';
import { HttpClient } from '../shared/http-client';
import { Group } from '../models/group.model';

@Injectable()
export class GroupService {
  constructor(private http: HttpClient) { }
  create(group: Group): Observable<Group> {
    return this.http.post(`${config.url.ocs}groups`, group)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error ||
        'Server error'));
  }

  get(id: number): Observable<Group> {
    return this.http.get(`${config.url.ocs}groups/${id}`)
      .map((res: Response) => res.json() as Group)
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  update(group: Group, id: number): Observable<Group> {
    return this.http.put(`${config.url.ocs}groups/${id}`, group)
      .map((res: Response) => res.json() as GroupService)
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  delete(id: number): Observable<Group> {
    return this.http.delete(`${config.url.ocs}groups/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  all(search: Object = {}): Observable<any> {
    return this.http.get(`${config.url.ocs}groups`, search)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
