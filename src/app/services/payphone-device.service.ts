import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Config } from '../shared/config';
import { PayphoneDevice } from '../models/payphone-device.model';

@Injectable()
export class PayphoneDeviceService {
  constructor(private http: Http) { }
  create(payphoneDevice: PayphoneDevice): Observable<PayphoneDevice> {
    return this.http.post(`${Config.url.ocs}payphonedevices/provision/payphones`, { payphoneDevice })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  find(id: number): Observable<PayphoneDevice> {
    return this.http.get(`${Config.url.ocs}payphonedevices/provision/${id}`)
      .map((res: Response) => res.json() as PayphoneDevice)
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  delete(id: number): Observable<PayphoneDevice> {
    return this.http.delete(`${Config.url.ocs}payphonedevices/provision/payphones/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  all(query: string): Observable<Array<PayphoneDevice>> {
    return this.http.get(`${Config.url.ocs}payphonedevices/provision?${query}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
