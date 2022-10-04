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

@NgModule({
  declarations: [
    ParentsComponent,
    KidsComponent,
    CollaboratorsComponent
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
    AlertModule
  ],
})
export class StructuresModule { }
