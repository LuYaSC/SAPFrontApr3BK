export class PaymentFilterDto {
  kidId: number;
  roomId: number;
  branchOfficeId: number;
  idDeleted: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
