import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from '../shared/config';
import { HttpClient } from '../shared/http-client';
import { SpecialDay } from '../models/special-day.model';

@Injectable()
export class SpecialDayService {

  constructor(private http: HttpClient) { }

  create(specialDay: SpecialDay): Observable<SpecialDay> {
    return this.http.post(`${config.url.ocs}special-days`, specialDay)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get(value: string, access = 'id'): Observable<SpecialDay> {
    return this.http.get(`${config.url.ocs}special-days/${access}/${value}`)
      .map((res: Response) => res.json() as SpecialDay)
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  update(specialDay: SpecialDay, id: number): Observable<SpecialDay> {
    return this.http.put(`${config.url.ocs}special-days/${id}`, specialDay)
      .map((res: Response) => res.json() as SpecialDay)
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  delete(id: number): Observable<SpecialDay> {
    return this.http.delete(`${config.url.ocs}special-days/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  all(search: Object = {}): Observable<any> {
    return this.http.get(`${config.url.ocs}special-days`, search)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
