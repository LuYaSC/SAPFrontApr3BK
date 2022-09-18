import { Component } from '@angular/core';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = navItems;
  visible = false;
  message = '';

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}
}
