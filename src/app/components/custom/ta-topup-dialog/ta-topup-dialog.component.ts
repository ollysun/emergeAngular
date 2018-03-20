import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';


@Component({
  selector: 'app-ta-topup-dialog',
  template: ''
})

export class TaTopupDialogComponent implements OnInit {
  dialogRef: MdDialogRef<TaTopupDialog>;
  constructor(public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
  }

  public open(cb: Function) {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    this.dialogRef = this.dialog.open(TaTopupDialog, config);
    this.dialogRef.afterClosed().subscribe(result => {
      cb(result);
      this.dialogRef = null;
    });
  }
}

@Component({
  selector: 'ta-topup-dialog',
  templateUrl: './ta-topup-dialog.component.html',
  styleUrls: ['./ta-topup-dialog.component.css']
})

export class TaTopupDialog {
  @Input() message: string;
  topUp: any = {
    reasonForTopUp: '',
    topUpValue: ''
  }

  constructor(public dialogRef: MdDialogRef<TaTopupDialog>) { }
}
