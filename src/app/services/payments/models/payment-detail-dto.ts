export class PaymentDetailDto {
  id: number;
  isDeleted: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}