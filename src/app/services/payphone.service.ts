import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from '../shared/config';
import { HttpClient } from '../shared/http-client';
import { PayphoneService } from '../models/payphone-service.model';
import { Credentials } from '../models/credentials.model';

@Injectable()
export class PayphoneService_ {
  constructor(private http: HttpClient) { }
  create(payphoneService: PayphoneService): Observable<PayphoneService> {
    return this.http.post(`${config.url.ocs}payphone-services`,
      payphoneService)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error ||
        'Server error'));
  }

  get(value: string, access = 'id'): Observable<PayphoneService> {
    return this.http.get(
      `${config.url.ocs}payphone-services/${access}/${value}`)
      .map((res: Response) => res.json() as PayphoneService)
      .catch((error: any) => Observable.throw(error.json().message ||
        'Server error'));
  }

  update(payphoneService: PayphoneService, value: string, access = 'id'): Observable<PayphoneService> {
    return this.http.put(`${config.url.ocs}payphone-services/${access}/${value}`, payphoneService)
      .map((res: Response) => res.json() as PayphoneService)
      .catch((error: any) => Observable.throw(error.json().message ||
        'Server error'));
  }

  topup(amount: number, payphoneServiceId: number, access = 'id') {
    return this.http.put(`${config.url.ocs}payphone-services/` + `${access}/${payphoneServiceId}/topup`, { amount })
      .map((res: Response) => res.json() as PayphoneService)
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  setBalance(amount: number, payphoneServiceId: number, access = 'id') {
    return this.http.put(`${config.url.ocs}payphone-services/` + `${access}/${payphoneServiceId}/set-balance`, { amount })
      .map((res: Response) => res.json() as PayphoneService)
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  delete(id: number, access = 'id'): Observable<PayphoneService> {
    return this.http.delete(
      `${config.url.ocs}payphone-services/${access}/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error ||
        'Server error'));
  }

  disable(id: number, status: Object): Observable<any> {
    return this.http.put(`${config.url.ocs}payphone-services/` + `${id}/status`, status)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  all(search: Object): Observable<any> {
    return this.http.get(
      `${config.url.ocs}payphone-services`, search)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error ||
        'Server error'));
  }

  generatePassword(): Observable<Credentials> {
    return this.http.get(`${config.url.middleware}generate-password`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error ||
        'Server error'));
  }
}
