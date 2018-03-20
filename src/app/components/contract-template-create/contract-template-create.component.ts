import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ContractTemplate, ContractTypeEnum } from '../../models/contract-template.model';
import { ContractService }  from '../../services/contract.service';
import { SnackBar } from '../../services/snack-bar.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ActivatedRoute  } from '@angular/router';
import { Router } from '@angular/router';




@Component({
  selector: 'app-contract-template-create',
  templateUrl: './contract-template-create.component.html',
  styleUrls: ['./contract-template-create.component.css'],
})

export class ContractTemplateCreateComponent implements OnInit {

  contractTemplate: ContractTemplate = new ContractTemplate();;
  contractTypeEnum: string[] = Object.keys(ContractTypeEnum);
  isLoading: boolean = false;
  translations: any = {};
  constructor(
    private route: ActivatedRoute,
    private contractService: ContractService,
    private snackBar: SnackBar,
    private viewContainerRef: ViewContainerRef,
    private router: Router,
    private translate: TranslateService) {
    translate.get(['CREATE_OK', 'CREATE_ERROR']).subscribe(
      result => {
        this.translations = result;
      });
  }

  clear() {
    this.contractTemplate = new ContractTemplate();
  }

  create() {
    this.isLoading = true;
    this.contractService.create(this.contractTemplate).subscribe(
      response => {
        this.snackBar.open(this.translations.CREATE_OK, this.viewContainerRef);
        this.isLoading = false;
        this.clear();
        this.router.navigate(['/backoffice/contract-templates/',
          response.contractTemplateId]);
      },
      err => {
        this.isLoading = false;
        this.snackBar.open(this.translations.CREATE_ERROR,
          this.viewContainerRef);
      });
  }

  ngOnInit() {
  }

  keyupHandlerFunction(content) {
    this.contractTemplate.content = content;
  }
}
