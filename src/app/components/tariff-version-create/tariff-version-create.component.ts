import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TariffService } from '../../services/tariff.service';
import { TariffVersion } from '../../models/tariff-version.model';

import { SnackBar } from '../../services/snack-bar.service';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'app-tariff-version-create',
  templateUrl: './tariff-version-create.component.html',
  styleUrls: ['./tariff-version-create.component.css']
})
export class TariffVersionCreateComponent implements OnInit {

  tariffVersion: TariffVersion = new TariffVersion();
  message = '';
  translations: any = {};

  constructor(private tariffService: TariffService, private snackBar: SnackBar,
  private viewContainerRef: ViewContainerRef, translate: TranslateService) {
     translate.get(['CREATE_OK', 'CREATE_ERROR']).subscribe(
        result => {
          this.translations = result;
      });
  }

  ngOnInit() {
  }

  create(event) {
    console.log(this.tariffVersion);

    this.tariffService.create(this.tariffVersion).subscribe(
      success => {
        console.log(success);
        this.snackBar.open(this.translations.CREATE_OK, this.viewContainerRef);
      },
      err => {
        console.log(err);
        this.message = err.message || err.error || err;
        this.snackBar.open(this.translations.CREATE_ERROR, this.viewContainerRef);
      }
    );
    this.reset();
  }

  cancel() {
    this.reset();
  }

  reset() {
    this.tariffVersion = new TariffVersion();
  }

}
