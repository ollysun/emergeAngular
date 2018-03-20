import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ServicePrepaid, StatusEnum, ServiceTypeEnum } from '../../models/prepaid.model';
import { PrepaidService } from '../../services/prepaid.service';
import { Router } from '@angular/router';
import { SnackBar } from '../../services/snack-bar.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { PayphoneService } from '../../models/payphone-service.model';

import { PayphoneCreateComponent } from '../payphone-create/payphone-create.component';


@Component({
  selector: 'app-prepaid-services-create',
  templateUrl: './prepaid-services-create.component.html',
  styleUrls: ['./prepaid-services-create.component.css'],
  providers: [PrepaidService]
})
export class PrepaidServicesCreateComponent implements OnInit {
  prepaid: ServicePrepaid;
  @ViewChild('payphoneCreateComponent') payphoneCreateComponent:
  PayphoneCreateComponent;
  statusEnum: string[] = Object.keys(StatusEnum);
  isLoading: boolean = false;
  serviceTypeEnum: string[] = Object.keys(ServiceTypeEnum);
  payphone: PayphoneService;
  translations: any = {};
  products = [
    { id: 1, text: 'PSP' },
    { id: 2, text: 'TEC' },
    { id: 3, text: 'TELOAGENT' },
    { id: 4, text: 'TELOOPERATOR' }
  ];

  val = {
    text: ''
  };

  constructor(
    private prepaidService: PrepaidService,
    private router: Router,
    private snackBar: SnackBar,
    private viewContainerRef: ViewContainerRef,
    translate: TranslateService
  ) {
    this.payphone = new PayphoneService();
    this.prepaid = new ServicePrepaid();
    translate.get(['CREATE_OK', 'CREATE_ERROR',
      'SELECT_PREFERRED_SIM']).subscribe(
      result => {
        this.translations = result;
      });
  }

  onChangeObj(newObj) {
    this.val = this.products.filter(u => u.id == newObj).pop();
  }

  create() {
    this.prepaid.serviceType = this.val.text;
    if (this.prepaid.serviceType === 'TELOAGENT') {
      this.prepaid.externalProvisionId = null;
    } else if (this.prepaid.serviceType === 'TELOOPERATOR') {

    }

    if (this.prepaid.productId == 4 && !(this.prepaid.isLegacy)) {
      this.prepaid.payphoneService = this.payphone;
      const preferredMSISDN = this.payphone[this.payphoneCreateComponent
        .preferredSIM].msisdn;

      if (!preferredMSISDN) {
        this.payphoneCreateComponent.message = this.
          translations.SELECT_PREFERRED_SIM;
        return;
      } else {
        this.payphone.configData.preferredMSISDN = preferredMSISDN;
      }
    }

    this.prepaid.status = 'READY';
    this.isLoading = true;
    this.prepaidService.create(this.prepaid).subscribe(
      prepaid => {
        this.snackBar.open(this.translations.CREATE_OK, this.viewContainerRef);
        prepaid.id = prepaid.id || prepaid.servicePrepaidId;
        this.isLoading = false;
        this.router.navigate(['/backoffice/service/prepaid/view/', prepaid.id]);
      },
      err => {
        this.isLoading = false;
        this.snackBar.open(this.translations.CREATE_ERROR,
          this.viewContainerRef);
      });
  }

  cancel() {
    this.prepaid = new ServicePrepaid();
    this.payphone = new PayphoneService();
  }

  ngOnInit() {
  }
}
