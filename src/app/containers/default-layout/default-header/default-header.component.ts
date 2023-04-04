import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  userName: string = '';

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private storageService: StorageService, private router: Router) {
    super();
    this.userName = storageService.getUser()?.split('@')[0];
  }

  public logout() {
    this.storageService.logout();
    this.router.navigate(["/login"]);
  }
}
