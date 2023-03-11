import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BloodTypeComponent } from './blood-type/blood-type.component';
import { BranchOfficeComponent } from './branch-office/branch-office.component';

import { CityComponent } from './city/city.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { ModalityComponent } from './modality/modality.component';
import { PaymentOperationComponent } from './payment-operation/payment-operation.component';
import { PaymentTypeComponent } from './payment-type/payment-type.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { RoomComponent } from './room/room.component';
import { SexTypeComponent } from './sex-type/sex-type.component';
import { TurnComponent } from './turn/turn.component';
import { MaritalStatusComponent } from './marital-status/marital-status.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administracion'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'branch-office'
      },
      {
        path: 'branch-office',
        component: BranchOfficeComponent,
        data: {
          title: 'Sucursales'
        }
      },
      {
        path: 'city',
        component: CityComponent,
        data: {
          title: 'Ciudades'
        }
      },
      {
        path: 'document-type',
        component: DocumentTypeComponent,
        data: {
          title: 'Documentos'
        }
      },
      {
        path: 'modality',
        component: ModalityComponent,
        data: {
          title: 'Modalidad'
        }
      },
      {
        path: 'payment-operation',
        component: PaymentOperationComponent,
        data: {
          title: 'Operacion de Pagos'
        }
      },
      {
        path: 'payment-type',
        component: PaymentTypeComponent,
        data: {
          title: 'Tipo de Pagos'
        }
      },
      {
        path: 'relationship',
        component: RelationshipComponent,
        data: {
          title: 'Relacion'
        }
      },
      {
        path: 'turn',
        component: TurnComponent,
        data: {
          title: 'Turnos'
        }
      },
      {
        path: 'room',
        component: RoomComponent,
        data: {
          title: 'Salas'
        }
      },
      {
        path: 'sex-type',
        component: SexTypeComponent,
        data: {
          title: 'Sexo'
        }
      },
      {
        path: 'blood-type',
        component: BloodTypeComponent,
        data: {
          title: 'Sangre'
        }
      },
      {
        path: 'marital-status',
        component: MaritalStatusComponent,
        data: {
          title: 'Estado Civil'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {
}
