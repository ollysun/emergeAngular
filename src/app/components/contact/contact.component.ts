import { Component, OnInit, Input, trigger, state, animate,
  transition, style } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    trigger('isVisibleChanged', [
      state('true', style({ opacity: 1, transform: 'scale(1.0)' })),
      state('false', style({ opacity: 0, transform: 'scale(0.0)' })),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('900ms'))
    ])
  ]
})

export class ContactComponent implements OnInit {
  @Input() isValid: boolean = true;
  private contact = new Contact();

  constructor(private customerservice: CustomerService) { }

  addContact() {
    console.log(this.contact);
    this.customerservice.createContact(this.contact, 1, 2).subscribe(
      contact => {
        console.log(contact);
      },
      err => {
        console.log(err);
      }
    );

  }

  ngOnInit() {
  }
}
