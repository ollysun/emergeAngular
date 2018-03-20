import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService }  from '../../services/customer.service';
import { CountryService }  from '../../services/country.service';
import { Customer, StatusEnum } from '../../models/customer.model';
import { Country } from '../../models/country.model';
import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';
import { SnackBar } from '../../services/snack-bar.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ContractPrepaid } from '../../models/contract-prepaid.model';
import { Utils } from '../../shared/utils';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  entryComponents: [ConfirmDialog]
})

export class CustomersComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog;
  @ViewChild('anchorTag') anchorTag;

  constructor(private customerService: CustomerService,
    private snackBar: SnackBar,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private router: Router, translate: TranslateService) {

    this.statusEnum = Object.keys(StatusEnum);
    translate.get(this.statusEnum.concat(['ID', 'NAME', 'STATUS',
      'FISCAL_NUMBER', 'COUNTRY', 'TAGS', 'DELETE_OK', 'EMAIL',
      'TELEPHONE_NUMBER', 'DELETE_ERROR', 'SEARCH_ERROR', 'HIDE', 'SHOW'
    ])).subscribe(
      result => {
        this.translations = result;
      });
  }

  toggleOptions: Object = {
    show: true
  };

  isSearchVisible: boolean = true;
  query: any = {};
  translations: any = {};
  isLoading: boolean = false;
  countries: any = {};
  tags: string[] = [];
  customers: Customer[] = [];
  prepaidContract: ContractPrepaid[] = [];
  statusEnum: string[] = [];
  searchResult: any = {
    data: []
  };

  exportCSV(a) {
    let csvString = `${this.translations.ID}, ${this.translations.NAME},` +
      `${this.translations.STATUS},${this.translations.FISCAL_NUMBER},` +
      `${this.translations.COUNTRY},${this.translations.EMAIL},` +
      `${this.translations.TELEPHONE_NUMBER},${this.translations.TAGS}\n`;

    for (let customer of this.searchResult.data) {
      customer.tags = customer.tags || '';
      csvString += `\n${customer.id},${customer.name},` +
        `${this.translations[customer.status]},${customer.fiscalNumber},` +
        `${this.countries[customer.country]},${customer.email},` +
        `${customer.phoneNumber},"${customer.tags.join(',')}"`;
    }

    this.anchorTag.nativeElement.setAttribute('href',
      `data:text/csv;charset=utf-8,${window['encodeURI'](csvString)}`);

    this.anchorTag.nativeElement.setAttribute('download',
      `customers-${Date.now()}.csv`);
    this.anchorTag.nativeElement.click();
  }

  search() {
    this.query.tags = this.customerService.getTagString(this.tags);
    this.query = Utils.searchFilter(this.query);
    this.isLoading = true;
    this.customerService.all(this.query).subscribe(
      response => {
        response.data = response.data.map(item => {
          item.tags = this.customerService.getTagArray(item.tags);
          item.taxExemptionCertificates = this.customerService
            .getTagArray(item.taxExemptionCertificates);
          return item;
        });

        this.searchResult = response;
        this.isLoading = false;
      },
      err => {
        this.snackBar.open(this.translations.SEARCH_ERROR, this.viewContainerRef);
        this.isLoading = false;
      });
  }

  selectCustomers($event) {
    console.log($event.target);
  }

  clear() {
    this.query = {};
    this.tags = [];
  }

  delete(id: number, index: number) {
    this.confirmDialog.open(null, ok => {
      if (ok) {
        this.customerService.delete(id).subscribe(
          response => {
            this.snackBar.open(this.translations.DELETE_OK,
              this.viewContainerRef);

            this.searchResult.data.splice(index, 1);
          },
          err => {
            this.snackBar.open(this.translations.DELETE_ERROR,
              this.viewContainerRef);
          });
      }
    });
  }

  ngOnInit() {
    this.countryService.all().subscribe(
      countries => {
        this.countries = this.countryService.getAsObject(countries);
      }
    );
  }
}
