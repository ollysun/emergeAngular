import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'app-prompt-dialog',
  template: ''
})

export class PromptDialogComponent implements OnInit {

  dialogRef: MdDialogRef<PromptDialog>;

  constructor(public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
  }

  public open(message: string, cb: Function) {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    PromptDialog.prototype.message = message;
    this.dialogRef = this.dialog.open(PromptDialog, config);
    this.dialogRef.afterClosed().subscribe(result => {
      cb(result);
      this.dialogRef = null;
    });
  }

}


@Component({
  selector: 'prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.css']
})

export class PromptDialog {

    @Input() message: string;

    constructor(public dialogRef: MdDialogRef<PromptDialog>) {

    }
}
