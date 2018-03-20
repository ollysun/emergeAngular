import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServicePrepaid, StatusEnum, ServiceTypeEnum }
from '../../models/prepaid.model';
import { PrepaidService } from '../../services/prepaid.service';
import { SnackBar } from '../../services/snack-bar.service';
import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';
import { PromptDialog } from '../custom/prompt-dialog/prompt-dialog.component';
import { Utils } from '../../shared/utils';
import { TranslateService } from 'ng2-translate/ng2-translate';



@Component({
  selector: 'app-prepaid-services',
  templateUrl: './prepaid-services.component.html',
  styleUrls: ['./prepaid-services.component.css'],
  providers: [PrepaidService],
  entryComponents: [ConfirmDialog, PromptDialog]
})

export class PrepaidServicesComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog;
  @ViewChild('promptDialog') promptDialog;

  translations: any = {};
  isLoading = false;
  constructor(
    private prepaidService: PrepaidService,
    private snackBar: SnackBar,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private translate: TranslateService) {
    translate.get(['UPDATE_OK', 'UPDATE_ERROR', 'DELETE_ERROR', 'DELETE_OK',
      'CREATE_OK', 'CREATE_ERROR']).subscribe(result => {
        this.translations = result;
      });
  }

  prepaid = new ServicePrepaid();
  statusEnum: string[] = Object.keys(StatusEnum);
  serviceTypeEnum: string[] = Object.keys(ServiceTypeEnum);

  query: any = {
    type: '',
    external_provision_id: '',
    isLegacy: true
  };

  searchData: any = {
    data: []
  };

  search() {
    this.isLoading = true;
    if (this.query.type === 'TELOAGENT') {
      this.query.external_provision_id = null;
    }
    this.query = Utils.searchFilter(this.query);
    this.prepaidService.all(this.query).subscribe(
      response => {
        this.searchData = response;
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      });
  }

  clear() {
    this.query = {};
    this.query.isLegacy = true;
  }

  delete(prepaid: ServicePrepaid, index: number, $event) {
    // const elem = $event.target.parentElement.parentElement;
    // elem.disabled = true;
    this.promptDialog.open('ENTER_DELETED_REASON', deletedReason => {
      if (deletedReason) {
        prepaid.deletedReason = deletedReason;
        this.prepaidService.delete(prepaid).subscribe(
          response => {
            // elem.disabled = false;
            this.searchData.data.splice(index, 1);
            this.snackBar.open(this.translations.DELETE_OK,
              this.viewContainerRef);
          },
          err => {
            // elem.disabled = false;
            this.snackBar.open(this.translations.DELETE_ERROR,
              this.viewContainerRef);
          });
      }
    });
  }

  ngOnInit() {
    this.search();
  }
}
