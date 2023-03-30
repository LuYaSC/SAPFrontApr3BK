import { EnrollChildrenDetailResult } from "./enroll-children-detail-result";

export class EnrolledChildrenResult {
  id: number;
  parent: string;
  kid: string;
  isAuthorized: boolean;
  collaborator: string;
  room: string;
  turn: string;
  modality: string;
  branchOffice: string;
  observations: string;
  userCreation: string;
  userModification: string;
  dateCreation: Date;
  dateModification: Date;
  isDeleted: boolean;
  showDetails: boolean = false;
  detailEnrollChildren: EnrollChildrenDetailResult = new EnrollChildrenDetailResult();
}
