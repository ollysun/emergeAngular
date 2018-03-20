import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { ModulationService } from '../../services/modulation.service';
import { Modulation } from '../../models/modulation.model';

@Component({
  selector: 'app-modulation-create',
  templateUrl: './modulation-create.component.html',
  styleUrls: ['./modulation-create.component.css']
})
export class ModulationCreateComponent implements OnInit {

  modulation: Modulation;

  constructor(private modulationService: ModulationService, private router: Router) { }

  ngOnInit() {
    this.modulation = new Modulation();
  }

  create() {
    let modulationOperation: Observable<Modulation>;
    modulationOperation = this.modulationService.create(this.modulation);
    modulationOperation.subscribe(
      success => {
        this.router.navigate(['/backoffice/modulations', this.modulation.id]);
      },
      err => {
        console.log(err);
      }
    );
  }

  cancel() {
    this.modulation = new Modulation();
  }

}
