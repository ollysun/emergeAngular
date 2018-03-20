import { Component, OnInit, Input, OnChanges,
  trigger, state, animate, transition, style } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CustomerAddress } from '../../models/customer-address.model';
import { CustomerService } from '../../services/customer.service';
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.css'],
  animations: [
    trigger('isVisibleChanged', [
      state('true', style({ opacity: 1, transform: 'scale(1.0)' })),
      state('false', style({ opacity: 0, transform: 'scale(0.0)' })),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('900ms'))
    ])
  ]
})
export class CustomerAddressComponent implements OnInit {
  private customer = new Customer();
  @Input() isVisible: boolean = true;
  showFader: boolean = false;
  private address = new CustomerAddress();

  constructor(private customerService: CustomerService) {
  }

  addCustomerAddress(): void {
    //this.customer.customerAddresses.push(new CustomerAddress(this.customer.id));
    console.log(this.customer);
    this.customerService.createAddress(this.address, 1).subscribe(
      customerAddress => {
        console.log(customerAddress);
      },
      err => {
        console.log(err);
      }
    );
  }
  ngOnInit() {
  }

}
