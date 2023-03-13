export class CollaboratorsResult {
  id: number;
  name: string;
  firstLastName: string;
  secondLastName?: string;
  bornDate: Date;
  startDate: Date;
  endDate?: Date;
  documentNumber: string;
  documentType: string;
  sex: string;
  userCreation: string;
  userModification: string;
  userAssigned: string;
  branchOfficeAssigned: string;
  cityAssigned: string;
  roles: string[];
  dateCreation: Date;
  dateModification: Date;
  address: string;
  phoneNumber: string;
  bloodType: string;
  isDeleted: boolean
  email: string;
}
