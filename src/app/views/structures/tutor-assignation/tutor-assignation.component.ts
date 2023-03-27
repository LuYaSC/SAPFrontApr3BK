import { Component, Input, OnInit } from '@angular/core';
import { GeneralComponent } from '../general-component';
import { TypeBusinessService } from 'src/app/services/type-business/type-business.service';
import { KidService } from 'src/app/services/kid/kid.service';
import { FormBuilder } from '@angular/forms';
import { SpinnerService } from 'src/app/helpers/spinner.service';
import { TUTOR_ASSIGNED } from '../form-validators.const';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';
import { KidsResult } from 'src/app/services/kid/models/kids-result';
import { KidByIdDto } from 'src/app/services/kid/models/kid-by-id-dto';
import { ParentService } from 'src/app/services/parent/parent.service';
import { ParentsResult } from 'src/app/services/parent/models/parents-result';
import { TutorAssignationService} from 'src/app/services/tutor-assignation/tutor-assignation.service';
import { AssignationTutorResult } from 'src/app/services/tutor-assignation/models/assignation-tutor-result';
import { AssignationTutorDto } from 'src/app/services/tutor-assignation/models/assignation-tutor-dto';

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
  kidsList: KidsResult[] = [];
  kidSelected: any;
  parentsList: ParentsResult[] = [];
  parentSelected: any;
  isAuthorized = "true";

  constructor(private kidService: KidService, private parentService: ParentService, parameterService: TypeBusinessService,
    private tutorService: TutorAssignationService, private formBuilder: FormBuilder, private spinnerService: SpinnerService) {
    super(parameterService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      TUTOR_ASSIGNED
    );
    this.form.value as AssignationTutorDto;
    this.getListTutors();
    this.kidService.AssingService('Kid');
    this.getListKids();
    this.parentService.AssingService('Parent');
    this.getListParents();
    this.getParameters(false, false, false, false, false, false, true);
  }

  onSelectedRelation(event: GetTypeResult) {
    this.saveDto.relationshipId = event.id;
  }

  onSelectedKid(event: any) {
    debugger
    this.saveDto.kidId = event.id;
  }

  onSelectedParent(event: any) {
    debugger
    this.saveDto.parentId = event.id;
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

  getListKids() {
    this.kidService.getAll().subscribe({
      next: (resp: KidsResult[]) => {
        this.kidsList = resp;
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

  getListParents() {
    this.parentService.getAll().subscribe({
      next: (resp: ParentsResult[]) => {
        this.parentsList = resp;
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

  editRow(row: AssignationTutorResult) {
    this.actionRow = 1;
    this.saveDto.id = row.id;
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
          this.getListKids();
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
    this.kidService.activateOrDeactivate(new KidByIdDto({ id: row.id, isDeleted: !row.isDeleted })).subscribe({
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
