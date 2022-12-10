export class CreateKidDto {
  id: number;
  name: string;
  firstLastName: string;
  secondLastName: string | null;
  sexTypeId: number;
  bornDate: Date | null;
  startDate: Date;
  endDate: string | null;
  placeBorn: string;
  bloodTypeId: number;
  documentNumber: string;
  documentTypeId: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
