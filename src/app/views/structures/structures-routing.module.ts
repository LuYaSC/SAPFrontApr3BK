import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsComponent } from './kids/kids.component';
import { ParentsComponent } from './parents/parents.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component'
import { TutorAssignationComponent } from './tutor-assignation/tutor-assignation.component';
import { RoomAssignationComponent } from './room-assignation/room-assignation.component';
import { EnrolledChildrenComponent } from './enrolled-children/enrolled-children.component';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  {
    path: 'kids',
    component: KidsComponent,
    data: {
      title: 'Kids'
    }
  },
  {
    path: 'collaborators',
    component: CollaboratorsComponent,
    data: {
      title: 'Collaborators'
    }
  },
  {
    path: 'parents',
    component: ParentsComponent,
    data: {
      title: 'Parents'
    }
  },
  {
    path: 'tutor-assignation',
    component: TutorAssignationComponent,
    data: {
      title: 'Asignacion de tutores'
    }
  },
  {
    path: 'room-assignation',
    component: RoomAssignationComponent,
    data: {
      title: 'Asignacion de Salas'
    }
  },
  {
    path: 'enroll-children',
    component: EnrolledChildrenComponent,
    data: {
      title: 'Inscripcion'
    }
  },
  {
    path: 'payments',
    component: PaymentsComponent,
    data: {
      title: 'Pagos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructuresRoutingModule {
}
