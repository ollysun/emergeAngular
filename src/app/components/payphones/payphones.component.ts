import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PayphoneService_ } from '../../services/payphone.service';
import { StatusEnum } from '../../models/status.model';
import { Utils } from '../../shared/utils';

import { SnackBar } from '../../services/snack-bar.service';
import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'app-payphones',
  templateUrl: './payphones.component.html',
  styleUrls: ['./payphones.component.css'],
  entryComponents: [ConfirmDialog],
})

export class PayphonesComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog;
  query: any = {};
  searchActive = false;
  isLoading = false;
  statusEnum: string[] = Object.keys(StatusEnum);
  searchResult: any = {
    data: [],
    // total: 0,
    // offset: 0,
    // limit: 20
  };

  currentPage = 1;
  nextPage = 1;
  previousPage = 0;
  firstPage = 1;
  lastPage = 1;
  numOfPages   = 1;
  resultsPerPage = 20;
  paginate = false;

  translations: any = {};

  constructor(private payphoneService: PayphoneService_, private snackBar: SnackBar,
  private viewContainerRef: ViewContainerRef, translate: TranslateService) {
    translate.get(['DISABLE_OK', 'DISABLE_ERROR']).subscribe(
      result => {
        this.translations = result;
      });
  }

  ngOnInit() {
    //this.search();
  }

  search() {

    this.query.offset = this.getOffset();
    this.query.limit = this.getLimit();
    this.query = Utils.searchFilter(this.query);
    this.isLoading = true;

    this.payphoneService.all(this.query).subscribe(
      result => {
         console.log(result);
         this.searchActive = true;
         result.data = result.data.filter(item => item.id);
         this.searchResult = result;
         this.isLoading = false;


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

  disable(payphone){
    this.confirmDialog.open(null, ok => {
      if (ok) {
        this.payphoneService.disable(payphone.id, {status: 'DISABLED'})
          .subscribe(success => {
            console.log(success);
            this.snackBar.open(this.translations.DISABLE_OK, this.viewContainerRef);
          },
          err => {
            console.log(err);
            this.snackBar.open(this.translations.DISABLE_ERROR, this.viewContainerRef);
          });
      }
    });
  }

  clearSearch() {
    this.query = {};
    this.searchActive = false;
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
