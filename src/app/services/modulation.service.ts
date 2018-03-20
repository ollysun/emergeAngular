import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from '../shared/config';
import { HttpClient } from '../shared/http-client';
import { Modulation } from '../models/modulation.model';

@Injectable()
export class ModulationService {

  constructor(private http: HttpClient) { }

  create(modulation: Modulation): Observable<Modulation> {
    return this.http.post(`${config.url.ocs}modulations`, modulation)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  find(value: string, access = 'id'): Observable<Modulation> {
    return this.http.get(`${config.url.ocs}modulations/${access}/${value}`)
      .map((res: Response) => res.json() as Modulation)
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  update(modulation: Modulation, id: number): Observable<Modulation> {
    return this.http.put(`${config.url.ocs}modulations/${id}`, modulation)
      .map((res: Response) => res.json() as Modulation)
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  delete(id: number): Observable<Modulation> {
    return this.http.delete(`${config.url.ocs}modulations/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  all(search: Object = {}): Observable<any> {
    return this.http.get(`${config.url.ocs}modulations`, search)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
