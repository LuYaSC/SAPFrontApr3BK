export class CreateCollaboratorDto {
  id: number;
  name: string;
  firstLastName: string;
  secondLastName?: string;
  bornDate: Date;
  startDate: Date;
  endDate?: Date;
  documentTypeId: number;
  documentNumber: string;
  sexTypeId: number;
  bloodTypeId: number;
  branchOfficeId: number;
  cityId: number;
  email: string;
  roles: number[] = [];
  address: string;
  phoneNumber: string;
}
