import { Component, OnInit } from '@angular/core';
import { servicedata } from './servicedata';

@Component({
  selector: 'app-service-types',
  templateUrl: './service-types.component.html',
  styleUrls: ['./service-types.component.css'],
})
export class ServiceTypesComponent implements OnInit {

  constructor() { }

  technologies: string[] = [
  'JavaScript',
  'C',
  'C#',
  'Clojure'
  ];
  serviceTypes = servicedata;
  ngOnInit() {
  }

}
