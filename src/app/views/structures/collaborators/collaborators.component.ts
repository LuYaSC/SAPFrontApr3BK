import { Component, Input, OnInit } from '@angular/core';
import { CollaboratorService } from './../../../services/collaborator/collaborator.service';
import { GeneralComponent } from '../general-component';
import { TypeBusinessService } from 'src/app/services/type-business/type-business.service';
import { FormBuilder } from '@angular/forms';
import { CreateCollaboratorDto } from './../../../services/collaborator/models/create-collaborator-dto';
import { COLLABORATOR_FORM_VALIDATORS } from '../form-validators.const';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';
import { SpinnerService } from 'src/app/helpers/spinner.service';
import { CollaboratorsResult } from 'src/app/services/collaborator/models/collaborators-result';
import { RolesService } from 'src/app/services/roles/roles.service';
import { RolesResult } from 'src/app/services/roles/models/roles-result';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent extends GeneralComponent implements OnInit {
  @Input() typeName: string = '';
  @Input() nameService: string = '';
  public liveDemoVisible = false;
  listRoles: RolesResult[];
  isVisibleRoles = false;
  selectedRole: RolesResult;

  saveCollaborator: CreateCollaboratorDto = new CreateCollaboratorDto();

  constructor(private service: CollaboratorService, parameterService: TypeBusinessService, private rolesService: RolesService, private formBuilder: FormBuilder,
    private spinnerService: SpinnerService) {
    super(parameterService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      COLLABORATOR_FORM_VALIDATORS
    );
    this.form.value as CreateCollaboratorDto;
    this.service.AssingService('Collaborator');
    this.getListCollaborators();
    this.getParameters({sexType: true, bloodType: true, documentType: true, branchOffice: true, city: true});
    this.rolesService.getAll().subscribe({
      next: (resp: RolesResult[]) => {
        this.listRoles = resp;
        this.isVisibleRoles = true;
      },
      error: (error: any) => {
        this.message = error;
        this.visible = true;
      },
      complete: () => {
        this.spinnerService.hide();
      }
    });
  }

  onSelectedSex(event: GetTypeResult) {
    this.saveCollaborator.sexTypeId = event?.id;
  }

  onSelectedBlood(event: GetTypeResult) {
    this.saveCollaborator.bloodTypeId = event?.id;
  }

  onSelectedDocumentType(event: GetTypeResult) {
    this.saveCollaborator.documentTypeId = event?.id;
  }

  onSelectedBranchOfficeStatus(event: GetTypeResult) {
    this.saveCollaborator.branchOfficeId = event?.id;
  }

  onSelectedCityStatus(event: GetTypeResult) {
    this.saveCollaborator.cityId = event?.id;
  }

  onSelectedRoles(event: RolesResult) {
    this.saveCollaborator.roles = [];
    this.saveCollaborator.roles.push(event?.id);
  }

  onSelectedRoles2(event: RolesResult[]) {
    event.forEach(x => this.saveCollaborator.roles.push(x.id));
  }

  getListCollaborators() {
    this.isVisible = false;
    this.form.reset();
    this.service.getAll().subscribe({
      next: (resp: CollaboratorsResult[]) => {
        this.listTypes = resp;
        this.isVisible = true;
      },
      error: (error: any) => {
        this.message = error;
        this.visible = true;
      },
      complete: () => {
        this.spinnerService.hide();
      }
    });
  }


  editRow(row: CollaboratorsResult) {
    this.actionRow = 1;
    this.selectedSex = this.listSexs.find((x) => x.description === row.sex);
    this.selectedBlood = this.listBloods.find((x) => x.description === row.bloodType);
    this.selectedDocumentType = this.listDocumentTypes.find((x) => x.description === row.documentType);
    this.selectedDocumentType = this.listDocumentTypes.find((x) => x.description === row.documentType);
    this.saveCollaborator.id = row.id;
    this.form.setValue({
      id: row.id,
      name: row.name,
      address: row.address,
      phoneNumber: row.phoneNumber,
      firstLastName: row.firstLastName,
      secondLastName: row.secondLastName,
      documentNumber: row.documentNumber,
      bornDate: new Date(row.bornDate),
      startDate: new Date(row.startDate),
      endDate: row.endDate === null ? row.endDate : new Date(row.endDate),
      email: row.email
    });
    this.liveDemoVisible = !this.liveDemoVisible;
    this.changeTab(1);
  }

  toggleLiveDemo() {
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  handleLiveDemoChange(event: boolean) {
    this.liveDemoVisible = event;
  }

  createOrUpdate() {
    this.submitted = true;
    this.visible = false;
    if (this.form.invalid) {
      return;
    }
    this.isVisible = false;
    this.saveCollaborator.name = this.form.get("name").value;
    this.saveCollaborator.firstLastName = this.form.get("firstLastName").value;
    this.saveCollaborator.secondLastName = this.form.get("secondLastName").value;
    this.saveCollaborator.address = this.form.get("address").value;
    this.saveCollaborator.documentNumber = this.form.get("documentNumber").value;
    this.saveCollaborator.phoneNumber = this.form.get("phoneNumber").value;
    this.saveCollaborator.email = this.form.get("email").value;
    this.saveCollaborator.bornDate = this.form.get("bornDate").value;
    this.saveCollaborator.startDate = this.form.get("startDate").value;
    let endDate = this.form.get("endDate")?.value;
    this.saveCollaborator.endDate = (endDate === null || endDate === undefined || endDate === '') ? null : endDate;
    if (this.actionRow === 0) {
      this.service.create(this.saveCollaborator).subscribe({
        next: (resp: string) => {
          this.cleanForm();
          this.getListCollaborators();
          this.notification(resp);
        },
        error: (error: string) => {
          this.notification(error);
        }
      });
    }
    else {
      this.service.update(this.saveCollaborator).subscribe({
        next: (resp: string) => {
          this.cleanForm();
          this.getListCollaborators();
          this.notification(resp);
        },
        error: (error: string) => {
          this.notification(error);
        }
      });
    }
  }

  enableOrDisable(row: CollaboratorsResult) {
    /*this.service.activateOrDeactivate(new any({ id: row.id, isDeleted: !row.isDeleted })).subscribe({
      next: (resp: string) => {
        this.cleanForm();
        this.notification(resp);
      },
      error: (error: string) => {
        this.notification(error);
      }
    });*/
  }
}
