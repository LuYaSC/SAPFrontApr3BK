import { Component, Input, OnInit } from '@angular/core';
import { GeneralComponent } from '../general-component';
import { TypeBusinessService } from 'src/app/services/type-business/type-business.service';
import { KidService } from 'src/app/services/kid/kid.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SpinnerService } from 'src/app/helpers/spinner.service';
import { TUTOR_ASSIGNED } from '../form-validators.const';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';
import { KidsResult } from 'src/app/services/kid/models/kids-result';
import { ParentService } from 'src/app/services/parent/parent.service';
import { ParentsResult } from 'src/app/services/parent/models/parents-result';
import { TutorAssignationService } from 'src/app/services/tutor-assignation/tutor-assignation.service';
import { AssignationTutorResult } from 'src/app/services/tutor-assignation/models/assignation-tutor-result';
import { AssignationTutorDto } from 'src/app/services/tutor-assignation/models/assignation-tutor-dto';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tutor-assignation',
  templateUrl: './tutor-assignation.component.html',
  styleUrls: ['./tutor-assignation.component.scss']
})
export class TutorAssignationComponent extends GeneralComponent implements OnInit {
  @Input() typeName: string = '';
  @Input() nameService: string = '';
  public liveDemoVisible = false;
  saveDto: AssignationTutorDto = new AssignationTutorDto();
  filterDto: AssignationTutorDto = new AssignationTutorDto();
  kidsList: KidsResult[] = [];
  kidSelected: any;
  isVisibleKid = false;
  parentsList: ParentsResult[] = [];
  parentSelected: any;
  isVisibleParent = false;
  isAuthorized = "true";
  formSearch: FormGroup = new FormGroup({
    kid: new FormControl(''),
    parent: new FormControl(''),
    relation: new FormControl(''),
  });


  constructor(private kidService: KidService, private parentService: ParentService, parameterService: TypeBusinessService,
    private tutorService: TutorAssignationService, private formBuilder: FormBuilder, private spinnerService: SpinnerService, storageService: StorageService) {
    super(parameterService, storageService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      TUTOR_ASSIGNED
    );
    this.form.value as AssignationTutorDto;
    this.getListTutors();
    this.kidService.AssingService('Kid');
    this.parentService.AssingService('Parent');
    this.getParametersTutors();

  }

  getParametersTutors() {
    this.getListKids();
    this.getListParents();
    this.getParameters({ relation: true })
    this.isAuthorized = "true";
    this.actionRow = 0;
    this.kidSelected = null;
    this.parentSelected = null;
    this.filterDto.kidId = 0;
    this.filterDto.parentId = 0;
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

  onSelectedRelation(event: GetTypeResult) {
    this.saveDto.relationshipId = event?.id;
  }

  onSelectedKid(event: any) {
    this.saveDto.kidId = event?.id;
  }

  onSelectedKidFilter(event: any) {
    this.filterDto.kidId = event?.id;
  }

  onSelectedParent(event: any) {
    this.saveDto.parentId = event?.id;
  }

  onSelectedParentFilter(event: any) {
    this.filterDto.parentId = event?.id;
  }

  getListTutors() {
    this.isVisible = false;
    this.form.reset();
    this.tutorService.getAll().subscribe({
      next: (resp: AssignationTutorResult[]) => {
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
    this.tutorService.getFilter(this.filterDto).subscribe({
      next: (resp: AssignationTutorResult[]) => {
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
    this.isVisibleParent = false;
    this.parentService.getAll().subscribe({
      next: (resp: ParentsResult[]) => {
        this.parentsList = resp;
        this.isVisibleParent = true;
      },
      error: (error: any) => {
        this.message = error;
        this.visible = this.isVisibleParent = true;
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
    this.parentSelected = this.parentsList.find(x => x.id === row.parentId);
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
    this.saveDto.isAuthorized = this.isAuthorized === "true";

    if (this.actionRow === 0) {
      this.tutorService.create(this.saveDto).subscribe({
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
      this.tutorService.update(this.saveDto).subscribe({
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

  enableOrDisable(row: AssignationTutorResult) {
  this.saveDto.id = row.id;
  this.saveDto.isDeleted = !row.isDeleted;
    this.tutorService.disableOrEnable(this.saveDto).subscribe({
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
