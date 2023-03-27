import { Component, Input, OnInit } from '@angular/core';
import { GeneralComponent } from '../general-component';
import { CreateKidDto } from 'src/app/services/kid/models/create-kid-dto';
import { TypeBusinessService } from 'src/app/services/type-business/type-business.service';
import { KidService } from 'src/app/services/kid/kid.service';
import { SpinnerService } from 'src/app/helpers/spinner.service';
import { FormBuilder } from '@angular/forms';
import { KID_FORM_VALIDATORS } from '../form-validators.const';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';
import { KidsResult } from 'src/app/services/kid/models/kids-result';
import { KidByIdDto } from 'src/app/services/kid/models/kid-by-id-dto';

@Component({
  selector: 'app-room-assignation',
  templateUrl: './room-assignation.component.html',
  styleUrls: ['./room-assignation.component.scss']
})
export class RoomAssignationComponent  extends GeneralComponent implements OnInit {
  @Input() typeName: string = '';
  @Input() nameService: string = '';
  public liveDemoVisible = false;
  saveKid: CreateKidDto = new CreateKidDto();


  constructor(private service: KidService, parameterService: TypeBusinessService, private formBuilder: FormBuilder,
    private spinnerService: SpinnerService) {
    super(parameterService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      KID_FORM_VALIDATORS
    );
    this.form.value as CreateKidDto;
    this.service.AssingService('Kid');
    this.getListKids();
    this.getParameters(true, true, true, false, false);
  }

  onSelectedSex(event: GetTypeResult) {
    this.saveKid.sexTypeId = event.id;
  }

  onSelectedBlood(event: GetTypeResult) {
    this.saveKid.bloodTypeId = event.id;
  }

  onSelectedDocumentType(event: GetTypeResult) {
    this.saveKid.documentTypeId = event.id;
  }

  getListKids() {
    this.isVisible = false;
    this.form.reset();
    this.service.getAll().subscribe({
      next: (resp: KidsResult[]) => {
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

  editRow(row: KidsResult) {
    this.actionRow = 1;
    this.selectedSex = this.listSexs.find((x) => x.description === row.sex);
    this.selectedBlood = this.listBloods.find((x) => x.description === row.bloodType);
    this.selectedDocumentType = this.listDocumentTypes.find((x) => x.description === row.documentType);
    this.saveKid.id = row.id;
    this.form.setValue({
      id: row.id,
      name: row.name,
      firstLastName: row.firstLastName,
      secondLastName: row.secondLastName,
      bornDate: new Date(row.bornDate),
      startDate: new Date(row.startDate),
      placeBorn: row.placeBorn,
      documentNumber: row.documentNumber,
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
    this.saveKid.name = this.form.get("name").value;
    this.saveKid.firstLastName = this.form.get("firstLastName").value;
    this.saveKid.secondLastName = this.form.get("secondLastName").value;
    this.saveKid.bornDate = this.form.get("bornDate").value;
    this.saveKid.startDate = this.form.get("startDate").value;
    this.saveKid.placeBorn = this.form.get("placeBorn").value;
    this.saveKid.documentNumber = this.form.get("documentNumber").value;
    if (this.actionRow === 0) {
      this.service.create(this.saveKid).subscribe({
        next: (resp: string) => {
          this.cleanForm();
          this.getListKids();
          this.notification(resp);
        },
        error: (error: string) => {
          this.notification(error);
        }
      });
    }
    else {
      this.service.update(this.saveKid).subscribe({
        next: (resp: string) => {
          this.cleanForm();
          this.getListKids();
          this.notification(resp);
        },
        error: (error: string) => {
          this.notification(error);
        }
      });
    }
  }

  enableOrDisable(row: KidsResult) {
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
