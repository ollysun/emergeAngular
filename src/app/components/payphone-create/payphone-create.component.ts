import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PayphoneService_ } from '../../services/payphone.service';
import { PayphoneService } from '../../models/payphone-service.model';
import { CreditButton } from '../../models/credit-button.model';
import { StatusEnum } from '../../models/status.model';
import { SnackBar } from '../../services/snack-bar.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Utils } from '../../shared/utils';

@Component({
  selector: 'app-payphone-create',
  templateUrl: './payphone-create.component.html',
  styleUrls: ['./payphone-create.component.css']
})
export class PayphoneCreateComponent implements OnInit {

  @Input() payphone: PayphoneService = new PayphoneService();
  formSubmitted = false;
  message: string;
  isLoading: boolean = false;
  translations: any = {};
  preferredSIM: string = 'sim1';
  statusEnum: string[] = Object.keys(StatusEnum);
  usernameIsValid = false;
  usernameLengthIsOk = false;
  usernameRegExp: RegExp = Utils.regexp.username;

  constructor(private payphoneService: PayphoneService_, private router: Router,
    private snackBar: SnackBar, private viewContainerRef: ViewContainerRef,
    translate: TranslateService) {
    translate.get(['CREATE_OK', 'CREATE_ERROR']).subscribe(
      result => {
        this.translations = result;
      });
  }

  ngOnInit() {
    this.generatePassword();
  }

  validateUsername(username) {
    if (username === '') {
      this.usernameIsValid = true;
      this.usernameLengthIsOk = true;
      return;
    }

    this.usernameIsValid = !/^\w+$/.test(username);
    this.validateUsernameLength(username);
  }

  private validateUsernameLength(username) {
    this.usernameLengthIsOk = !/^.{5,15}$/.test(username);
  }

  create() {
    this.formSubmitted = true;

    this.isLoading = true;
    this.payphoneService.create(this.payphone).subscribe(
      payphoneService => {
        this.resetSubmitState();
        this.snackBar.open(this.translations.CREATE_OK, this.viewContainerRef);
        this.router.navigate(['/backoffice/payphones', payphoneService.id]);
      },
      err => {
        console.log(err);
        this.message = err.message || err.error || err;
        this.resetSubmitState();
        this.snackBar.open(this.translations.CREATE_ERROR,
          this.viewContainerRef);
      }
    );
  }

  selectPreferredMSISDN($event: any) {
    this.preferredSIM = $event.value;
  }

  cancel() {
    this.payphone = new PayphoneService();
    this.generatePassword();
    this.resetSubmitState();
  }

  resetSubmitState() {
    this.isLoading = false;
    this.formSubmitted = false;
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
}
