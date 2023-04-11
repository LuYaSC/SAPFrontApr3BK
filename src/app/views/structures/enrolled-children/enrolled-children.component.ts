import { Component, Input, OnInit } from '@angular/core';
import { GeneralComponent } from '../general-component';
import { KidsResult } from 'src/app/services/kid/models/kids-result';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { KidService } from 'src/app/services/kid/kid.service';
import { TypeBusinessService } from 'src/app/services/type-business/type-business.service';
import { SpinnerService } from 'src/app/helpers/spinner.service';
import { ENROLL_CHILDREN } from '../form-validators.const';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';
import { EnrollChildrenService } from 'src/app/services/enroll-children/enroll-children.service';
import { EnrolledChildrenDto } from 'src/app/services/enroll-children/models/enrolled-children-dto';
import { EnrolledChildrenResult } from 'src/app/services/enroll-children/models/enrolled-children-result';
import { EnrollChildrenDetailResult } from 'src/app/services/enroll-children/models/enroll-children-detail-result';
import { EnrollFilterDto } from 'src/app/services/enroll-children/models/enroll-filter-dto';
import { RoomAssignationService } from 'src/app/services/room-assignation/room-assignation.service';
import { AssignationRoomResult } from 'src/app/services/room-assignation/models/assignation-room-result';
import { KidByIdDto } from 'src/app/services/kid/models/kid-by-id-dto';
import { GetDetailKidResult } from 'src/app/services/kid/models/get-detail-kid-result';
import { AssignationRoomDetailDto } from 'src/app/services/room-assignation/models/assignation-room-detail-dto';
import { AssignationRoomDetailResult } from 'src/app/services/room-assignation/models/assignation-room-detail-result';
import { StorageService } from 'src/app/services/storage.service';
import { ReportResult } from 'src/app/services/utils/models/report-result';

@Component({
  selector: 'app-enrolled-children',
  templateUrl: './enrolled-children.component.html',
  styleUrls: ['./enrolled-children.component.scss']
})
export class EnrolledChildrenComponent extends GeneralComponent implements OnInit {
  @Input() typeName: string = '';
  @Input() nameService: string = '';
  public liveDemoVisible = false;
  saveDto: EnrolledChildrenDto = new EnrolledChildrenDto();
  filterDto: EnrollFilterDto = new EnrollFilterDto();
  kidsList: KidsResult[] = [];
  kidSelected: KidsResult;
  isVisibleKid = false;
  roomAssList: AssignationRoomResult[] = [];
  roomAssSelected: AssignationRoomResult;
  isVisibleRoomAss = false;
  generatePayments = "true";
  showDetailsValue: boolean = false;
  detailKid: GetDetailKidResult[] = [];
  isVisiableDetailKid: boolean = false;
  detailRoom: AssignationRoomDetailResult = new AssignationRoomDetailResult();
  isVisiableDetailRoom: boolean = false;
  formSearch: FormGroup = new FormGroup({
    kid: new FormControl(''),
    parent: new FormControl(''),
    relation: new FormControl(''),
  });
  detailEnrollChildren: EnrollChildrenDetailResult = new EnrollChildrenDetailResult();

  constructor(private kidService: KidService, private roomAssignedService: RoomAssignationService, parameterService: TypeBusinessService,
    private enrollService: EnrollChildrenService, private formBuilder: FormBuilder, private spinnerService: SpinnerService, storageService: StorageService) {
    super(parameterService, storageService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      ENROLL_CHILDREN
    );
    this.form.value as EnrolledChildrenDto;
    this.getListTutors();
    this.kidService.AssingService('Kid');
    this.roomAssignedService.AssingService('AssignationRoom');
    this.getParametersTutors();

  }

  getParametersTutors() {
    this.getListKids();
    this.getListParents();
    this.getParameters({ room: true })
    this.generatePayments = "true";
    this.actionRow = 0;
    this.kidSelected = null;
    this.roomAssList = null;
    this.filterDto.kidId = 0;
    this.filterDto.roomId = 0;
  }


  filterSearch(clean: boolean) {
    this.onPageChange(1);
    if (clean) {
      this.getParametersTutors();
      this.getListTutors();
    }
    else {
      this.getListTutorsFilter();
    }
  }

  onSelectedRoomFilter(event: GetTypeResult) {
    this.filterDto.roomId = event?.id;
  }

  onSelectedKid(event: any) {
    this.saveDto.kidId = event?.id;
    if (this.tabindex === 1) {
      this.isVisiableDetailKid = false;
      this.kidService.getDetail(new KidByIdDto({ KidId: event?.id })).subscribe({
        next: (resp: GetDetailKidResult[]) => {
          this.detailKid = resp;
          this.isVisiableDetailKid = true;
        },
        error: (error: any) => {
          this.message = error;
        },
        complete: () => {
          this.spinnerService.hide();
        }
      });
    }
  }

  onSelectedRoomAss(event: any) {
    this.saveDto.assignedRoomId = event?.id;
    if (this.tabindex === 1) {
      this.isVisiableDetailRoom = false;
      this.roomAssignedService.getDetail(new AssignationRoomDetailDto({ id: event?.id })).subscribe({
        next: (resp: AssignationRoomDetailResult) => {
          this.detailRoom = resp;
          this.isVisiableDetailRoom = true;
        },
        error: (error: any) => {
          this.message = error;
        },
        complete: () => {
          this.spinnerService.hide();
        }
      });
    }
  }

  onSelectedKidFilter(event: any) {
    this.filterDto.kidId = event?.id;
  }

  getListTutors() {
    this.isVisible = false;
    this.form.reset();
    this.enrollService.getAll().subscribe({
      next: (resp: EnrolledChildrenResult[]) => {
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

  getListTutorsFilter() {
    this.isVisible = false;
    this.form.reset();
    this.enrollService.getFilter(this.filterDto).subscribe({
      next: (resp: EnrolledChildrenResult[]) => {
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

  getListKids() {
    this.isVisibleKid = false;
    this.kidService.getAll().subscribe({
      next: (resp: KidsResult[]) => {
        this.kidsList = resp;
        this.isVisibleKid = true;
      },
      error: (error: any) => {
        this.message = error;
        this.visible = this.isVisibleKid = true;
      },
      complete: () => {
        this.spinnerService.hide();
      }
    });
  }

  getListParents() {
    this.isVisibleRoomAss = false;
    this.roomAssignedService.getAll().subscribe({
      next: (resp: AssignationRoomResult[]) => {
        this.roomAssList = resp;
        this.roomAssSelected = resp[0];
        this.isVisibleRoomAss = true;
      },
      error: (error: any) => {
        this.message = error;
        this.visible = this.isVisibleRoomAss = true;
      },
      complete: () => {
        this.spinnerService.hide();
      }
    });
  }

  editRow(row: EnrolledChildrenResult) {
    this.actionRow = 1;
    this.kidSelected = new KidsResult();
    this.roomAssSelected = new AssignationRoomResult();
    this.saveDto.id = row.id;
    this.generatePayments = "false";
    this.kidSelected = this.kidsList.find(x => x.id === row.kidId);
    this.roomAssSelected = this.roomAssList.find(x => x.id === row.assignedRoomId);
    this.form.setValue({
      id: row.id,
      observations: row.observations,
      amount: ''
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
    this.saveDto.observations = this.form.get("observations").value;
    let amountRec = this.form.get("amount").value;
    this.saveDto.amount = (amountRec === null || amountRec === undefined || amountRec === '') ? 0 : amountRec.replace('Bs.', '').trim();
    this.saveDto.generatePayments = this.generatePayments === "true";

    if (this.actionRow === 0) {
      this.enrollService.create(this.saveDto).subscribe({
        next: (resp: string) => {
          this.cleanForm();
          this.filterSearch(true);
          this.showAlert('success', 'Realizado', resp);
        },
        error: (error: string) => {
          this.showAlert('error', 'Error', error);
        }
      });
    }
    else {
      this.enrollService.update(this.saveDto).subscribe({
        next: (resp: string) => {
          this.cleanForm();
          this.filterSearch(true);
          this.showAlert('success', 'Realizado', resp);
        },
        error: (error: string) => {
          this.showAlert('error', 'Error', error);
        }
      });
    }
  }

  enableOrDisable(row: EnrolledChildrenResult) {
    this.saveDto.id = row.id;
    this.saveDto.isDeleted = !row.isDeleted;
    this.saveDto.observations = '';
    this.enrollService.disableOrEnable(this.saveDto).subscribe({
      next: (resp: string) => {
        this.filterSearch(true);
        this.showAlert('success', 'Realizado', resp);
      },
      error: (error: string) => {
        this.showAlert('error', 'Error', error);
      }
    });
  }

  showDetails(row: EnrolledChildrenResult) {
    row.showDetails = !row.showDetails;
    row.detailEnrollChildren = new EnrollChildrenDetailResult();
    if (!row.showDetails) return;
    this.saveDto.id = row.id;
    this.saveDto.observations = '';
    this.enrollService.getDetail(this.saveDto).subscribe({
      next: (resp: EnrollChildrenDetailResult) => {
        row.detailEnrollChildren = resp;
      },
      error: (error: string) => {
        this.showAlert('error', 'Error', error);
      }
    });
  }

  downloadPdf() {
    this.enrollService.generatePdf().subscribe({
      next: (resp: ReportResult) => {
        const blob = this.b64toBlob(resp.report, 'application/pdf');
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = resp.reportName + '.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
        this.showAlert('success', 'Realizado', 'Reporte Generado Correctamente');
      },
      error: (error: string) => {
        this.showAlert('error', 'Error', error);
      }
    });
  }
}
