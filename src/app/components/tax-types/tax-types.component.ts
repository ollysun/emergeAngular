import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tax-types',
  templateUrl: './tax-types.component.html',
  styleUrls: ['./tax-types.component.css']
})
export class TaxTypesComponent implements OnInit {

  @Input() isVisible: boolean = true;
  constructor() { }
  searchkeys = [
    { id: 1, key: '2e3r4' },
    { id: 2, key: '1234r4' }
  ];
  ngOnInit() {
  }

}
