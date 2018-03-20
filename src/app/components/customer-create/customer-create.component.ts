import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { CustomerAddress } from '../../models/customer-address.model';
import { Contact } from '../../models/contact.model';
import { Country } from '../../models/country.model';
import { SnackBar } from '../../services/snack-bar.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Utils } from '../../shared/utils';


@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})

export class CustomerCreateComponent implements OnInit {
  public customer = new Customer();
  formSubmitted = false;
  visible: boolean = true;
  tags: string[] = [];
  isLoading: boolean = false;
  taxExemptionCertificates: string[] = [];
  message: string = '';
  countries: Country[] = [];
  contact = new Contact();
  translations: any = {};
  fiscalNumberRegExp: RegExp = Utils.regexp.fiscalNumber;
  phoneRegExp: RegExp = Utils.regexp.phone;
  $error: boolean = false;

  constructor(private customerService: CustomerService,
    private countryService: CountryService,
    private router: Router,
    private snackBar: SnackBar,
    private viewContainerRef: ViewContainerRef,
    translate: TranslateService) {
    translate.get(['CREATE_OK', 'CREATE_ERROR']).subscribe(
      result => {
        this.translations = result;
      });
  }

  create() {
    this.formSubmitted = true;
    this.isLoading = true;
    this.customer.tags = this.customerService.getTagString(this.tags);
    this.customer.taxExemptionCertificates =
      this.customerService.getTagString(this.taxExemptionCertificates);
    this.customerService.create(this.customer).subscribe(
      customer => {
        this.isLoading = false;
        this.snackBar.open(this.translations.CREATE_OK, this.viewContainerRef);
        this.router.navigate(['/backoffice/customers', customer.id]);
      },
      err => {
        this.isLoading = false;
        this.snackBar.open(this.translations.CREATE_ERROR,
          this.viewContainerRef);
      }
    );
  }

  addAddress() {
    this.customer.customerAddresses.push(new CustomerAddress());
  }

  removeAddress(addressIndex: number) {
    this.customer.customerAddresses.splice(addressIndex, 1);
  }

  removeContact(addressIndex: number, contactIndex: number) {
    this.customer.customerAddresses[addressIndex].contacts
    .splice(contactIndex, 1);
  }

  addContact(index: number) {
    this.customer.customerAddresses[index].contacts.push(new Contact());
  }

  reset() {
    this.customer = new Customer();
    this.addAddress();
    this.tags = [];
    this.taxExemptionCertificates = [];
    this.resetSubmitState();
  }

  resetSubmitState() {
    this.formSubmitted = false;
  }

  setFormName(i, j): string {
    return `.${i}.${j}`;
  }

  getCountries() {
    this.isLoading = true;
    this.countryService.all().subscribe(
      countries => {
        this.isLoading = false;
        this.countries = countries;
      },
      err => {
        this.isLoading = false;
        this.countries = [{
          name: 'Angola',
          code: 'A0'
        }];
      }
    )
  }

  ngOnInit() {
    this.getCountries();
    this.reset();
  }

  isValidAddress(address: CustomerAddress): boolean {
    if (address.faxNumber) {
      if(!this.phoneRegExp.test(address.faxNumber)) {
          return false;
      }
    }

    if (address.telephoneNumber) {
      if(!this.phoneRegExp.test(address.telephoneNumber)) {
          return false;
      }
    }

    return true;
  }

  isValidContact(contact: Contact): boolean {
    if (contact.contactFax) {
      if(!this.phoneRegExp.test(contact.contactFax)) {
          return false;
      }
    }

    if (contact.contactPhone) {
      if(!this.phoneRegExp.test(contact.contactPhone)) {
          return false;
      }
    }

    return true;
  }

  hasError(): boolean {
    if (!this.fiscalNumberRegExp.test(this.customer.fiscalNumber)) {
      return true;
    }

    for (let address of this.customer.customerAddresses) {
      if (!this.isValidAddress(address)) {
        return true;
      } else {
        for (let contact of address.contacts) {
          if (!this.isValidContact(contact)) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
