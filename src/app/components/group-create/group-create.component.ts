import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { ZoneService } from '../../services/zone.service';
import { PrefixService } from '../../services/prefix.service';
import { Group } from '../../models/group.model';
import { Zone } from '../../models/zone.model';
import { Prefix } from '../../models/prefix.model';

import { SnackBar } from '../../services/snack-bar.service';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {

  group: Group = new Group();
  zone: Zone = new Zone();
  prefix: Prefix = new Prefix();
  groups: any = [];
  zones: any = [];
  prefixes: any = [];
  translations: any = {};
  countries: Array<any> = [ {id: 1, name: 'Nigeria'}, {id: 2, name: 'Portugal'}, {id: 3, name: 'Malawi'} ];
  message: string = '';

  constructor(private groupService: GroupService, private zoneService: ZoneService,
  private prefixService: PrefixService, private router: Router,
  private snackBar: SnackBar, private viewContainerRef: ViewContainerRef,
  translate: TranslateService) {
     translate.get(['CREATE_OK', 'CREATE_ERROR']).subscribe(
        result => {
           this.translations = result;
       });
  }

  ngOnInit() {
     this.fetchGroups();
     this.fetchZones();
     this.fetchPrefixes();
  }

  createGroup() {
    this.groupService.create(this.group).subscribe(
      group => {
        this.resetGroup();
        this.fetchGroups();
        this.snackBar.open(this.translations.CREATE_OK, this.viewContainerRef);
      },
      err => {
        console.log(err);
        this.message = err.message || err.error || err;
        this.snackBar.open(this.translations.CREATE_ERROR, this.viewContainerRef);
      }
    );
  }

  createZone() {
    this.zone.groupId = 1;
    this.zoneService.create(this.zone).subscribe(
      zone => {
        this.resetZone();
        this.fetchZones();
        this.snackBar.open(this.translations.CREATE_OK, this.viewContainerRef);
      },
      err => {
        console.log(err);
        this.message = err.message || err.error || err;
        this.snackBar.open(this.translations.CREATE_ERROR, this.viewContainerRef);
      }
    );
  }

  createPrefix() {
    this.prefixService.create(this.prefix).subscribe(
      prefix => {
        this.resetPrefix();
        this.snackBar.open(this.translations.CREATE_OK, this.viewContainerRef);
      },
      err => {
        console.log(err);
        this.message = err.message || err.error || err;
        this.snackBar.open(this.translations.CREATE_ERROR, this.viewContainerRef);
      }
    );
  }

  resetGroup() {
    this.group = new Group();
  }

  resetZone() {
    this.zone = new Zone();
  }

  resetPrefix() {
    this.prefix = new Prefix();
  }

  private fetchGroups() {
    this.groupService.all('').subscribe(
       success => {
          this.groups = success.data;
       },
       err => {
         console.error(err);
         this.message = err.message || err.error || err;
      }
    );
  }

  private fetchZones() {
    this.zoneService.all('').subscribe(
       success => {
          this.zones = success.data;
      },
      err => {
         console.error(err);
         this.message = err.message || err.error || err;
     }
    );
  }

  private fetchPrefixes() {
    this.prefixService.all('').subscribe(
       success => {
          this.prefixes = success.data;
      },
      err => {
         console.error(err);
         this.message = err.message || err.error || err;
     }
    );
  }

}
