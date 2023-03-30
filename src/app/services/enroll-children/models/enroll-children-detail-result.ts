export class EnrollChildrenDetailResult {
  kidName: string;
  bornDateKid: Date;
  ageKid: string;
  bloodTypeKid: string;
  sexKid: string;
  quantityTutors: number;
  parents: Parent[];
  room: string;
  city: string;
  branchOffice: string;
  turn: string;
  modality: string;
  schedule: string;
  observations: string;
  collaborator: string;
  startDateKid: Date;
}

export interface Parent {
  parentName: string;
  relation: string;
  phoneNumber: string;
  bloodTypeParent: string;
  sexParent: string;
  address: string;
  isAuthorized: boolean;
  maritalStatus: string;
}
