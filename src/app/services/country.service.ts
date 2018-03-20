import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Country } from '../models/country.model';
import { config } from '../shared/config';
import { HttpClient } from '../shared/http-client';

@Injectable()
export class CountryService {

  constructor(private http: HttpClient) { }

  static countryEnum() {
    return [
      { id: 1, name: 'Nigeria' },
      { id: 2, name: 'Malawi' },
      { id: 3, name: 'Portugal' }
    ];
  }

  getFromCode(code: string, countries: Country[]): Country {
    return countries.filter(item => item.code === code)[0];
  }

  getAsObject(countries: Country[]): any {
    let countriesObj:any = {};
    for(let country of countries) {
      countriesObj[country.code] = country.name;
    }

    return countriesObj;
  }

  all(search: any={}): Observable<Country[]> {
    return this.http.get(`${config.url.middleware}countries`, search)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error ||
        'Server error'));
  }
}
