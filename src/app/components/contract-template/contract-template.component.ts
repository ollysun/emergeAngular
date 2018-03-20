import { Component, OnInit, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import { ContractTemplate, ContractTypeEnum } from '../../models/contract-template.model';
import { ContractService }  from '../../services/contract.service';
import { SnackBar } from '../../services/snack-bar.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Utils } from '../../shared/utils';
import { ActivatedRoute  } from '@angular/router';
import { Router } from '@angular/router';
import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-contract-template',
  templateUrl: './contract-template.component.html',
  styleUrls: ['./contract-template.component.css'],
  entryComponents: [ConfirmDialog]
})
export class ContractTemplateComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contractService: ContractService,
    private snackBar: SnackBar,
    private viewContainerRef: ViewContainerRef,
    private translate: TranslateService
  ) {
    this.contractTypeEnum = Object.keys(ContractTypeEnum);
    translate.get(['UPDATE_OK', 'UPDATE_ERROR', 'TOPUP_ERROR',
      'TOPUP_OK', 'DELETE_OK', 'DELETE_ERROR'
    ].concat(this.contractTypeEnum)).subscribe(
      result => {
        this.translations = result;
        this.contractTypeEnum =
          this.contractTypeEnum.map(item => {
            return {
              id: item,
              label: result[item]
            };
          });
      });
  }

  translations: any = {};
  isLoading: boolean = false;
  contractTemplate = new ContractTemplate();
  contractTypeEnum: any[];
  sub: any;

  getContractTemplate(id: number) {
    this.isLoading = true;
    this.contractService.getById(id).subscribe(
      response => {
        this.isLoading = false;
        this.contractTemplate = response;
      },
      err => {
        this.isLoading = false;
        this.contractTemplate = null;
      });
  }

  update() {
    this.isLoading = true;
    this.contractService.update(this.contractTemplate).subscribe(
      response => {
        this.isLoading = false;
        this.isLoading = false;
        this.snackBar.open(this.translations.UPDATE_OK, this.viewContainerRef);
      },
      err => {
        this.isLoading = false;
        this.snackBar.open(this.translations.UPDATE_ERROR,
          this.viewContainerRef);
      });
  }

  keyupHandlerFunction(content) {
    this.contractTemplate.content = content;
  }

  cancel() {
    this.router.navigate(['/backoffice/contract-templates']);
  }

  delete() {
    this.confirmDialog.open(null, ok => {
      if (ok) {
        this.contractService.delete(this.contractTemplate.contractTemplateId)
          .subscribe(
          response => {
            this.snackBar.open(this.translations.DELETE_OK,
              this.viewContainerRef);
            this.router.navigate(['/backoffice/contract-templates']);
          },
          err => {
            this.snackBar.open(this.translations.DELETE_ERROR,
              this.viewContainerRef);
          });
      }
    });
  }

  hasError(): boolean {
    return !this.contractTemplate.content ||
      !this.contractTemplate.contractType || !this.contractTemplate.description
      || !this.contractTemplate.name;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        let id = Number.parseInt(params['id']);
        this.getContractTemplate(id);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
