import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TariffService } from '../../services/tariff.service';
import { Tariff } from '../../models/tariff.model';
import { GroupService } from '../../services/group.service';
import { ModulationService } from '../../services/modulation.service';
import { ModulationType } from '../../models/modulation-type.model';
import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';
import { SnackBar } from '../../services/snack-bar.service';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.css'],
  entryComponents: [ConfirmDialog]
})
export class TariffsComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog;
  inProgress: boolean;
  isLoading: boolean;
  tempTariff: Tariff;
  tariff: Tariff;
  tariffs: any = [];
  translations: any = {};

  groups: any = [];
  profiles: any = [];
  modulations: any = [];
  modulationTypes: any = [];

  message = '';

  constructor(private tariffService: TariffService,
    private groupService: GroupService,
    private modulationService: ModulationService, private router: Router,
    private snackBar: SnackBar, private viewContainerRef: ViewContainerRef,
    translate: TranslateService) {
    translate.get(['CREATE_OK', 'UPDATE_OK', 'DELETE_OK', 'CREATE_ERROR', 'UPDATE_ERROR', 'DELETE_ERROR']).subscribe(
      result => {
        this.translations = result;
      });
  }

  ngOnInit() {
    this.isLoading = false;
    this.resetTariff();
    this.fetchTariffs();
    this.fetchGroups();
    this.fetchProfiles();
    this.fetchModulations();

    this.modulationTypes = [
      new ModulationType(1, 'PEAK'),
      new ModulationType(2, 'OFF PEAK')
    ];
  }

  create() {
    console.log(this.tariff);
    this.tariffService.createTariff(this.tariff).subscribe(
      tariff => {
        this.tariffs.push(tariff);
        this.cancel();
        this.snackBar.open(this.translations.CREATE_OK, this.viewContainerRef);
      },
      err => {
        console.error(err);
        this.message = err.message || err.error || err;
        this.snackBar.open(this.translations.CREATE_ERROR, this.viewContainerRef);
      }
    );
  }

  update() {
    this.tariffService.updateTariff(this.tariff, this.tariff.id).subscribe(
      tariff => {
        this.cancel();
        this.snackBar.open(this.translations.UPDATE_OK, this.viewContainerRef);
      },
      err => {
        console.error(err);
        this.message = err.message || err.error || err;
        this.snackBar.open(this.translations.UPDATE_ERROR, this.viewContainerRef);
      }
    );
  }

  delete(tariff) {
    this.confirmDialog.open(null, ok => {
      if (ok) {
        this.tariffService.deleteTariff(tariff.id).subscribe(
          success => {
            console.log('success');
            this.removeTariffFromList(tariff);
            this.snackBar.open(this.translations.DELETE_OK, this.viewContainerRef);
          },
          err => {
            console.log(err);
            this.message = err.message || err.error || err;
            this.snackBar.open(this.translations.DELETE_ERROR, this.viewContainerRef);
          }
        );
      }
    });
  }

  cancel() {

    if(this.tempTariff){
       this.removeTariffFromList(this.tariff);
       this.tariffs.push(this.tempTariff);
       this.tempTariff = null;
    }

    this.inProgress = false;
    this.resetTariff();
  }

  showCreationForm(tariff?: Tariff) {
    if (tariff) {
      this.setCurrentTariff(tariff);
      this.tempTariff = this.copy(tariff);
      console.log(this.tempTariff, 'temp tariff in creation form');
    } else {
      this.resetTariff();
    }

    this.inProgress = true;
  }

  private fetchTariffs() {
    this.isLoading = true;
    this.tariffService.allTariff('').subscribe(
      success => {
        this.tariffs = success.data;
        console.log(success, 'tariffs');
        this.isLoading = false;
      },
      err => {
        console.error(err);
        this.isLoading = false;
        this.message = err.message || err.error || err;
      }
    );
  }

  private fetchGroups() {
    this.groupService.all().subscribe(
      success => {
        this.groups = success.data;
        console.log(success, 'groups');
      },
      err => {
        console.error(err);
        this.message = err.message || err.error || err;
      }
    );
  }

  private fetchProfiles() {
    this.profiles = [{ id: 1, name: 'Profile1' }];
  }

  private fetchModulations() {
    //this.modulations = [{id: 2}, {id: 1}];
    this.modulationService.all().subscribe(
      success => {
        this.modulations = success.data;
        console.log(success, 'modulations');
      },
      err => {
        console.error(err);
        this.message = err.message || err.error || err;
      }
    );
  }

  private removeTariffFromList(tariff) {
    for (let i = 0; i < this.tariffs.length; i++) {
      if (tariff.id === this.tariffs[i].id) {
        let idx = i;
        this.tariffs.splice(idx, 1);
        return;
      }
    }
  }

  private setCurrentTariff(t: Tariff) {
    this.tariff = t;
  }

  private resetTariff() {
    this.setCurrentTariff(new Tariff());
  }

  private copy(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    let temp = obj.constructor();
    for (let key in obj) {
      temp[key] = this.copy(obj[key]);
    }

    return temp;
  }
}
