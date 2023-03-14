import { Component, Input, OnInit } from '@angular/core';
import { ParentService } from './../../../services/parent/parent.service';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';
import { KidByIdDto } from 'src/app/services/kid/models/kid-by-id-dto';
import { CreateParentDto } from 'src/app/services/parent/models/create-parent-dto';
import { TypeBusinessService } from 'src/app/services/type-business/type-business.service';
import { ParentsResult } from 'src/app/services/parent/models/parents-result';
import { SpinnerService } from 'src/app/helpers/spinner.service';
import { GeneralComponent } from './../general-component';
import { PARENT_FORM_VALIDATORS } from './../form-validators.const';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent extends GeneralComponent implements OnInit {
  @Input() typeName: string = '';
  @Input() nameService: string = '';
  public liveDemoVisible = false;
  saveParent: CreateParentDto = new CreateParentDto();

  constructor(private service: ParentService, parameterService: TypeBusinessService, private formBuilder: FormBuilder,
    private spinnerService: SpinnerService) {
    super(parameterService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      PARENT_FORM_VALIDATORS
    );
    this.form.value as CreateParentDto;
    this.service.AssingService('Parent');
    this.getListParents();
    this.getParameters();
  }

  onSelectedSex(event: GetTypeResult) {
    this.saveParent.sexTypeId = event?.id;
  }

  onSelectedBlood(event: GetTypeResult) {
    this.saveParent.bloodTypeId = event?.id;
  }

  onSelectedDocumentType(event: GetTypeResult) {
    this.saveParent.documentTypeId = event?.id;
  }

  onSelectedMaritalStatus(event: GetTypeResult) {
    this.saveParent.maritalStatusId = event?.id;
  }

  getListParents() {
    this.isVisible = false;
    this.form.reset();
    this.service.getAll().subscribe({
      next: (resp: ParentsResult[]) => {
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

  editRow(row: ParentsResult) {
    this.actionRow = 1;
    this.selectedSex = this.listSexs.find((x) => x.description === row.sex);
    this.selectedBlood = this.listBloods.find((x) => x.description === row.bloodType);
    this.selectedDocumentType = this.listDocumentTypes.find((x) => x.description === row.documentType);
    this.selectedMaritalStatus = this.listMaritalStatus.find((x) => x.description === row.maritalStatus);
    this.saveParent.id = row.id;
    this.form.setValue({
      id: row.id,
      name: row.name,
      address: row.address,
      phoneNumber: row.phoneNumber,
      firstLastName: row.firstLastName,
      secondLastName: row.secondLastName,
      placeBorn: row.placeBorn,
      documentNumber: row.documentNumber
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
    this.saveParent.name = this.form.get("name").value;
    this.saveParent.firstLastName = this.form.get("firstLastName").value;
    this.saveParent.secondLastName = this.form.get("secondLastName").value;
    this.saveParent.address = this.form.get("address").value;
    this.saveParent.placeBorn = this.form.get("placeBorn").value;
    this.saveParent.documentNumber = this.form.get("documentNumber").value;
    this.saveParent.phoneNumber = this.form.get("phoneNumber").value;
    if (this.actionRow === 0) {
      this.service.create(this.saveParent).subscribe({
        next: (resp: string) => {
          this.cleanForm();
          this.getListParents();
          this.notification(resp);
        },
        error: (error: string) => {
          this.notification(error);
        }
      });
    }
    else {
      this.service.update(this.saveParent).subscribe({
        next: (resp: string) => {
          this.cleanForm();
          this.getListParents();
          this.notification(resp);
        },
        error: (error: string) => {
          this.notification(error);
        }
      });
    }
  }

  enableOrDisable(row: ParentsResult) {
    this.service.activateOrDeactivate(new KidByIdDto({ id: row.id, isDeleted: !row.isDeleted })).subscribe({
      next: (resp: string) => {
        this.cleanForm();
        this.notification(resp);
      },
      error: (error: string) => {
        this.notification(error);
      }
    });
  }
}
