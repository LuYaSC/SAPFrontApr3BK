export class DashboardResult {
  quantityRegisteredPayments: number;
  totalRegisteredPayments: number;
  quantityPayedPayments: number;
  totalPayedPayments: number;
  quantityPartiallyPayedPayments: number;
  totalPartiallyPayedPayments: number;
  quantityUnpayPayments: number;
  totalUnpayPayments: number;
  quantityCashPayments: number;
  totalCashPayments: number;
  quantityQrPayments: number;
  totalQrPayments: number;
  quantityTransferPayments: number;
  totalTransferPayments: number;
  quantityTotalChildren: number;
  quantityTotalParents: number;
  quantityTotalCollaborators: number;
  quantityTotalPayments: number;
  quantityTotalInscriptions: number;
  collaborators: CollaboratorData[];

  constructor() {
    this.collaborators = [];
  }
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
