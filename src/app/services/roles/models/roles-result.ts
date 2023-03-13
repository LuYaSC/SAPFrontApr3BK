import { RolesDto } from "./roles-dto";

export class RolesResult extends RolesDto {
  dateCreation: Date;
  dateModification: Date;

  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }
}
