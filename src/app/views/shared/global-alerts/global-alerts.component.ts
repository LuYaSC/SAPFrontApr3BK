import { Component, Injectable, Input, OnInit } from '@angular/core';

@Injectable()
@Component({
  selector: 'app-global-alerts',
  templateUrl: './global-alerts.component.html',
  styleUrls: ['./global-alerts.component.scss']
})
export class GlobalAlertsComponent implements OnInit {


  position = 'top-end';
  @Input() visible = false;
  percentage = 0;
  @Input() message= '';

  constructor() { }

  ngOnInit(): void {
  }

}
