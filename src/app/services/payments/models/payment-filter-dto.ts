export class PaymentFilterDto {
  kidId: number;
  roomId: number;
  branchOfficeId: number;
  idDeleted: boolean;
  paymentOperationId: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
