import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PrepaidService } from '../../services/prepaid.service';
import { PrepaidServicesPaymentService } from '../../services/prepaid-services-payment.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { SnackBar } from '../../services/snack-bar.service';

@Component({
  selector: 'app-prepaid-services-payment',
  templateUrl: './prepaid-services-payment.component.html',
  styleUrls: ['./prepaid-services-payment.component.css'],
  providers: [PrepaidService, PrepaidServicesPaymentService]
})
export class PrepaidServicesPaymentComponent implements OnInit {

  pageSubtitle = '';
  customerId = 0;
  prepaidServiceId = 0;
  prepaidServiceObject = {};
  translations: any = {};
  formData: any = {};
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prepaidService: PrepaidService,
    private paymentService: PrepaidServicesPaymentService,
    private snackBar: SnackBar,
    private viewContainerRef: ViewContainerRef,
    translate: TranslateService
  ) {
    translate.get(['CREATE_OK', 'CREATE_ERROR']).subscribe(
      result => {
        this.translations = result;
      });
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.customerId = Number.parseInt(params['customerId'], 10);
        this.prepaidServiceId = Number.parseInt(params['prepaidServiceId'], 10);
        this.getPrepaidService( this.prepaidServiceId );
      });
  }

  getPrepaidService(id: number) {
    this.prepaidService.getById(id).subscribe(
      response => {
        this.prepaidServiceObject = response;
        this.pageSubtitle = 'credit_' + response.serviceType + '_agent';
      },
      err => {
        this.prepaidServiceObject = null;
      }
    );
  }

  createPayment(){

    this.isLoading = true;

    this.formData.customerId = this.customerId;
    this.formData.prepaidServiceId = this.prepaidServiceId;

    this.paymentService.create(this.formData).subscribe(
      response => {
        console.log(response, 'creation success response')
        this.snackBar.open(this.translations.CREATE_OK, this.viewContainerRef);
        //this.router.navigate(['/backoffice/payphones', payphoneService.id]);
        this.cancel();
        this.isLoading = false;
      },
      err => {
        console.log(err, 'creation error response');
        this.snackBar.open(this.translations.CREATE_ERROR, this.viewContainerRef);
        this.isLoading = false;
      }
    );

  }

  cancel(){
    this.resetFormData();
  }

  private resetFormData(){
    this.formData = {};
  }

}
