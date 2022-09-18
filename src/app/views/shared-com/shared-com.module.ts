import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  ProgressModule,
  SharedModule,
  ToastModule
} from '@coreui/angular';
import { GlobalAlertsComponent } from './global-alerts/global-alerts.component';
import { ValidationsComponent } from './validations/validations.component';
import { TypeBusinessComponent } from './type-business/type-business.component';


@NgModule({
  declarations: [
    GlobalAlertsComponent,
    ValidationsComponent,
    TypeBusinessComponent

  ],
  imports: [
    CommonModule,
    CardModule,
    FormModule,
    GridModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule,
    ToastModule,
    ProgressModule
  ],
  exports: [GlobalAlertsComponent,
    ValidationsComponent,
    TypeBusinessComponent]
})
export class SharedComModule {
}
