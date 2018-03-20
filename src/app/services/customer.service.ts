import { Injectable } from '@angular/core';
import { Customer } from './../models/customer.model';
import { CustomerAddress } from './../models/customer-address.model';
import { Contact } from './../models/contact.model';
import { HttpClient } from '../shared/http-client';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from '../shared/config';
import { ContractPrepaid } from './../models/contract-prepaid.model';


@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }

  getTagArray(tags: string = ''): string[] {
    return tags.split(',').filter(item => item);
  }

  getTagString(tags: string[] = []): string {
    return tags.join(',');
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post(`${config.url.bssPo}customers`, customer)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  get(id: number): Observable<Customer> {
    return this.http.get(`${config.url.bssPo}customers/${id}`)
      .map((res: Response) => res.json() as Customer)
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  update(customer: Customer): Observable<Customer> {
    const url = `${config.url.bssPo}customers/${customer['id']}`;
    return this.http.put(url, customer)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  delete(customerId: number): Observable<any> {
    return this.http.delete(`${config.url.bssPo}customers/${customerId}`)
      .map((res: Response) => res.text())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  all(search: Object = {}): Observable<any> {
    return this.http.get(`${config.url.bssPo}customers`, search)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  // Customer Address Service
  createAddress(address: CustomerAddress,
    customerId: number): Observable<CustomerAddress> {
    return this.http.post(`${config.url.bssPo}customers/${customerId}`
      + `/customer-addresses`, address)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()
        || 'Server error'));
  }

  getAddresses(customerId: number): Observable<any> {
    return this.http.get(`${config.url.bssPo}customers/${customerId}/` +
      `customer-addresses`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  updateAddress(customerId: number, addressId: number,
    address: CustomerAddress): Observable<CustomerAddress> {
    const url = `${config.url.bssPo}customers/${customerId}/` +
      `customer-addresses/${addressId}`;
    return this.http.put(url, address)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  deleteAddress(customerId: number,
    addressId: number): Observable<CustomerAddress> {
    const url = `${config.url.bssPo}customers/${customerId}/` +
      `customer-addresses/${addressId}`;
    return this.http.delete(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()
        || 'Server error'));
  }

  createContact(contact: Contact, customerId: number,
    addressId: number): Observable<Contact> {
    const url = `${config.url.bssPo}customers/${customerId}` +
      `/customer-addresses/${addressId}/customer-contacts`;
    return this.http.post(url, contact)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()
        || 'Server error'));
  }

  getContacts(customerId: number, addressId: number): Observable<any> {
    const url = `${config.url.bssPo}customers/${customerId}` +
      `/customer-addresses/${addressId}/customer-contacts`;
    return this.http.get(url)
      .map((res: Response) => res.json() as Contact[])
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  updateContact(customerId: number, addressId: number, contact: Contact)
    : Observable<CustomerAddress> {
    const url = `${config.url.bssPo}customers/${customerId}/` +
      `customer-addresses/${addressId}/customer-contacts/${contact.id}`;
    return this.http.put(url, contact)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  deleteContact(customerId: number, addressId: number,
    contactId: number): Observable<CustomerAddress> {
    const url = `${config.url.bssPo}customers/${customerId}/` +
      `customer-addresses/${addressId}/customer-contacts/${contactId}`;
    return this.http.delete(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }
}
