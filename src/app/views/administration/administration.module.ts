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

import { AdministrationRoutingModule } from './administration-routing.module';
import { CityComponent } from './city/city.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { ModalityComponent } from './modality/modality.component';
import { PaymentOperationComponent } from './payment-operation/payment-operation.component';
import { PaymentTypeComponent } from './payment-type/payment-type.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { TurnComponent } from './turn/turn.component';
import { BranchOfficeComponent } from './branch-office/branch-office.component';
import { RoomComponent } from './room/room.component';
import { SharedComModule } from './../shared-com/shared-com.module';
import { SexTypeComponent } from './sex-type/sex-type.component';
import { BloodTypeComponent } from './blood-type/blood-type.component';


@NgModule({
  declarations: [
    BranchOfficeComponent,
    CityComponent,
    DocumentTypeComponent,
    ModalityComponent,
    PaymentOperationComponent,
    PaymentTypeComponent,
    RelationshipComponent,
    TurnComponent,
    RoomComponent,
    SexTypeComponent,
    BloodTypeComponent

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
    ListGroupModule,
    SharedComModule
  ]
})
export class AdministrationModule {
}
