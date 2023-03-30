import { Component, Input, OnInit } from '@angular/core';
import { GeneralComponent } from '../general-component';
import { AssignationTutorDto } from 'src/app/services/tutor-assignation/models/assignation-tutor-dto';
import { KidsResult } from 'src/app/services/kid/models/kids-result';
import { ParentsResult } from 'src/app/services/parent/models/parents-result';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { KidService } from 'src/app/services/kid/kid.service';
import { ParentService } from 'src/app/services/parent/parent.service';
import { TypeBusinessService } from 'src/app/services/type-business/type-business.service';
import { SpinnerService } from 'src/app/helpers/spinner.service';
import { ENROLL_CHILDREN, TUTOR_ASSIGNED } from '../form-validators.const';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';
import { AssignationTutorResult } from 'src/app/services/tutor-assignation/models/assignation-tutor-result';
import { EnrollChildrenService } from 'src/app/services/enroll-children/enroll-children.service';
import { EnrolledChildrenDto } from 'src/app/services/enroll-children/models/enrolled-children-dto';
import { EnrolledChildrenResult } from 'src/app/services/enroll-children/models/enrolled-children-result';
import { DomSanitizer } from '@angular/platform-browser';
import { EnrollChildrenDetailResult } from 'src/app/services/enroll-children/models/enroll-children-detail-result';
import { EnrollFilterDto } from 'src/app/services/enroll-children/models/enroll-filter-dto';
import { RoomAssignationService } from 'src/app/services/room-assignation/room-assignation.service';
import { AssignationRoomResult } from 'src/app/services/room-assignation/models/assignation-room-result';

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
  kidSelected: any;
  isVisibleKid = false;
  roomAssList: AssignationRoomResult[] = [];
  roomAssSelected: AssignationRoomResult;
  isVisibleRoomAss = false;
  isAuthorized = "true";
  showDetailsValue: boolean = false;
  formSearch: FormGroup = new FormGroup({
    kid: new FormControl(''),
    parent: new FormControl(''),
    relation: new FormControl(''),
  });
  detailEnrollChildren: EnrollChildrenDetailResult = new EnrollChildrenDetailResult();

  constructor(private kidService: KidService, private roomAssignedService: RoomAssignationService, parameterService: TypeBusinessService,
    private enrollService: EnrollChildrenService, private formBuilder: FormBuilder, private spinnerService: SpinnerService,
    private sanitizer: DomSanitizer) {
    super(parameterService);
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
    this.isAuthorized = "true";
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
  }

  onSelectedRoomAss(event: any) {
    this.saveDto.assignedRoomId = event?.id;
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

  editRow(row: AssignationTutorResult) {
    this.actionRow = 1;
    this.saveDto.id = row.id;
    this.kidSelected = this.kidsList.find(x => x.id === row.kidId);
    this.roomAssSelected = this.roomAssList.find(x => x.id === row.id);
    this.selectedRelationStatus = this.listRelationStatus.find((x) => x.description === row.relation);
    this.isAuthorized = row.isAuthorized ? 'true' : 'false';
    this.form.setValue({
      id: row.id,
      observations: row.observations,
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
    //this.saveDto.isAuthorized = this.isAuthorized === "true";

    if (this.actionRow === 0) {
      this.enrollService.create(this.saveDto).subscribe({
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
      this.enrollService.update(this.saveDto).subscribe({
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

  enableOrDisable(row: EnrolledChildrenResult) {
    this.saveDto.id = row.id;
    this.saveDto.isDeleted = !row.isDeleted;
    this.enrollService.disableOrEnable(this.saveDto).subscribe({
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

  showDetails(row: EnrolledChildrenResult) {
    row.showDetails = !row.showDetails;
    row.detailEnrollChildren = new EnrollChildrenDetailResult();
    if(!row.showDetails) return;
    this.saveDto.id = row.id;
    this.saveDto.observations = '';
    this.enrollService.getDetail(this.saveDto).subscribe({
      next: (resp: EnrollChildrenDetailResult ) => {
        row.detailEnrollChildren = resp;
        // this.cleanForm();
        //this.filterSearch(true);
        //this.notification(resp);
      },
      error: (error: string) => {
        this.notification(error);
      }
    });
  }

  getAccordionBodyText(value: string) {
    const textSample = `
      <strong>This is the <mark>#${value}</mark> item accordion body.</strong> It is hidden by
      default, until the collapse plugin adds the appropriate classes that we use to
      style each element. These classes control the overall appearance, as well as
      the showing and hiding via CSS transitions. You can modify any of this with
      custom CSS or overriding our default variables. It&#39;s also worth noting
      that just about any HTML can go within the <code>.accordion-body</code>,
      though the transition does limit overflow.
    `;
    return this.sanitizer.bypassSecurityTrustHtml(textSample);
  }
}
