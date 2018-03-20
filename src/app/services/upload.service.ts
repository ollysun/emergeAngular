import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '../shared/http-client';
import { Upload } from './../models/upload.model';
import { config } from '../shared/config';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) { }

  upload(body: any): Observable<any> {
    const url = `${config.url.bssPo}bank-statement/upload`;
    return this.http.post(url, body)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error
        || 'Server error'));
  }

  confirm(body: any): Observable<any> {
    const headers: Object = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const url = `${config.url.bssPo}bank-statement/confirm`;
    return this.http.post(url, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error
        || 'Server error'));
  }
}
