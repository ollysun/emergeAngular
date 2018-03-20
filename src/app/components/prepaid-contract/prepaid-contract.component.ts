import { Component, ViewContainerRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractPrepaid } from '../../models/contract-prepaid.model';
import { ContractService } from '../../services/contract.service';
import { PrepaidService } from '../../services/prepaid.service';
import { ServicePrepaid } from '../../models/prepaid.model';
import { SnackBar } from '../../services/snack-bar.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-prepaid-contract',
  templateUrl: './prepaid-contract.component.html',
  styleUrls: ['./prepaid-contract.component.css'],
  providers: [PrepaidService, ContractService],
  entryComponents: [ConfirmDialog]
})
export class PrepaidContractComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog;
  @ViewChild('iframe') iframe;
  sub: any;
  translations: any = {};
  prepaidContract = new ContractPrepaid();
  service: any = {
    serviceType: '',
    servicePrepaidId: 0
  };
  prepaidData: PrepaidService[] = []
  isLoading: boolean = false;


  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private prepaidService: PrepaidService,
    private contractService: ContractService,
    private translate: TranslateService,
    private snackBar: SnackBar,
    private viewContainerRef: ViewContainerRef
  ) {
    translate.get(['CREATE_OK',
      'CREATE_ERROR',
      'UPDATE_OK',
      'UPDATE_ERROR',
      'CANCEL_OK',
      'CANCEL_ERROR'
    ]).subscribe(
      result => {
        this.translations = result;
      });
  }
  contractId: number;
  customerId: number;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['customerId'] && params['contractId']) {
        this.customerId = Number.parseInt(params['customerId']);
        this.contractId = Number.parseInt(params['contractId']);
      }
      this.getPrepaidContract();
    });
  }


  getPrepaidContract() {
    this.contractService.getPrepaidContract(this.customerId, this.contractId).subscribe(
      response => {
        this.prepaidContract = response;
        this.iframe.nativeElement.contentWindow.document.body.innerHTML =
          response.content;
      },
      err => {
        this.prepaidContract = null;
      });
  }

  delete(contract: ContractPrepaid) {
    this.confirmDialog.open(null, ok => {
      if (ok) {
        this.contractService.cancelPrepaidContract(this.customerId, contract)
          .subscribe(
          response => {
            this.snackBar.open(this.translations.CANCEL_OK,
              this.viewContainerRef);
            this.router.navigate(['/backoffice/customers/' + this.customerId
              + '/prepaid-contract/create']);
          },
          err => {
            this.snackBar.open(this.translations.CANCEL_ERROR,
              this.viewContainerRef);
          });
      }
    });
  }

  cancel() {
    this.router.navigate(['/backoffice/customers/' + this.customerId
      + '/prepaid-contract/create']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
