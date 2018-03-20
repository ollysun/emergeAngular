import { Injectable } from '@angular/core';
import { ProductPostpaid } from '../models/postpaid.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from '../shared/config'

@Injectable()
export class PostpaidService {
  constructor(private http: Http) { }
  createPostpaid(postpaid: ProductPostpaid): Observable<ProductPostpaid> {
    return this.http.post(`${config.url.bssPo}products/postpaid`, { postpaid })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPostpaid(access: string = 'id'): Observable<ProductPostpaid> {
    return this.http.get(`${config.url.bssPo}products/postpaid/${access}`)
      .map((res: Response) => res.json() as ProductPostpaid)
      .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
  }

  updatePostpaidService(id: number, postpaid: ProductPostpaid): Observable<ProductPostpaid> {
    const url = `${config.url.bssPo}products/postpaid/${id}`;
    return this.http.put(url, { postpaid })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(id: number): Observable<ProductPostpaid> {
    return this.http.delete(`${config.url.bssPo}products/postpaid/${id}}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
