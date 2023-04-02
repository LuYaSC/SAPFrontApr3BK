import { Component, Input, OnInit } from '@angular/core';
import { GeneralComponent } from '../general-component';
import { KidsResult } from 'src/app/services/kid/models/kids-result';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { KidService } from 'src/app/services/kid/kid.service';
import { TypeBusinessService } from 'src/app/services/type-business/type-business.service';
import { SpinnerService } from 'src/app/helpers/spinner.service';
import { ENROLL_CHILDREN, PAYMENT } from '../form-validators.const';
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
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { PaymentResult } from 'src/app/services/payments/models/payment-result';
import { PaymentDetailResult } from 'src/app/services/payments/models/payment-detail-result';
import {PaymentFilterDto} from 'src/app/services/payments/models/payment-filter-dto';
import { PaymentDetailDto } from 'src/app/services/payments/models/payment-detail-dto';
import {PaymentDto} from 'src/app/services/payments/models/payment-dto';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent extends GeneralComponent implements OnInit {

  @Input() typeName: string = '';
  @Input() nameService: string = '';
  public liveDemoVisible = false;
  saveDto: PaymentDto = new PaymentDto();
  filterDto: PaymentFilterDto = new PaymentFilterDto();
  kidsList: KidsResult[] = [];
  kidSelected: KidsResult;
  isVisibleKid = false;
  PaymentList: PaymentResult[] = [];
  PaymentSelected: PaymentResult;
  roomAssList: AssignationRoomResult[] = [];
  roomAssSelected: AssignationRoomResult;
  isVisiblePayment = false;
  isVisibleRoomAss = false;
  isVerified = "true";
  showDetailsValue: boolean = false;
  listEnrollData: EnrolledChildrenResult [] = [];
  isVisibleEnrollData: boolean;
  selectedEnrollData: EnrolledChildrenResult;
  detailKid: EnrollChildrenDetailResult;
  isVisibleDetailKid: boolean = false;
  detailRoom: AssignationRoomDetailResult = new AssignationRoomDetailResult();
  isVisiableDetailRoom: boolean = false;
  formSearch: FormGroup = new FormGroup({
    kid: new FormControl(''),
    parent: new FormControl(''),
    relation: new FormControl(''),
  });
  detailEnrollChildren: EnrollChildrenDetailResult = new EnrollChildrenDetailResult();

  constructor(private kidService: KidService, private roomAssignedService: RoomAssignationService, parameterService: TypeBusinessService,
    private enrollService: EnrollChildrenService, private formBuilder: FormBuilder, private spinnerService: SpinnerService,
    private paymentService: PaymentsService) {
    super(parameterService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      PAYMENT
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
    this.getParameters({ room: true, branchOffice: true, paymentOperation: true, paymentType: true, auditPaymentType: true });
    this.getListEnrollChildren();
    this.isVerified = "true";
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

  onSelectedKidFilter(event: any) {
    this.filterDto.kidId = event?.id;
  }

  onSelectedBranchOfficeFilter(event: GetTypeResult) {
    this.filterDto.branchOfficeId = event?.id;
  }

  onSelectedPaymentOperationFilter(event: any) {
    this.filterDto.paymentOperationId = event?.id;
  }

  onSelectedPaymentType(event: GetTypeResult) {
    this.saveDto.paymentTypeId = event?.id;
  }

  onSelectedAuditPaymentType(event: GetTypeResult) {
    this.saveDto.auditPaymentId = event?.id;
  }

  onSelectedPaymentOperation(event: GetTypeResult) {
    this.saveDto.paymentOperationId = event?.id;
  }

  getListEnrollChildren(){
    this.enrollService.getAll().subscribe({
      next: (resp: EnrolledChildrenResult[]) => {
        this.listEnrollData = resp;
        this.isVisibleEnrollData = true;
      },
      error: (error: any) => {
        this.message = error;
      },
      complete: () => {
        this.spinnerService.hide();
      }
    });
  }

  onSelectedEnrollData(event: any) {
    this.saveDto.enrolledChildrenId = event?.id;
      this.isVisibleDetailKid = false;
      let dto = new EnrolledChildrenDto();
      dto.id = event?.id;
      this.enrollService.getDetail(dto).subscribe({
        next: (resp: EnrollChildrenDetailResult) => {
          this.detailKid = resp;
          this.isVisibleDetailKid = true;
        },
        error: (error: any) => {
          this.message = error;
        },
        complete: () => {
          this.spinnerService.hide();
        }
      });
  }

  onSelectedRoomAss(event: any) {
    if(this.tabindex === 1) {
      this.isVisiableDetailRoom = false;
      this.roomAssignedService.getDetail(new AssignationRoomDetailDto({id: event?.id })).subscribe({
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

  getListTutors() {
    this.isVisible = false;
    this.form.reset();
    this.paymentService.getAll().subscribe({
      next: (resp: PaymentResult[]) => {
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
    this.paymentService.getFilter(this.filterDto).subscribe({
      next: (resp: PaymentResult[]) => {
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
    this.isVisiblePayment = false;
    this.paymentService.getAll().subscribe({
      next: (resp: PaymentResult[]) => {
        this.listTypes = resp;
        this.isVisible = true;
      },
      error: (error: any) => {
        this.message = error;
        this.visible = this.isVisiblePayment = true;
      },
      complete: () => {
        this.spinnerService.hide();
      }
    });
  }

  editRow(row: PaymentResult) {
    this.actionRow = 1;
    //this.kidSelected = new KidsResult();
    //this.roomAssSelected = new AssignationRoomResult();
    this.saveDto.id = row.id;
    this.isVerified = row.isVerified ? 'true' : 'false';
    this.selectedPaymentType = this.listPaymentType.find(x => x.id === row.paymentTypeId);
    this.selectedAuditPaymentType = this.listAuditPaymentType.find(x => x.id === row.auditPaymentId);
    this.selectedPaymentOperation = this.listPaymentOperation.find(x => x.id === row.paymentOperationId);
    this.form.setValue({
      id: row.id,
      observations: row.observations,
      amount: row.amount,
      description: row.description,
      numberBill: row.numberBill
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
    debugger
    this.isVisible = false;
    this.saveDto.observations = this.form.get("observations").value;
    let amountRec = this.form.get("amount").value;
    this.saveDto.amount = (amountRec === null || amountRec === undefined || amountRec === '') ? 0 : amountRec;
    this.saveDto.isVerified = this.isVerified === "true";
    this.saveDto.description = this.form.get("description").value;
    this.saveDto.numberBill = this.form.get("numberBill").value;

    if (this.actionRow === 0) {
      this.paymentService.create(this.saveDto).subscribe({
        next: (resp: string) => {
          this.cleanForm();
          this.filterSearch(true);
          this.notification(resp);
        },
        error: (error: string) => {
          this.notification(error);
        }
      });
    }
    else {
      this.paymentService.update(this.saveDto).subscribe({
        next: (resp: string) => {
          this.cleanForm();
          this.filterSearch(true);
          this.notification(resp);
        },
        error: (error: string) => {
          this.notification(error);
        }
      });
    }
  }

  enableOrDisable(row: PaymentResult) {
    this.paymentService.disableOrEnable(new PaymentDetailDto({id: row.id, isDeleted: !row.isDeleted })).subscribe({
      next: (resp: string) => {
        this.filterSearch(true);
        this.notification(resp);
      },
      error: (error: string) => {
        this.notification(error);
      }
    });
  }

  showDetails(row: PaymentResult) {
    row.showDetails = !row.showDetails;
    row.paymentDetails = new PaymentDetailResult();
    if(!row.showDetails) return;
    this.paymentService.getDetail( new PaymentDetailDto({id: row.id})).subscribe({
      next: (resp: PaymentDetailResult ) => {
        row.paymentDetails = resp;
      },
      error: (error: string) => {
        this.notification(error);
      }
    });
  }
}
