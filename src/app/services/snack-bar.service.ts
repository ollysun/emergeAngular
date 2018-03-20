import { Injectable, ViewContainerRef } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from 'ng2-translate/ng2-translate';
@Injectable()
export class SnackBar {
  constructor(private snackBar: MdSnackBar, private translate: TranslateService) { }

  open(text: string, viewContainerRef: ViewContainerRef, label?: string) {
    this.translate.get('OK').subscribe(
      result => {
        this.snackBar.open(text, label || result);
      }
    );
  }
}
