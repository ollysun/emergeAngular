import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from '../shared/config';
import { HttpClient } from '../shared/http-client';
import { Zone } from '../models/zone.model';

@Injectable()
export class ZoneService {

  constructor(private http: HttpClient) { }
  create(zone: Zone): Observable<Zone> {
    return this.http.post(`${config.url.ocs}zones`, zone)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get(id: number): Observable<Zone> {
    return this.http.get(`${config.url.ocs}zones/${id}`)
      .map((res: Response) => res.json() as Zone)
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  update(zone: Zone, id: number): Observable<Zone> {
    return this.http.put(`${config.url.ocs}zones/${id}`, zone)
      .map((res: Response) => res.json() as Zone)
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  delete(id: number): Observable<Zone> {
    return this.http.delete(`${config.url.ocs}zones/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  all(search: Object = {}): Observable<any> {
    return this.http.get(`${config.url.ocs}zones`, search)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
