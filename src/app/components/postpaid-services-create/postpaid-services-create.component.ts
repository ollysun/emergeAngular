import { Component, OnInit } from '@angular/core';
import {  ProductPostpaid } from '../../models/postpaid.model';
import { PostpaidService } from '../../services/postpaid.service';

@Component({
  selector: 'app-postpaid-services-create',
  templateUrl: './postpaid-services-create.component.html',
  styleUrls: ['./postpaid-services-create.component.css'],
  providers: [PostpaidService]
})
export class PostpaidServicesCreateComponent implements OnInit {
  postpaid = new ProductPostpaid();
  constructor(private postpaidService: PostpaidService) { }
  successMessage: string;
  submitted: boolean;
  create() {
    console.log(this.postpaid);
    this.postpaidService.createPostpaid(this.postpaid).subscribe(
      postpaid => {
        console.log(postpaid);
      },
      err => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

}
