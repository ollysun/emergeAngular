import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServicePrepaid } from '../../models/prepaid.model';
import { PrepaidService } from '../../services/prepaid.service';
import { ContractPrepaid } from '../../models/contract-prepaid.model';
import { CustomerService } from '../../services/customer.service';
import { ContractService } from '../../services/contract.service';
import { SnackBar } from '../../services/snack-bar.service';
import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';
import { TranslateService } from 'ng2-translate/ng2-translate';


@Component({
  selector: 'app-prepaid-contract-create',
  templateUrl: './prepaid-contract-create.component.html',
  styleUrls: ['./prepaid-contract-create.component.css'],
  providers: [PrepaidService, ContractService],
  entryComponents: [ConfirmDialog]
})

export class PrepaidContractCreateComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog;
  translations: any = {};
  customerId: number;
  isLoading: boolean = false;
  prepaidContract = new ContractPrepaid();
  service: any = {
    serviceType: '',
    servicePrepaidId: 0
  };

  message: string;
  prepaidData: PrepaidService[] = [];
  prepaidContracts: ContractPrepaid[] = [];
  query = {
    status: 'READY'
  };

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private contractService: ContractService,
    private router: Router,
    private translate: TranslateService,
    private prepaidService: PrepaidService,
    private snackBar: SnackBar,
    private viewContainerRef: ViewContainerRef) {
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

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.customerId = Number.parseInt(params['id']);
    });

    this.getPrepaidServices();
    this.getPrepaidContracts();
  }

  getPrepaidServices() {
    this.isLoading = true;
    this.prepaidService.all(this.query).subscribe(
      response => {
        this.isLoading = false;
        this.prepaidData = response.data;
      },
      err => {
        this.isLoading = false;
      });
  }

  create() {
    this.prepaidContract.customerId = this.customerId;
    this.prepaidContract.servicePrepaid = this.service.servicePrepaidId;
    this.prepaidContract.serviceType = this.service.serviceType;
    this.prepaidContract.startDate = new Date();
    this.prepaidContract.statusDate = new Date();
    this.isLoading = true;
    this.contractService.createPrepaidContract(this.customerId,
      this.prepaidContract).subscribe(
      response => {
        this.isLoading = false;
        this.snackBar.open(this.translations.CREATE_OK, this.viewContainerRef);
        this.getPrepaidContracts();
        this.getPrepaidServices();
      },
      err => {
        this.snackBar.open(this.translations.CREATE_ERROR,
          this.viewContainerRef);
        this.isLoading = false;
      }
      );
  }

  clear() {
    this.prepaidContract = new ContractPrepaid();
    this.service = {
      serviceType: ''
    };
    this.getPrepaidServices();
  }

  getPrepaidContracts() {
    this.contractService.getAllCustomerPrepaidContract(this.customerId)
      .subscribe(
      response => {
        this.prepaidContracts = response.data;
        console.log('contracts', this.prepaidContracts);
      },
      err => {
        console.log(err);
      });
  }

  confirm(contract: ContractPrepaid) {
    this.confirmDialog.open(null, ok => {
      if (ok) {
        this.contractService.confirmPrepaidContract(this.customerId, contract)
          .subscribe(response => {
            contract.status = 'ACTIVE';
            this.snackBar.open(this.translations.UPDATE_OK,
              this.viewContainerRef);
          },
          err => {
            this.snackBar.open(this.translations.UPDATE_ERROR,
              this.viewContainerRef);
          });
      }
    });
  }

  keyupHandlerFunction(content) {
    this.prepaidContract.content = content
  }

  cancel(contract: ContractPrepaid, index: number) {
    this.confirmDialog.open(null, ok => {
      if (ok) {
        this.contractService.cancelPrepaidContract(this.customerId, contract)
          .subscribe(response => {
            this.snackBar.open(this.translations.CANCEL_OK,
              this.viewContainerRef);

            this.prepaidContracts.splice(index, 1);
          },
          err => {
            this.snackBar.open(this.translations.CANCEL_ERROR,
              this.viewContainerRef);
          });
      }
    });
  }
}
