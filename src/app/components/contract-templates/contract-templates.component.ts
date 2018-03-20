import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ContractTemplate, ContractTypeEnum } from '../../models/contract-template.model';
import { ContractService }  from '../../services/contract.service';
import { SnackBar } from '../../services/snack-bar.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Utils } from '../../shared/utils';
import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-contract-templates',
  templateUrl: './contract-templates.component.html',
  styleUrls: ['./contract-templates.component.css'],
  entryComponents: [ConfirmDialog]
})
export class ContractTemplatesComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog;

  contractTemplate = new ContractTemplate();
  searchResult: any = {
    data: []
  };
  isSearchVisible: boolean = true;
  query: any = {};
  translations: any = {};
  isLoading: boolean = false;
  constructor(
    private contractService: ContractService,
    private snackBar: SnackBar,
    private viewContainerRef: ViewContainerRef,
    private translate: TranslateService) {
    translate.get(['ID', 'NAME', 'STATUS', 'FISCAL_NUMBER', 'COUNTRY',
      'TAGS', 'DELETE_OK', 'DELETE_ERROR', 'SEARCH_ERROR']).subscribe(
      result => {
        this.translations = result;
      });
  }
  ngOnInit() {
  }

  contractTypeEnum: string[] = Object.keys(ContractTypeEnum);


  search() {
    this.query = Utils.searchFilter(this.query);
    this.isLoading = true;
    this.contractService.all(this.query).subscribe(
      response => {
        this.searchResult = response;
        this.isLoading = false;
      },
      err => {
        this.snackBar.open(this.translations.SEARCH_ERROR, this.viewContainerRef);
        this.isLoading = false;
      });
  }

  delete(id: number, index: number) {
    this.confirmDialog.open(null, ok => {
      if (ok) {
        this.contractService.delete(id).subscribe(
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

  clear() {
    this.query = {};
  }

}
