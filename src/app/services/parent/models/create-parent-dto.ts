export class CreateParentDto {
  public id: number;
  public name: string;
  public firstLastName: string;
  public secondLastName?: string;
  public address: string;
  public phoneNumber: string;
  public placeBorn?: string;
  public bloodTypeId: number;
  public documentNumber: string;
  public documentTypeId: number;
  public sexTypeId: number;
  public maritalStatusId: number;
}
