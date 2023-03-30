import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsComponent } from './parents/parents.component';
import { KidsComponent } from './kids/kids.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import {StructuresRoutingModule} from './structures-routing.module';
import {
  BadgeModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  ProgressModule,
  SharedModule,
  TableModule,
  TabsModule,
  NavModule,
  AccordionModule,
  BreadcrumbModule,
  CollapseModule,
  UtilitiesModule,
  PlaceholderModule,
  SpinnerModule,
  TooltipModule,
  CarouselModule,
  PaginationModule,
  PopoverModule,
  ModalModule,
  AlertModule
} from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComModule } from '../shared-com/shared-com.module';
import { IconModule } from '@coreui/icons-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TutorAssignationComponent } from './tutor-assignation/tutor-assignation.component';
import { RoomAssignationComponent } from './room-assignation/room-assignation.component';
import { EnrolledChildrenComponent } from './enrolled-children/enrolled-children.component';
import { PaymentsComponent } from './payments/payments.component';

@NgModule({
  declarations: [
    ParentsComponent,
    KidsComponent,
    CollaboratorsComponent,
    TutorAssignationComponent,
    RoomAssignationComponent,
    EnrolledChildrenComponent,
    PaymentsComponent
  ],
  imports: [
    StructuresRoutingModule,
    CommonModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    SharedComModule,
    FormsModule,
    ModalModule,
    AlertModule,
    BsDatepickerModule,
    IconModule
  ],
})
export class StructuresModule { }
