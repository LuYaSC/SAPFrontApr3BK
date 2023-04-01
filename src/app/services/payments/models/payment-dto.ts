export class PaymentDto {
  id: number;
  enrolledChildrenId: number;
  paymentTypeId: number;
  paymentOperationId: number;
  auditPaymentId: number;
  amount: number;
  description: string;
  numberBill: string;
  observations: string;
  isVerified: boolean;
}
