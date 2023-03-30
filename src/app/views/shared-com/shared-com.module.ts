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
import { PaginationComponent } from './pagination/pagination.component';
import { IconModule } from '@coreui/icons-angular';
import { DirectivesModule } from '../../helpers/directives/directives.module';
import { SelectorGenericComponent } from './selector-generic/selector-generic.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SelectorCompleteRoomComponent } from './selector-complete-room/selector-complete-room.component';


@NgModule({
  declarations: [
    GlobalAlertsComponent,
    ValidationsComponent,
    TypeBusinessComponent,
    SelectParametersComponent,
    SelectRolesComponent,
    SelectMultipleRolesComponent,
    PaginationComponent,
    SelectorGenericComponent,
    SelectorCompleteRoomComponent

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
    AlertModule,
    IconModule,
    DirectivesModule,
    Ng2SearchPipeModule
  ],
  exports:
    [
      GlobalAlertsComponent,
      ValidationsComponent,
      TypeBusinessComponent,
      SelectParametersComponent,
      SelectRolesComponent,
      SelectMultipleRolesComponent,
      PaginationComponent,
      SelectorGenericComponent,
      SelectorCompleteRoomComponent
    ]
})
export class SharedComModule {
}
