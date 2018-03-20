import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { TariffService } from '../../services/tariff.service';
import { TariffVersion } from '../../models/tariff-version.model';
import { Utils } from '../../shared/utils';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';
import { SnackBar } from '../../services/snack-bar.service';

import { PromptDialog } from '../custom/prompt-dialog/prompt-dialog.component';

@Component({
  selector: 'app-tariff-versions',
  templateUrl: './tariff-versions.component.html',
  styleUrls: ['./tariff-versions.component.css'],
  entryComponents: [ConfirmDialog, PromptDialog]
})
export class TariffVersionsComponent implements OnInit {

  @ViewChild('confirmDialog') confirmDialog;
  @ViewChild('promptDialog') promptDialog;

  tariffVersions: TariffVersion[]; // = TariffVersionData;
  tariffVersion: Object = {};
  searchActive: boolean = false;
  isLoading: boolean = false;
  query: any = {};
  translations: any = {};


  currentPage = 1;
  nextPage = 1;
  previousPage = 0;
  firstPage = 1;
  lastPage = 1;
  numOfPages   = 1;
  resultsPerPage = 20;
  paginate = false;

  constructor(private tariffService: TariffService, private translate: TranslateService,
  private snackBar: SnackBar, private viewContainerRef: ViewContainerRef) {
     translate.get(['CLONE_OK', 'CLONE_ERROR', 'UPDATE_OK', 'UPDATE_ERROR', 'DELETE_OK', 'DELETE_ERROR']).subscribe(
        result => {
           this.translations = result;
     });
  }

  ngOnInit() {
    this.getTariffVersions();
  }

  getTariffVersions() {

    this.isLoading = true;

    this.query.offset = this.getOffset();
    this.query.limit = this.getLimit();
    this.query = Utils.searchFilter(this.query);

    this.tariffService.all(this.query).subscribe(
      tariffVersions => {
          console.clear();
          console.log(tariffVersions, 'tariff versions object');
          this.tariffVersions = tariffVersions.data;
          this.searchActive = true;
          this.isLoading = false;

          let result = tariffVersions;
          this.numOfPages = Math.ceil(result.total/this.resultsPerPage);
          this.lastPage = this.numOfPages;
          if (this.numOfPages > 1) {
             this.paginate = true;
          }
      },
      err => {
          console.log(err);
          this.isLoading = false;
      });
  }

  clone(tariffVersion){

    this.promptDialog.open('ENTER_VERSION_DESCRIPTION', ok => {

        if (ok) {

          let newDescription = ok;
          let sentData = { id: tariffVersion.id, description: newDescription };

          //sentData.id = tariffVersion.id;
          //sentData.description = tariffVersion.description;

          console.log(sentData, 'sent data');

          this.tariffService.clone(sentData).subscribe(
             success => {
                console.log(success, 'cloning success');
                this.snackBar.open(this.translations.CLONE_OK, this.viewContainerRef);
             },
             err => {
                console.log(err, 'cloning error');
                this.snackBar.open(this.translations.CLONE_ERROR, this.viewContainerRef);
             }
          );

        }

    });

     /*
     this.promptDialog.open('ENTER_TOPUP_AMOUNT', ok => {
       if (ok) {
         let topupAmount = ok;

         this.payphoneService.topup(topupAmount, this.payphone.id).subscribe(
           response => {
             console.log(response);;
             this.payphone.balance = response.creditAfterTopup;
             this.resetSubmitState();
             this.snackBar.open(this.translations.TOPUP_OK, this.viewContainerRef);
           },
           err => {
             console.log(err);
             // this.snackBar.open(err, this.viewContainerRef);
             this.snackBar.open(this.translations.TOPUP_ERROR,
               this.viewContainerRef);
           });
       }
     });*/
  }

  delete(tariffVersion) {
     this.confirmDialog.open(null, ok => {
        if (ok) {
           this.tariffService.delete(tariffVersion.id).subscribe(
              success => {
                this.removeFromList(tariffVersion);
                this.snackBar.open(this.translations.DELETE_OK, this.viewContainerRef);
              },
              err => {
                console.error(err);
                this.snackBar.open(this.translations.DELETE_ERROR, this.viewContainerRef);
              }
           );
        }
     });
  }

  next(){
     if(this.currentPage >= this.numOfPages){
        return;
     }

     ++this.currentPage;

     this.setNextPage();
     this.search();
  }

  previous(){
     if(this.currentPage <= 1){
        return;
     }

     --this.currentPage;

     this.setPreviousPage();
     this.search();
  }

  first(){

     if (this.currentPage === this.firstPage) {
        return;
     }
     this.currentPage = this.firstPage;
     this.setNextPage();
     this.search();
  }

  last(){

     if (this.currentPage === this.lastPage) {
        return;
     }
     this.currentPage = this.lastPage;
     this.setPreviousPage();
     this.search();
  }

  resetTariffVersion() {
    this.tariffVersion = {};
  }

  resetTariffVersions() {
    this.tariffVersions = [];
  }

  clearSearch() {
    this.resetTariffVersions();
    this.resetTariffVersion();
    this.searchActive = false;
  }

  private search(){
    this.getTariffVersions();
  }

  private removeFromList(tariffVersion) {

     let index = this.getTariffVersionIndex(tariffVersion);

     if (index === -1) {
       return;
     }

     if (this.tariffVersions.length) {
       this.tariffVersions.splice(index, 1);
     }

  }

  private getTariffVersionIndex(tariffVersion) {
    for (let i = 0; i < this.tariffVersions.length; i++) {
      if (this.tariffVersions[i].id === tariffVersion.id) {
        return i;
      }
    }

    return -1;
  }

  private setNextPage(){
    this.nextPage = this.currentPage + 1;
 }

  private setPreviousPage(){
    this.previousPage = this.currentPage - 1;
 }

  private getOffset(){
    return ( (this.currentPage - 1) * this.resultsPerPage );
 }

  private getLimit(){
    return this.resultsPerPage;
 }

}
