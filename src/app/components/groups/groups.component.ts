import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { GroupService } from '../../services/group.service';
import { ZoneService } from '../../services/zone.service';
import { PrefixService } from '../../services/prefix.service';

import { ConfirmDialog } from '../custom/confirm-dialog/confirm-dialog.component';
import { SnackBar } from '../../services/snack-bar.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Utils } from '../../shared/utils';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  entryComponents: [ConfirmDialog]
})
export class GroupsComponent implements OnInit {

 @ViewChild('confirmDialog') confirmDialog;

  countries: any = [];
  groups: any = [];
  zones: any = [];
  groupsAutoCompleteData: any[] = [];
  prefixes: any = [];
  translations: any = {};
  isLoading: boolean = false;
  groupSearch: boolean;
  zoneSearch: boolean;
  prefixSearch: boolean;
  message = '';
  groupsQuery: any = {};
  zonesQuery: any = {};
  prefixesQuery: any = {};

  constructor(private groupService: GroupService, private zoneService: ZoneService,
  private prefixService: PrefixService, private router: Router,
  private snackBar: SnackBar, private viewContainerRef: ViewContainerRef,
  translate: TranslateService) {
     translate.get(['UPDATE_OK', 'DELETE_OK', 'UPDATE_ERROR', 'DELETE_ERROR']).subscribe(
        result => {
         this.translations = result;
    });

  }

  ngOnInit() {
    this.countries = CountryService.countryEnum();

    this.fetchGroups(data => {
       this.groups = data;
    });

    this.fetchZones(data => {
       this.zones = data;
    });

    this.fetchPrefixes(data => {
       this.prefixes = data;
    });

    this.fetchGroupsAutocompleteData();

  }

  searchGroups() {
      this.isLoading = true;
      this.fetchGroups(data => {
        this.groups = data;
        this.groupSearch = true;
        this.isLoading = false;
      });
  }

  searchZones() {
     this.isLoading = true;
     this.fetchZones(data => {
        this.zones = data;
        this.zoneSearch = true;
        this.isLoading = false;
     });
  }

  searchPrefixes(){
     this.isLoading = true;
     this.fetchPrefixes(data => {
        this.prefixes = data;
        this.prefixSearch = true;
        this.isLoading = false;
     });
  }

  getGroup(id) {
    this.groupService.get(id).subscribe(
      success => {
        console.log(success);
      },
      error => {

      }
    );
  }

  getZone(id) {
    this.zoneService.get(id).subscribe(
      success => {
        console.log(success);
      },
      error => {

      }
    );
  }

  getPrefix(id) {
    this.prefixService.get(id).subscribe(
      success => {
        console.log(success);
      },
      error => {

      }
    );
  }

  updateGroup(group) {
    this.groupService.update(group, group.id).subscribe(
      success => {
        this.getGroup(group.id);
        this.snackBar.open(this.translations.UPDATE_OK, this.viewContainerRef);
      },
      err => {
        this.message = err.message || err.error || err;
        this.snackBar.open(this.translations.UPDATE_ERROR, this.viewContainerRef);
      }
    );
  }

  restoreGroup(group) {
    // TODO
  }

  restoreZone(zone) {
    // TODO
  }

  restorePrefix(prefix) {
    // TODO
  }

  updateZone(zone) {
    this.zoneService.update(zone, zone.id).subscribe(
      success => {
        this.getZone(zone.id);
        this.snackBar.open(this.translations.UPDATE_OK, this.viewContainerRef);
      },
      err => {
         this.message = err.message || err.error || err;
         this.snackBar.open(this.translations.UPDATE_ERROR, this.viewContainerRef);
      }
    );
  }

  updatePrefix(prefix) {
    console.log(prefix);
    this.prefixService.update(prefix, prefix.id).subscribe(
      success => {
        this.getPrefix(prefix.id);
        this.snackBar.open(this.translations.UPDATE_OK, this.viewContainerRef);
      },
      err => {
         this.message = err.message || err.error || err;
         this.snackBar.open(this.translations.UPDATE_ERROR, this.viewContainerRef);
      }
    );
  }

  deleteGroup(group) {

    this.confirmDialog.open(null, ok => {
       if (ok) {
          this.groupService.delete(group.id).subscribe(
            success => {
              this.removeGroupFromList(group);
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

  deleteZone(zone) {
     this.confirmDialog.open(null, ok => {
        if (ok) {
        this.zoneService.delete(zone.id).subscribe(
          success => {
            this.removeZoneFromList(zone);
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

  deletePrefix(prefix) {
     this.confirmDialog.open(null, ok => {
        if (ok) {
        this.prefixService.delete(prefix.id).subscribe(
          success => {
            this.removePrefixFromList(prefix);
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

  fetchGroupsAutocompleteData(event?: any) {

     let query = { offset: 0, limit: 20, name: '' };

     if (event) {
        let groupName = event.target.value;
        query.name = groupName;
     }

     query = Utils.searchFilter(query);

     this.groupService.all(query).subscribe(
       success => {
          this.groupsAutoCompleteData = success.data;
          console.log(success, 'fetch groups autocomplete');
       },
       error => {
         console.error(error);
      }
    );
  }

  private fetchGroups(doneCallback: Function) {

     this.groupsQuery = Utils.searchFilter(this.groupsQuery);
     this.zoneSearch = false;
     this.prefixSearch = false;

     this.groupService.all(this.groupsQuery).subscribe(
       success => {
          doneCallback(success.data);
       },
       error => {
         console.error(error);
      }
    );
  }

  private fetchZones(doneCallback: Function) {

     this.zonesQuery = Utils.searchFilter(this.zonesQuery);
     this.groupSearch = false;
     this.prefixSearch = false;

     this.zoneService.all(this.zonesQuery).subscribe(
       success => {
          doneCallback(success.data);
      },
      error => {
       console.error(error);
     }
    );
  }

  private fetchPrefixes(doneCallback: Function) {

     this.prefixesQuery = Utils.searchFilter(this.prefixesQuery);
     this.zoneSearch = false;
     this.groupSearch = false;

     this.prefixService.all(this.prefixesQuery).subscribe(
       success => {
          doneCallback(success.data);
      },
      error => {
         console.error(error);
     }
    );
  }

  private removeGroupFromList(group) {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id === group.id) {
        this.groups.splice(i, 1);
        return;
      }
    }
  }

  private removeZoneFromList(zone) {
    for (let i = 0; i < this.zones.length; i++) {
      if (this.zones[i].id === zone.id) {
        this.zones.splice(i, 1);
        return;
      }
    }
  }

  private removePrefixFromList(prefix) {
    for (let i = 0; i < this.prefixes.length; i++) {
      if (this.prefixes[i].id === prefix.id) {
        this.prefixes.splice(i, 1);
        return;
      }
    }
  }

}
