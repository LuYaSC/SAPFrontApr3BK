export class DeleteDto {
  id: number;
  isDeleted: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
