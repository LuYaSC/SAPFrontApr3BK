import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsComponent } from './parents/parents.component';
import { KidsComponent } from './kids/kids.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import {StructuresRoutingModule} from './structures-routing.module';

@NgModule({
  declarations: [
    ParentsComponent,
    KidsComponent,
    CollaboratorsComponent
  ],
  imports: [
    CommonModule,
    StructuresRoutingModule
  ],
})
export class StructuresModule { }
