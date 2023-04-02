export class DashboardResult {
  quantityRegisteredPayments: number;
  totalRegisteredPayments: number;
  quantityPayedPayments: number;
  totalPayedPayments: number;
  quantityPartiallyPayedPayments: number;
  totalPartiallyPayedPayments: number;
  quantityUnpayPayments: number;
  totalUnpayPayments: number;
  quantityTotalChildren: number;
  quantityTotalParents: number;
  quantityTotalCollaborators: number;
  quantityTotalPayments: number;
  quantityTotalInscriptions: number;
  collaborators: CollaboratorData[] = [];
}

export class CollaboratorData {
  collaborator: string;
  collaboratorAge: string;
  collaboratorStartDate: Date;
  quantityChildrenAssigned: number;
  collaboratorCity: string;
  collaboratorBranchOffice: string;
  isDeleted: boolean;
}
