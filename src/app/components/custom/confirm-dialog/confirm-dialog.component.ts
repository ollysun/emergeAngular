import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { PayphonesComponent } from '../../payphones/payphones.component';
@Component({
  selector: 'app-confirm-dialog',
  template: ''
})

export class ConfirmDialogComponent implements OnInit {

  constructor(public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef) { }

  dialogRef: MdDialogRef<ConfirmDialog>;

  ngOnInit() {
  }

  public open(message: string, cb: Function) {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    ConfirmDialog.prototype.message = message;
    this.dialogRef = this.dialog.open(ConfirmDialog, config);
    this.dialogRef.afterClosed().subscribe(result => {
      cb(result);
      this.dialogRef = null;
    });
  }
}

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})

export class ConfirmDialog {
  constructor(public dialogRef: MdDialogRef<ConfirmDialog>) { }
  @Input() message: string;
}