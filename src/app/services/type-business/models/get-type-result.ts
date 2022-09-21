export class GetTypeResult {

  id: number;
  description: string;
  dateCreation: string;
  dateModification: string;
  userCreation: string;
  userModification: string;
  isDeleted: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
