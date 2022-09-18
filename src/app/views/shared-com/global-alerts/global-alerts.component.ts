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
  @Input() percentage = 10;
  @Input() message= 'Not Available Service';

  constructor() { }

  ngOnInit(): void {
    this.onTimerChange(this.percentage);
    this.onVisibleChange(this.visible);
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 100;
  }

}
