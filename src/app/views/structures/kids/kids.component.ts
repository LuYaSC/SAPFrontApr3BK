import { Component, Input, OnInit } from '@angular/core';
import { KidService } from 'src/app/services/kid/kid.service';
import { KidsResult } from 'src/app/services/kid/models/kids-result';
import { KidByIdDto } from 'src/app/services/kid/models/kid-by-id-dto';
import { TypeBusinessService } from 'src/app/services/type-business/type-business.service';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';
import { CreateKidDto } from 'src/app/services/kid/models/create-kid-dto';
import { SpinnerService } from 'src/app/helpers/spinner.service';
import { KID_FORM_VALIDATORS } from '../form-validators.const';
import { GeneralComponent } from '../general-component';
import { FormBuilder } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { ReportResult } from 'src/app/services/utils/models/report-result';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.scss']
})
export class KidsComponent extends GeneralComponent implements OnInit {
  @Input() typeName: string = '';
  @Input() nameService: string = '';
  public liveDemoVisible = false;
  saveKid: CreateKidDto = new CreateKidDto();


  constructor(private service: KidService, parameterService: TypeBusinessService, private formBuilder: FormBuilder,
    private spinnerService: SpinnerService, storageService: StorageService) {
    super(parameterService, storageService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      KID_FORM_VALIDATORS
    );
    this.form.value as CreateKidDto;
    this.service.AssingService('Kid');
    this.getListKids();
    this.getParameters({bloodType: true, documentType: true, sexType: true});
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
        this.getListKids();
        this.notification(resp);
      },
      error: (error: string) => {
        this.notification(error);
      }
    });
  }

  downloadPdf() {
    this.service.generatePdf().subscribe({
      next: (resp: ReportResult) => {
        const blob = this.b64toBlob(resp.report, 'application/pdf');
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = resp.reportName + '.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
        this.notification('Reprte Generado Correctamente');
      },
      error: (error: string) => {
        this.notification(error);
      }
    });
  }
}
