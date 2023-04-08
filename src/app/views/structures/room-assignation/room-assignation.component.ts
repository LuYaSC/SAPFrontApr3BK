import { Component, Input, OnInit } from '@angular/core';
import { GeneralComponent } from '../general-component';
import { TypeBusinessService } from 'src/app/services/type-business/type-business.service';
import { SpinnerService } from 'src/app/helpers/spinner.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ROOM_ASSIGNED } from '../form-validators.const';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';
import { CollaboratorService } from 'src/app/services/collaborator/collaborator.service';
import { AssignationRoomDto } from 'src/app/services/room-assignation/models/assignation-room-dto';
import { RoomAssignationService } from 'src/app/services/room-assignation/room-assignation.service';
import { AssignationRoomResult } from 'src/app/services/room-assignation/models/assignation-room-result';
import { CollaboratorsResult } from 'src/app/services/collaborator/models/collaborators-result';
import { StorageService } from 'src/app/services/storage.service';
import { ReportResult } from 'src/app/services/utils/models/report-result';

@Component({
  selector: 'app-room-assignation',
  templateUrl: './room-assignation.component.html',
  styleUrls: ['./room-assignation.component.scss']
})
export class RoomAssignationComponent extends GeneralComponent implements OnInit {
  @Input() typeName: string = '';
  @Input() nameService: string = '';
  public liveDemoVisible = false;
  saveDto: AssignationRoomDto = new AssignationRoomDto();
  filterDto: AssignationRoomDto = new AssignationRoomDto();
  collaboratorList: CollaboratorsResult[] = [];
  collaboratorSelected: any;
  isVisibleCollaborator = false;
  isAuthorized = "true";
  formSearch: FormGroup = new FormGroup({
    kid: new FormControl(''),
    parent: new FormControl(''),
    relation: new FormControl(''),
  });

  constructor(private collaboratorService: CollaboratorService, parameterService: TypeBusinessService,
    private roomAsService: RoomAssignationService, storageService: StorageService,
    private formBuilder: FormBuilder, private spinnerService: SpinnerService) {
    super(parameterService, storageService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      ROOM_ASSIGNED
    );
    this.form.value as AssignationRoomDto;
    this.getListTutors();
    this.collaboratorService.AssingService('Collaborator');
    this.getParametersTutors();

  }

  getParametersTutors() {
    this.getListCollaborators();
    this.getParameters({ room: true, turn: true, modality: true, branchOffice: true, city: true })
    this.isAuthorized = "true";
    this.actionRow = 0;
    this.collaboratorSelected = null;
    //this.filterDto.kidId = 0;
    //this.filterDto.parentId = 0;
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

  onSelectedCollaborator(event: GetTypeResult) {
    this.saveDto.collaboratorId = event?.id;
  }

  onSelectedCollaboratorFilter(event: any) {
    this.filterDto.collaboratorId = event?.id;
  }

  onSelectedRoom(event: GetTypeResult) {
    this.saveDto.roomId = event?.id;
  }

  onSelectedRoomFilter(event: any) {
    this.filterDto.roomId = event?.id;
  }

  onSelectedTurn(event: any) {
    this.saveDto.turnId = event?.id;
  }

  onSelectedTurnFilter(event: any) {
    this.filterDto.turnId = event?.id;
  }

  onSelectedModality(event: any) {
    this.saveDto.modalityId = event?.id;
  }

  onSelectedModalityFilter(event: any) {
    this.filterDto.modalityId = event?.id;
  }

  onSelectedBranchOffice(event: any) {
    this.saveDto.branchOfficeId = event?.id;
  }

  onSelectedBranchOfficeFilter(event: any) {
    this.filterDto.branchOfficeId = event?.id;
  }

  onSelectedCity(event: any) {
    this.saveDto.cityId = event?.id;
  }

  onSelectedCityFilter(event: any) {
    this.filterDto.cityId = event?.id;
  }

  getListTutors() {
    this.isVisible = false;
    this.form.reset();
    this.roomAsService.getAll().subscribe({
      next: (resp: AssignationRoomResult[]) => {
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
    this.roomAsService.getFilter(this.filterDto).subscribe({
      next: (resp: AssignationRoomResult[]) => {
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

  getListCollaborators() {
    this.isVisibleCollaborator = false;
    this.collaboratorService.getAll().subscribe({
      next: (resp: CollaboratorsResult[]) => {
        this.collaboratorList = resp;
        this.isVisibleCollaborator = true;
      },
      error: (error: any) => {
        this.message = error;
        this.visible = this.isVisibleCollaborator = true;
      },
      complete: () => {
        this.spinnerService.hide();
      }
    });
  }

  editRow(row: AssignationRoomResult) {
    this.actionRow = 1;
    this.saveDto.id = row.id;
    this.collaboratorSelected = this.collaboratorList.find(x => x.id === row.collaboratorId);
    this.selectedRoom = this.listRooms.find(x => x.id === row.roomId);
    this.selectedTurn = this.listTurns.find(x => x.id === row.turnId);
    this.selectedModality = this.listModality.find(x => x.id === row.modalityId);
    this.selectedBranchOfficeStatus = this.listBranchOfficeStatus.find(x => x.id === row.branchOfficeId);
    this.selectedCityStatus = this.listCityStatus.find(x => x.id === row.cityId);
    //this.isAuthorized = row.isAuthorized ? 'true' : 'false';
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

    if (this.actionRow === 0) {
      this.roomAsService.create(this.saveDto).subscribe({
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
      this.roomAsService.update(this.saveDto).subscribe({
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

  enableOrDisable(row: AssignationRoomResult) {
    this.saveDto.id = row.id;
    this.saveDto.isDeleted = !row.isDeleted;
    this.roomAsService.disableOrEnable(this.saveDto).subscribe({
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

  downloadPdf() {
    this.roomAsService.generatePdf().subscribe({
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
