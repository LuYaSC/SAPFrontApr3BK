export class AssignationRoomDetailDto {
  id: number;
  isDeleted: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}