export class KidByIdDto {
  id: number;
  isDeleted: boolean;
  kidId:number = 0;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
