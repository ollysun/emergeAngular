import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {

  @Input('toggle') toggle: any =  {
    show: true,
    labels: ['Hide', 'Show']
  };

  private label: string;
  constructor() {}

  ngOnInit() {
  }

  toggleControl() {
    this.toggle.show = !this.toggle.show;
  }
}
