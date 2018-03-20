import { Injectable } from '@angular/core';
import { ServicePrepaid } from '../models/prepaid.model';
import { TeloAgent } from '../models/telo-agent.model';
import { Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from '../shared/config'
import { HttpClient } from '../shared/http-client';

@Injectable()
export class PrepaidService {
  constructor(private http: HttpClient) { }
  create(prepaid: ServicePrepaid): Observable<ServicePrepaid> {
    return this.http.post(`${config.url.bssPo}prepaid-services`, prepaid)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getById(id: number): Observable<ServicePrepaid> {
    return this.http.get(`${config.url.bssPo}prepaid-services/${id}`)
      .map((res: Response) => res.json() as ServicePrepaid)
      .catch((error: any) => Observable.throw(error.json().message
        || 'Server error'));
  }

  getByStatus(status: string): Observable<ServicePrepaid> {
    return this.http.get(`${config.url.bssPo}prepaid-services?${status}`)
      .map((res: Response) => res.json() as ServicePrepaid)
      .catch((error: any) => Observable.throw(error.json().message
        || 'Server error'));
  }

  update(prepaid: ServicePrepaid): Observable<ServicePrepaid> {
    const url = `${config.url.bssPo}prepaid-services/` +
      `${prepaid.servicePrepaidId}`;
    return this.http.put(url, prepaid)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error
        || 'Server error'));
  }

  handleError(error: any) {
    let errorMsg = JSON.parse(error._body);
    console.error(errorMsg);
    return Observable.throw(errorMsg.message || errorMsg.type);
  }

  delete(prepaid: ServicePrepaid): Observable<ServicePrepaid> {
    return this.http.put(`${config.url.bssPo}prepaid-services/` +
      `${prepaid.servicePrepaidId}/delete`, prepaid)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error
        || 'Server error'));
  }

  all(search: Object = {}): Observable<any> {
    return this.http.get(`${config.url.bssPo}prepaid-services`, search)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error
        || 'Server error'));
  }

  topUp(teloagent: TeloAgent, serviceId: number) {
    return this.http.put(`${config.url.bssPo}telo-agents/${serviceId}/topup`,
      teloagent)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().message ||
        'Server error'));
  }

  getTeloAgentBalance(serviceId: number): Observable<ServicePrepaid> {
    return this.http.get(`${config.url.bssPo}prepaid-services/`+
      `${serviceId}/telo-agent`)
      .map((res: Response) => res.json() as ServicePrepaid)
      .catch((error: any) => Observable.throw(error.json().message
        || 'Server error'));
  }
}
