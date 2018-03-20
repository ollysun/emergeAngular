import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  year: number = 2016;
  ngOnInit() {
    this.year = (new Date()).getFullYear();
  }
}
