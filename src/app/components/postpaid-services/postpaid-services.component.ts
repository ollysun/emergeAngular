import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postpaid-services',
  templateUrl: './postpaid-services.component.html',
  styleUrls: ['./postpaid-services.component.css'],
})
export class PostpaidServicesComponent implements OnInit {

  postpaid: any = {};
  searchData: any = {};
  constructor() { }
  ngOnInit() {
  }

  getPostpaids() {
  }
}
