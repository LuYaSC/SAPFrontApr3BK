import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsComponent } from './kids/kids.component';
import { ParentsComponent } from './parents/parents.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component'

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructuresRoutingModule {
}
