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
  SharedModule
} from '@coreui/angular';

// import { DocsComponentsModule } from '@docs-components/docs-components.module';

import { AdministrationRoutingModule } from './administration-routing.module';
/*import { RangesComponent } from './ranges/ranges.component';
import { FloatingLabelsComponent } from './floating-labels/floating-labels.component';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { SelectComponent } from './select/select.component';
import { ChecksRadiosComponent } from './checks-radios/checks-radios.component';
import { InputGroupsComponent } from './input-groups/input-groups.component';
import { LayoutComponent } from './layout/layout.component';
import { ValidationComponent } from './validation/validation.component';*/
import { CityComponent } from './city/city.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { ModalityComponent } from './modality/modality.component';
import { PaymentOperationComponent } from './payment-operation/payment-operation.component';
import { PaymentTypeComponent } from './payment-type/payment-type.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { TurnComponent } from './turn/turn.component';
import { BranchOfficeComponent } from './branch-office/branch-office.component';
import { RoomComponent } from './room/room.component';


@NgModule({
  declarations: [
    /*RangesComponent,
    FloatingLabelsComponent,
    FormControlsComponent,
    SelectComponent,
    ChecksRadiosComponent,
    InputGroupsComponent,
    LayoutComponent,
    ValidationComponent,*/
    BranchOfficeComponent,
    CityComponent,
    DocumentTypeComponent,
    ModalityComponent,
    PaymentOperationComponent,
    PaymentTypeComponent,
    RelationshipComponent,
    TurnComponent,
    RoomComponent

  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
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
    ListGroupModule
  ]
})
export class AdministrationModule {
}
