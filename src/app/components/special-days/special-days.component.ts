import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialDay } from '../../models/special-day.model';
import { SpecialDayService } from '../../services/special-day.service';
import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';
import { SnackBar } from '../../services/snack-bar.service';
import { Utils } from '../../shared/utils';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'app-special-days',
  templateUrl: './special-days.component.html',
  styleUrls: ['./special-days.component.css'],
  entryComponents: [ConfirmDialog],
  providers: [SpecialDayService]
})
export class SpecialDaysComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog;
  specialDay: SpecialDay;
  specialDays = [];
  specialDaysCopy: any[] = [];
  // currentSpecialDay: any = {};
  message: string = '';
  isLoading: boolean;
  autoCompleteList = [];
  listType: string = '';
  isEditing: boolean = false;
  days: string[] = [];
  daysObj = [];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

  monthsObj = [ {month: 'January'}, {month: 'February'}, {month: 'March'}, {month: 'April'},
             {month: 'May'}, {month: 'June'}, {month: 'July'}, {month: 'August'},
             {month: 'September'}, {month: 'October'}, {month: 'November'}, {month: 'December'} ];

  years = [];
  yearsObj = [];
  translations: any = {};

  constructor(private specialDayService: SpecialDayService,
    private router: Router, private snackBar: SnackBar,
    private viewContainerRef: ViewContainerRef, translate: TranslateService) {
    translate.get(['CREATE_OK', 'UPDATE_OK', 'DELETE_OK', 'CREATE_ERROR',
      'UPDATE_ERROR', 'DELETE_ERROR']).subscribe(
      result => {
        this.translations = result;
      });

     for (let i=1; i <=31; i++) {
       this.days.push(String(i));
       this.daysObj.push({'day': i});
     }
  }

  ngOnInit() {
    this.specialDay = new SpecialDay();
    this.years = this.range(2016, 100);
    this.years.forEach( (yearElem) => {
         this.yearsObj.push({'year': yearElem})
    });
    this.fetchSpecialDays();
  }

  create() {

    this.specialDay.month = this.getMonthInt(this.specialDay.month);

    this.specialDayService.create(this.specialDay).subscribe(
      specialDay => {
        specialDay.month = this.getMonthString(specialDay.month);
        this.specialDays.shift();
        this.specialDays.unshift(specialDay);
        this.specialDaysCopy.unshift(specialDay);
        this.cancel();
        this.snackBar.open(this.translations.CREATE_OK, this.viewContainerRef);
      },
      err => {
        console.log(err);
        this.message = err.message || err.error || err;
        this.snackBar.open(this.translations.CREATE_ERROR,
          this.viewContainerRef);
      }
    );
  }

  update() {

    let sentData = Utils.copy(this.specialDay);
    sentData.month = this.getMonthInt(sentData.month);

    // this.specialDay.month = this.getMonthInt(this.specialDay.month);
    // this.specialDayService.update(this.specialDay, this.specialDay.id)
    this.specialDayService.update(sentData, sentData.id)
      .subscribe(success => {
        console.log(success);

        for (let i = 0; i < this.specialDaysCopy.length; i++) {
           if(success.id === this.specialDaysCopy[i].id ){
               this.specialDaysCopy[i] = Utils.copy(success);
               return;
           }
        }

        this.normalizeMonthsView();
        this.cancel();
        this.snackBar.open(this.translations.UPDATE_OK, this.viewContainerRef);
      },
      err => {
        console.log(err);
        this.message = err.message || err.error || err;
        this.snackBar.open(this.translations.UPDATE_ERROR,
          this.viewContainerRef);
      });
  }

  get(id: number) {
    this.specialDayService.get(String(id)).subscribe(
      specialDay => {
        this.specialDay = specialDay;
      },
      err => {
        this.specialDay = null;
        console.log(err);
        this.message = err.message || err.error || err;
      });
  }

  delete(specialDay) {
    this.confirmDialog.open(null, ok => {
      if (ok) {
        this.specialDayService.delete(specialDay.id).subscribe(
          success => {
            this.removeFromList(specialDay);
            this.cancel();
            this.snackBar.open(this.translations.DELETE_OK,
              this.viewContainerRef);
          },
          err => {
            this.message = err.message || err.error || err;
            this.snackBar.open(this.translations.DELETE_ERROR,
              this.viewContainerRef);
          });
      }
    });
  }

  removeFromList(specialDay) {
    for (let i = 0; i < this.specialDays.length; i++) {
      if (this.specialDays[i].id === specialDay.id) {
        this.specialDays.splice(i, 1);
        return;
      }
    }
  }

  cancelEditing(index: number) {

    // if in the process of creating a new special day,
    // you decide to discard, and not create it anymore
    if (!this.specialDays[index].id){
      this.specialDays.splice(index, 1);
      return;
    }

    //when editing an already created/existing special day
    this.specialDays[index] = Utils.copy(this.specialDaysCopy[index]);
  }

  cancel() {
    this.reset();
    //this.specialDays.shift();
  }

  reset() {
    this.specialDay = new SpecialDay();
  }

  showEditForm() {
    this.isEditing = true;
  }

  hideEditForm() {
    this.isEditing = false;
  }

  // possible models: day, month,
  // possible types: days, months
  showAutoCompleteList(model, type) {
    this.autoCompleteList = this[type];
    this.listType = type;
  }

  select(model, item) {
    this.specialDay[model] = String(item);
    this.resetAutoCompleteList();
  }

  resetAutoCompleteList() {
    this.autoCompleteList = [];
  }

  restrictValueTo(arr, model) {
    setTimeout(_ => this.resetAutoCompleteList(), 100);
    for (let i = 0; i < this[arr].length; i++) {
      if (this[arr][i] === this.specialDay[model]) {
        return;
      }
    }

    this.specialDay[model] = '';
  }

  range(start, count) {
    return Array.apply(0, Array(count))
      .map(function(element, index) {
        return String(index + start);
      });
  }

  private fetchSpecialDays() {
    this.isLoading = true;
    this.specialDayService.all('').subscribe(
      success => {
        this.specialDays = success.data;
        this.specialDaysCopy = Utils.copy(this.specialDays);
        this.normalizeMonthsView();
        this.isLoading = false;
      },
      err => {
        console.error(err, 'special days fetch error');
        this.isLoading = false;
        this.message = err.message || err.error || err;
      }
    );
  }

  private normalizeMonthsView() {
    for (let i = 0; i < this.specialDays.length; i++) {
      if (typeof this.specialDays[i].month === 'number') {
        this.specialDays[i].month = this
          .getMonthString(this.specialDays[i].month);
      }
    }
  }

  private getMonthString(monthInt) {
    return this.months[monthInt];
  }

  private getMonthInt(month) {
    let monthsMap = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10,
      'December': 11
    };
    return monthsMap[month];
  }
}
