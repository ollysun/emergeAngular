import { Component, OnInit, ViewContainerRef, ViewChild,
  style, animate, transition, trigger, Input } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { PayphoneService_ } from '../../services/payphone.service';
import { PayphoneService } from '../../models/payphone-service.model';
import { CreditButton } from '../../models/credit-button.model';
import { StatusEnum } from '../../models/status.model';
import { SnackBar } from '../../services/snack-bar.service';
import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';
import { PromptDialog } from '../custom/prompt-dialog/prompt-dialog.component';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Utils } from '../../shared/utils';

@Component({
  selector: 'app-payphone',
  templateUrl: './payphone.component.html',
  styleUrls: ['./payphone.component.css'],
  entryComponents: [ConfirmDialog, PromptDialog],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(1500, style({ opacity: 1 }))
      ]),
      transition(':leave', [    // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})

export class PayphoneComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog;
  @ViewChild('promptDialog') promptDialog;
  @ViewChild('msisdn1Radio') msisdn1Radio;
  @ViewChild('msisdn2Radio') msisdn2Radio;

  @Input('payphone') payphone: PayphoneService = new PayphoneService();
  originalPayphone: PayphoneService = new PayphoneService();
  formSubmitted = false;
  statusEnum: string[] = Object.keys(StatusEnum);
  message: string;
  isLoading: boolean = false;
  preferredMSISDN: string = '';
  preferredSIM: string = 'sim1';
  showDeviceInfo: boolean = false;
  phoneRegExp: RegExp = Utils.regexp.phone;
  usernameRegExp: RegExp = Utils.regexp.username;
  translations: any = {};

  constructor(private route: ActivatedRoute, private router: Router,
    private payphoneService: PayphoneService_, private snackBar: SnackBar,
    private viewContainerRef: ViewContainerRef, translate: TranslateService) {
    translate.get(['UPDATE_OK', 'UPDATE_ERROR', 'DELETE_OK', 'DELETE_ERROR',
      'TOPUP_OK', 'TOPUP_ERROR', 'SET_BALANCE_OK', 'SET_BALANCE_ERROR',
      'POSITIVE_NUMBER_EXPECTED'])
      .subscribe(result => {
        this.translations = result;
      });
  }

  ngOnInit() {

  }

  ispreferredMSISDN(msisdn: string): boolean {
    return (this.payphone.configData.preferredMSISDN === msisdn);
  }

  selectPreferredMSISDN($event: any) {
    this.preferredSIM = $event.value;
  }

  update() {
    const preferredMSISDN = this.payphone[this.preferredSIM].msisdn;
    if (!preferredMSISDN) {
      this.message = 'Please select a preferred SIM ';
      this.snackBar.open(this.message, this.viewContainerRef);
      return false;
    } else {
      this.payphone.configData.preferredMSISDN = preferredMSISDN;
    }

    return true;
  }

  deselectRadioButton(id) {
    let d = document.getElementById(id);
    d.className = d.className.replace('md-radio-checked', '');
  }

  checkPreferredMSISDN() {
    let s1 = document.getElementById('msisdn1Radio');
    let s2 = document.getElementById('msisdn2Radio');

    if (this.ispreferredMSISDN(this.payphone.sim1.msisdn)) {
      s2.className = s2.className.replace('md-radio-checked', '');
      s1.className = (s1.className + ' md-radio-checked');
    } else {
      s1.className = s1.className.replace('md-radio-checked', '');
      s2.className = (s2.className + ' md-radio-checked');
    }
  }

  delete() {
    this.confirmDialog.open(null, ok => {
      if (ok) {
        this.payphoneService.delete(this.payphone.id)
          .subscribe(success => {
            // this.snackBar.open('😊', this.viewContainerRef);
            this.snackBar.open(this.translations.DELETE_OK,
              this.viewContainerRef);

            this.router.navigate(['/backoffice/payphones']);
          },
          err => {
            console.log(err);
            this.snackBar.open(err, this.viewContainerRef);
            this.snackBar.open(this.translations.DELETE_ERROR,
              this.viewContainerRef);
          });
      }
    });
  }

  topup() {
    this.isLoading = true;
    this.promptDialog.open('ENTER_TOPUP_AMOUNT', topupAmount => {
      if (topupAmount) {
        if (this.isNegative(topupAmount)) {
          this.snackBar.open(this.translations.POSITIVE_NUMBER_EXPECTED,
            this.viewContainerRef);

          return;
        }

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
    });
  }

  setBalance() {
    this.isLoading = true;
    this.promptDialog.open('ENTER_AMOUNT', ok => {
      if (ok) {
        let amount = ok;
        if (this.isNegative(amount)) {
          this.snackBar.open(this.translations.POSITIVE_NUMBER_EXPECTED,
            this.viewContainerRef);

          return;
        }

        this.payphoneService.setBalance(amount, this.payphone.id).subscribe(
          response => {
            console.log(response);
            this.payphone.balance = response.creditAfterTopup;
            this.resetSubmitState();
            this.snackBar.open(this.translations.SET_BALANCE_OK,
              this.viewContainerRef);
          },
          err => {
            console.log(err);
            this.snackBar.open(err, this.viewContainerRef);
            this.snackBar.open(this.translations.SET_BALANCE_ERROR,
              this.viewContainerRef);
          });
      }
    });
  }

  resetForm() {
    this.payphone = <PayphoneService>Utils.copy(this.originalPayphone);
  }

  resetSubmitState() {
    this.formSubmitted = false;
    this.isLoading = false;
    this.originalPayphone = <PayphoneService>Utils.copy(this.payphone);
  }

  addCreditButton() {
    this.payphone.configData.creditButtons.push(new CreditButton());
  }

  removeCreditButton(index) {
    if (this.payphone.configData.creditButtons.length > 0) {
      this.payphone.configData.creditButtons.splice(index, 1);
    }
  }

  generatePassword() {
    this.payphoneService.generatePassword().subscribe(
      res => {
        this.payphone.credentials.password = res.password;
      },
      err => {
        console.log(err);
      }
    );
  }

  private isNegative(i) {
    return /^-/.test(i);
  }
}
