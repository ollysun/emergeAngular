import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
//import { Postpaid } from './postpaidservice'


@Component({
  selector: 'app-postpaid-services-view',
  templateUrl: './postpaid-services-view.component.html',
  styleUrls: ['./postpaid-services-view.component.css']
})

export class PostpaidServicesViewComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
//  postpaid = new Postpaid;
  postpaidService = null
  postpaidServices = [
    { id: 1, unit_price: '11.3', product_code: 'cd66d7d', name: 'Server Hosting', product_description: 'Server Hosting for server 1', taxtypes: 'VAT'},
    { id: 2, unit_price: '11.3', product_code: 'cd66d7d', name: 'Storage', product_description: 'Server Hosting for stoage', taxtypes: 'VAT', taxpercentage: '10'},
    { id: 3, unit_price: '11.3', product_code: 'cd66d7d', name: 'Server Hosting', product_description: 'Server Hosting for server 1', taxtypes: 'VAT', taxpercentage: '10'},
    { id: 4, unit_price: '11.3', product_code: 'cd66d7d', name: 'Server Hosting', product_description: 'Server Hosting for server 1', taxtypes: 'VAT', taxpercentage: '10'},
    { id: 5, unit_price: '11.3', product_code: 'cd66d7d', name: 'Server Hosting', product_description: 'Server Hosting for server 1', taxtypes: 'VAT', taxpercentage: '10'},
    { id: 6, unit_price: '11.3', product_code: 'cd66d7d', name: 'Server Hosting', product_description: 'Server Hosting for server 1', taxtypes: 'VAT', taxpercentage: '10'},
    { id: 7, unit_price: '11.3', product_code: 'cd66d7d', name: 'Server Hosting', product_description: 'Server Hosting for server 1', taxtypes: 'VAT', taxpercentage: '10'},
    { id: 8, unit_price: '11.3', product_code: 'cd66d7d', name: 'Server Hosting', product_description: 'Server Hosting for server 1', taxtypes: 'VAT', taxpercentage: '10'}
    ];


  findById(id:number) {
    this.postpaidService = this.postpaidServices.filter(item => item.id === id)[0];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
          let id = Number.parseInt(params['id']);
          this.findById(id);
    });
  }
}
