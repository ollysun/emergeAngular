import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Upload, BankEnum } from '../../models/upload.model';
import { UploadService } from '../../services/upload.service';
import { SnackBar } from '../../services/snack-bar.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-payment-upload-statement',
  templateUrl: './payment-upload-statement.component.html',
  styleUrls: ['./payment-upload-statement.component.css'],
  providers: [UploadService],
  entryComponents: [ConfirmDialog]
})
export class PaymentUploadStatementComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog;

  bankEnum: string[] = Object.keys(BankEnum);
  translations: any = {};
  isLoading: boolean = false;
  formData = new FormData();
  showSummary: boolean = false;
  fileName: string;

  uploadResponse: any = {
    bankName: '',
    fileId: '',
    description: '',
    numberOfEntries: '',
    totalSum: '',
  };

  upload = new Upload();

  constructor(
    private uploadService: UploadService,
    private snackBar: SnackBar,
    private viewContainerRef: ViewContainerRef,
    private translate: TranslateService
  ) {
    translate.get(['CONFIRM_OK', 'CONFIRM_ERROR', 'UPLOAD_ERROR']).subscribe(
      result => {
        this.translations = result;
      });
  }

  uploadListener($event) {
    this.upload.statementFile = $event.target.files;
    this.upload.fileName = this.upload.statementFile[0].name
    this.formData.append("statementFile", this.upload.statementFile[0],
      this.upload.fileName);
  }

  uploadStatement() {
    this.formData.append("bankName", this.upload.bankName);
    this.isLoading = true;
    this.uploadService.upload(this.formData).subscribe(
      response => {
        this.isLoading = false;
        this.uploadResponse = response;
        this.clear();
      },
      err => {
        this.isLoading = false;
        this.snackBar.open(this.translations.UPLOAD_ERROR,
          this.viewContainerRef);
      });
  }

  confirmStatement() {
    this.confirmDialog.open(null, ok => {
      if (ok) {
        const body = 'bank_name=' + this.uploadResponse.bankName +
          '?file_id=' + this.uploadResponse.fileId;

        this.isLoading = true;
        this.uploadService.confirm(body).subscribe(
          response => {
            this.isLoading = false;
            this.snackBar.open(this.translations.CONFIRM_OK,
              this.viewContainerRef);

            this.showSummary = true;
            this.uploadResponse = {};
          },
          err => {
            this.isLoading = false;
            this.snackBar.open(this.translations.CONFIRM_ERROR,
              this.viewContainerRef);

            this.showSummary = false;
            this.uploadResponse = {};
          });
      }
    });
  }
  ngOnInit() {
  }

  clear() {
    this.upload = new Upload();
    this.formData = new FormData();
  }
}
