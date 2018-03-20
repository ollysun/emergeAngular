import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServicePrepaid } from '../../models/prepaid.model';
import { PrepaidService } from '../../services/prepaid.service';
import { SnackBar } from '../../services/snack-bar.service';
import { TeloAgent } from '../../models/telo-agent.model';
import { PayphoneService } from '../../models/payphone-service.model';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';
import { PromptDialog } from '../custom/prompt-dialog/prompt-dialog.component';
import { PayphoneComponent } from '../payphone/payphone.component';
import { TaTopupDialog } from '../custom/ta-topup-dialog/ta-topup-dialog.component';

@Component({
  selector: 'app-prepaid-services-view',
  templateUrl: './prepaid-services-view.component.html',
  styleUrls: ['./prepaid-services-view.component.css'],
  providers: [PrepaidService],
  entryComponents: [ConfirmDialog, PromptDialog, TaTopupDialog]

})
export class PrepaidServicesViewComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog;
  @ViewChild('promptDialog') promptDialog;
  @ViewChild('taTopUpDialog') taTopUpDialog;
  @ViewChild('payphoneComponent') payphoneComponent: PayphoneComponent;
  translations: any = {};
  teloAgent = new TeloAgent();
  prepaid = new ServicePrepaid();
  isLoading: boolean = false;
  products = [
    { id: 1, text: 'PSP' },
    { id: 2, text: 'TEC' },
    { id: 3, text: 'TELOAGENT' },
    { id: 4, text: 'TELOOPERATOR' }
  ];

  responseData: any = {
    message: ''
  };

  val = {
    text: ''
  };

  customerId: number = 0;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private prepaidService: PrepaidService,
    private snackBar: SnackBar,
    private viewContainerRef: ViewContainerRef,
    translate: TranslateService
  ) {
    translate.get(['UPDATE_OK', 'UPDATE_ERROR', 'TOPUP_ERROR', 'TOPUP_OK'
    ]).subscribe(
      result => {
        this.translations = result;
      });
  }

  onChangeObj(newObj) {
    this.val = this.products.filter(u => u.id == newObj).pop();
  }

  getPrepaid(id: number) {
    this.isLoading = true;
    this.prepaidService.getById(id).subscribe(
      response => {
        this.prepaid = response;
        this.isLoading = false;
        if (response.serviceType === 'TELOAGENT') {
          this.getAgentBalance(this.prepaid.servicePrepaidId);
        }

        if (this.isAndroidPayphone()) {
          setTimeout(_ => this.payphoneComponent.checkPreferredMSISDN());
        }
      },
      err => {
        this.isLoading = false;
        this.prepaid = null;
      }
    );
  }

  getAgentBalance(serviceId: number) {
    this.isLoading = true;
    this.prepaidService.getTeloAgentBalance(serviceId).subscribe(
      response => {
        this.isLoading = false;
        this.prepaid.balance = response.balance;
      },
      err => {
        this.isLoading = false;
        this.teloAgent = null;
      }
    );
  }

  private isAndroidPayphone(): boolean {
    return this.prepaid &&
      this.prepaid.serviceType === 'TELOOPERATOR' &&
      !this.prepaid.isLegacy;
  }

  update() {
    if (this.prepaid.serviceType === 'TELOAGENT') {
      this.prepaid.externalProvisionId = null;
    }

    if (this.isAndroidPayphone() && !this.payphoneComponent.update()) {
      return;
    }

    this.isLoading = true;
    this.prepaidService.update(this.prepaid).subscribe(
      response => {
        this.isLoading = false;
        this.snackBar.open(this.translations.UPDATE_OK, this.viewContainerRef);
      },
      err => {
        this.isLoading = false;
        this.snackBar.open(this.translations.UPDATE_ERROR,
          this.viewContainerRef);
      });
  }

  topUpDialog() {
    this.taTopUpDialog.open(topUp => {
      if (topUp) {
        this.teloAgent.reasonForTopUp = topUp.reasonForTopUp;
        this.teloAgent.topUpValue = topUp.topUpValue;
        this.isLoading = true;
        this.prepaidService.topUp(this.teloAgent,
          this.prepaid.servicePrepaidId).subscribe(
          response => {
            this.snackBar.open(this.translations.TOPUP_OK,
              this.viewContainerRef);
            this.isLoading = false;
            this.getAgentBalance(this.prepaid.servicePrepaidId)
          },
          err => {
            this.isLoading = false;
            this.snackBar.open(this.translations.TOPUP_ERROR,
              this.viewContainerRef);
          });
      }
    });
  }

  delete(prepaid: ServicePrepaid) {
    // const elem = $event.target.parentElement.parentElement;
    // elem.disabled = true;
    this.promptDialog.open(null, deletedReason => {
      if (deletedReason) {
        prepaid.deletedReason = deletedReason;
        this.isLoading = true;
        this.prepaidService.delete(prepaid).subscribe(
          response => {
            this.isLoading = false;
            this.snackBar.open(this.translations.DELETE_OK,
              this.viewContainerRef);
            this.router.navigate(['/backoffice/prepaid-services']);

          },
          err => {
            this.isLoading = false;
            this.snackBar.open(this.translations.DELETE_ERROR,
              this.viewContainerRef);
          });
      }
    });
  }

  cancelTopUp() {
    this.teloAgent = new TeloAgent();
  }

  cancel() {
    this.router.navigate(['/backoffice/prepaid-services']);
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.customerId = params['customerId']?
          Number.parseInt(params['customerId'], 10): this.customerId;
        this.getPrepaid(Number.parseInt(params['id'], 10));
      });
  }
}
