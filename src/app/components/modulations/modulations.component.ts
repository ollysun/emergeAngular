import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModulationService } from '../../services/modulation.service';
import { Modulation } from '../../models/modulation.model';
import { Profile } from '../../models/profile.model';
import { ModulationType } from '../../models/modulation-type.model';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';
import { SnackBar } from '../../services/snack-bar.service';
import { TariffService } from '../../services/tariff.service';
import { Utils } from '../../shared/utils';

@Component({
  selector: 'app-modulations',
  templateUrl: './modulations.component.html',
  styleUrls: ['./modulations.component.css'],
  entryComponents: [ConfirmDialog]
})
export class ModulationsComponent implements OnInit {

  @ViewChild('confirmDialog') confirmDialog;

  modulations: any[] = [];
  modulationsCopy: any[] = [];
  currentModulation: any = {};
  tariffVersions: any = [];
  newModulations: any = [];
  // searchActive: boolean = false;
  public days: string[] = [];
  parsedDays: string[][] = [];
  profiles: any = [];
  modulationTypes: any = [];
  endTimes: any = [];
  translations: any = {};
  isLoading: boolean;
  message = '';

  constructor(private modulationService: ModulationService, private tariffService: TariffService,
  private router: Router, private translate: TranslateService,
  private snackBar: SnackBar, private viewContainerRef: ViewContainerRef) {
     translate.get(['CREATE_OK', 'CREATE_ERROR', 'UPDATE_OK', 'UPDATE_ERROR', 'DELETE_OK', 'DELETE_ERROR']).subscribe(
        result => {
           this.translations = result;
     });
  }

  ngOnInit() {
    this.profiles = [new Profile()];
    this.modulationTypes = [
      new ModulationType(1, 'PEAK'),
      new ModulationType(2, 'OFF PEAK')
    ];

    for(let i = 1; i <= 24; i++) {
        this.endTimes.push(i);
    }

    this.translate.get(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'HOLIDAY']).subscribe(
      days => {
        this.days = Object.keys(days).map(item => {
          return days[item];
        });

        this.isLoading = true;
        this.fetchModulations();
        this.fetchTariffVersions();

      },
      err => {

      });
  }

  processDay(days: string): string[] {
    return days.split(/\d{0}/).map(item => {
      return this.days[parseInt(item, 10) - 1];
    });
  }

  getDayString(days: string[]): string {
    return days.map(item => {
      return this.days.indexOf(item) + 1;
    }).join('');
  }

  queueModulation() {
    let newModulation = new Modulation();
    newModulation.name = 'Name';
    newModulation.profileId = this.profiles[0].id;
    this.parsedDays.unshift([]);
    this.modulations.unshift(newModulation);
    this.newModulations.push(newModulation);
    this.scrollToBottom(document.getElementsByClassName('search-results')[0]);
  }

  scrollToBottom(elem){
  let element = elem; // document.getElementById(id);
  console.log(element);
  console.log(element.scrollTop);
   element.scrollTop = 1925; //element.scrollHeight;
   document.body.scrollTop = element.scrollHeight;
   console.log(document.body.scrollTop);
   console.log(element.scrollHeight);
   console.log(element.scrollTop);
  }

  create() {
    console.log(this.newModulations);
    for (let i = 0; i < this.newModulations.length; i++) {
      this.save(i); // this.createNewModulation(this.newModulations[i]);
    }
  }

  save(index: number) {

    let modulation = this.modulations[index];
    modulation.days = this.getDayString(this.parsedDays[index]);
    console.log(modulation);

    if (modulation.id > 0) {
      // update
      this.modulationService.update(modulation, modulation.id).subscribe(
        success => {
          console.log(success, 'response object');
          this.modulationsCopy[index] = Utils.copy(modulation);
          this.snackBar.open(this.translations.UPDATE_OK, this.viewContainerRef);
        },
        err => {
          console.error(err);
          this.snackBar.open(this.translations.UPDATE_ERROR, this.viewContainerRef);
        }
      );
    } else {
      // Create
      this.createNewModulation(modulation);
    }

  }

  delete(modulation) {
     this.confirmDialog.open(null, ok => {
        if (ok) {
           this.modulationService.delete(modulation.id).subscribe(
              success => {
                this.removeFromList(modulation);
                this.snackBar.open(this.translations.DELETE_OK, this.viewContainerRef);
              },
              err => {
                console.error(err);
                this.snackBar.open(this.translations.DELETE_ERROR, this.viewContainerRef);
              }
           );
        }
     });
  }

  cancel(index: number) {
    this.modulations[index] = Utils.copy(this.modulationsCopy[index]);
  }

/*
  setCurrentModulation(modulation){
     if ( !(this.currentModulation) ) {
        this.currentModulation = Utils.copy(modulation); //modulation;
        console.log(this.currentModulation, 'first test passed');
     }

     if (this.currentModulation.id === modulation.id) {
        console.log(modulation, 'test passed');
        return;
     }

     this.currentModulation = Utils.copy(modulation); //modulation;
     console.log(this.currentModulation, 'test failed');
  }
*/

  private createNewModulation(modulation: Modulation) {
    console.log(modulation);

    let modulationOperation: Observable<Modulation>;
    modulationOperation = this.modulationService.create(modulation);
    modulationOperation.subscribe(
      success => {
        console.log(success, 'response object');
        modulation.id = success.id;
        this.modulationsCopy.unshift(modulation);
        this.snackBar.open(this.translations.CREATE_OK, this.viewContainerRef);
      },
      err => {
        console.error(err);
        this.message = err.message || err.error || err;
        this.snackBar.open(this.translations.CREATE_ERROR, this.viewContainerRef);
      }
    );
  }

  private fetchModulations() {
    this.modulationService.all('').subscribe(
       success => {
          this.modulations = success.data;
          this.modulationsCopy = Utils.copy(this.modulations);
          this.modulations.forEach((item, index) => {
            this.parsedDays[index] = this.processDay( String(item.days) );
          });
          this.isLoading = false;
       },
       error => {
         console.error(error);
         this.isLoading = false;
      }
    );
  }

  private fetchTariffVersions() {

    this.tariffService.all('').subscribe(
      tariffVersions => {
          this.tariffVersions = tariffVersions.data;
      },
      err => {
          console.error(err);
      });
  }

  private removeFromList(modulation) {

     let index = this.getModulationIndex(modulation);

     if (index === -1) {
       return;
     }

     if (this.newModulations.length) {

       // TO DO: work on this logic
       let newModsIndex = this.modulations.length - (index + 1);
       this.newModulations.splice(newModsIndex, 1);
     }

     if (this.modulations.length) {
       this.modulations.splice(index, 1);
     }

  }

  private getModulationIndex(modulation) {
    for (let i = 0; i < this.modulations.length; i++) {
      if (this.modulations[i].id === modulation.id) {
        return i;
      }
    }

    return -1;
  }

}
