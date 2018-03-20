import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from '../shared/config';
import { HttpClient } from '../shared/http-client';
import { TariffVersion } from '../models/tariff-version.model';
import { Tariff } from '../models/tariff.model';

@Injectable()
export class TariffService {
  constructor(private http: HttpClient) { }

  create(tariffVersion: TariffVersion): Observable<TariffVersion> {
    return this.http.post(`${config.url.ocs}tariff-versions`, tariffVersion)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error ||
        'Server error'));
  }

  clone(data: Object = {}): Observable<any> {
    return this.http.post(`${config.url.ocs}clone-tariff-versions`, data)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error ||
        'Server error'));
  }

  find(value: string, access = 'id'): Observable<TariffVersion> {
    return this.http.get(`${config.url.ocs}tariff-versions/${access}/${value}`)
      .map((res: Response) => res.json() as TariffVersion)
      .catch((error: any) => Observable.throw(error.json().message ||
        'Server error'));
  }

  update(tariffVersion: TariffVersion, id: number): Observable<TariffVersion> {
    return this.http.put(`${config.url.ocs}tariff-versions/${id}`,
      tariffVersion).map((res: Response) => res.json() as TariffVersion)
      .catch((error: any) => Observable.throw(error.json().message ||
        'Server error'));
  }

  delete(id: number): Observable<TariffVersion> {
    return this.http.delete(`${config.url.ocs}tariff-versions/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error ||
        'Server error'));
  }

  all(search: Object = {}): Observable<any> {
    return this.http.get(`${config.url.ocs}tariff-versions`, search)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error ||
        'Server error'));
  }

  // Tariff (Price Configuration) Service
  createTariff(tariff: Tariff): Observable<Tariff> {
    return this.http.post(`${config.url.ocs}tariffs`, tariff)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error ||
        'Server error'));
  }

  findTariff(value: string, access = 'id'): Observable<Tariff> {
    return this.http.get(`${config.url.ocs}tariffs/${access}/${value}`)
      .map((res: Response) => res.json() as Tariff)
      .catch((error: any) => Observable.throw(error.json().message ||
        'Server error'));
  }

  updateTariff(tariff: Tariff, id: number): Observable<Tariff> {
    return this.http.put(`${config.url.ocs}tariffs/${id}`, tariff)
      .map((res: Response) => res.json() as Tariff)
      .catch((error: any) => Observable.throw(error.json().message ||
        'Server error'));
  }

  deleteTariff(id: number): Observable<Tariff> {
    return this.http.delete(`${config.url.ocs}tariffs/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error ||
        'Server error'));
  }


  allTariff(search: Object = {}): Observable<any> {
    return this.http.get(`${config.url.ocs}tariffs`, search)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error ||
        'Server error'));
  }
}
