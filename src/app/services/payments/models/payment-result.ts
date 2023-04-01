import { PaymentDetailResult } from 'src/app/services/payments/models/payment-detail-result';
export class PaymentResult {
  id: number;
  parent: string;
  kid: string;
  collaborator: string;
  room: string;
  turn: string;
  modality: string;
  branchOffice: string;
  paymentType: string;
  paymentOperation: string;
  auditPayment: string;
  amount: number;
  description: string;
  numberBill: string;
  observations: string;
  userCreation: string;
  userModification: string;
  dateCreation: Date;
  dateModification: Date;
  showDetails: boolean = false;
  paymentDetails: PaymentDetailResult;
  isDeleted: boolean;
  isVerified: boolean;
  auditPaymentId: number;
  paymentOperationId: number;
  paymentTypeId: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
