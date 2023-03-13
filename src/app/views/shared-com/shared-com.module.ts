import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  AlertModule,
  BadgeModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  ModalModule,
  ProgressModule,
  SharedModule,
  TableModule,
  ToastModule
} from '@coreui/angular';
import { GlobalAlertsComponent } from './global-alerts/global-alerts.component';
import { ValidationsComponent } from './validations/validations.component';
import { TypeBusinessComponent } from './type-business/type-business.component';
import { SelectParametersComponent } from './select-parameters/select-parameters.component';
import { SelectRolesComponent } from './select-roles/select-roles.component';
import { SelectMultipleRolesComponent } from './select-multiple-roles/select-multiple-roles.component';


@NgModule({
  declarations: [
    GlobalAlertsComponent,
    ValidationsComponent,
    TypeBusinessComponent,
    SelectParametersComponent,
    SelectRolesComponent,
    SelectMultipleRolesComponent

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
    ProgressModule,
    TableModule,
    BadgeModule,
    ModalModule,
    AlertModule
  ],
  exports:
  [
    GlobalAlertsComponent,
    ValidationsComponent,
    TypeBusinessComponent,
    SelectParametersComponent,
    SelectRolesComponent,
    SelectMultipleRolesComponent
  ]
})
export class SharedComModule {
}
