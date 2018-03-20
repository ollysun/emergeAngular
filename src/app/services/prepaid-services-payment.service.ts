import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from '../shared/config';
import { HttpClient } from '../shared/http-client';

@Injectable()
export class PrepaidServicesPaymentService {

  constructor(private http: HttpClient) { }

  create(data: Object = {}): Observable<any> {
    return this.http.post(`${config.url.bssPo}payments`, data)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error ||
        'Server error'));
  }
}
