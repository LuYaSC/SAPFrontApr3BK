import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import {ParentService} from './../../../services/parent/parent.service';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';
import { Observable, Subject } from 'rxjs';
import { KidByIdDto } from 'src/app/services/kid/models/kid-by-id-dto';
import { CreateParentDto } from 'src/app/services/parent/models/create-parent-dto';
import { TypeBusinessService } from 'src/app/services/type-business/type-business.service';
import { ParentsResult } from 'src/app/services/parent/models/parents-result';
import { BsDatepickerConfig, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { SpinnerService } from 'src/app/helpers/spinner.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {
  @Input() listTypes: ParentsResult[] = [];
  @Input() typeName: string = '';
  @Input() nameService: string = '';
  public liveDemoVisible = false;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    initial: new FormControl(''),
    dateYMD: new UntypedFormControl(new Date()),
  });
  tabindex: number = 0;
  submitted = false;
  actionRow: number = 0;
  isVisible: boolean = false;
  visible: boolean = false;
  message: string = '';
  currentDate = new Date();
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker?: BsDatepickerDirective;
  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker?.hide();
  }
  bsConfig?: Partial<BsDatepickerConfig>;
  minDate: Date;
  maxDate: Date;
  colorTheme = 'theme-dark-blue';
  listSexs: GetTypeResult[];
  isVisibleSex: boolean;
  listBloods: GetTypeResult[];
  isVisibleBlood: boolean;
  listDocumentTypes: GetTypeResult[];
  isVisibleDocumentType: boolean;
  listMaritalStatus: GetTypeResult[];
  isVisibleMaritalStatus: boolean;
  saveParent: CreateParentDto = new CreateParentDto();
  showSpinner = false;

  constructor(private service: ParentService, private parameterService: TypeBusinessService, private formBuilder: FormBuilder,
    private spinnerService: SpinnerService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        id: [],
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ]
        ],
        firstLastName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ]
        ],
        secondLastName: [
          '',
          [
            Validators.minLength(3),
            Validators.maxLength(20),
          ]
        ],
        address: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(50),
          ]
        ],
        documentNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(10),
          ]
        ],
        placeBorn: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
          ]
        ],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(8),
          ]
        ],
      },
    );
    this.form.value as CreateParentDto;
    this.service.AssingService('Parent');
    this.getListParents();
  }

  changeTab(event: any): void {
    this.tabindex = event;
  }

  onSelectedSex(event: GetTypeResult) {
    this.saveParent.sexTypeId = event.id;
  }

  onSelectedBlood(event: GetTypeResult) {
    this.saveParent.bloodTypeId = event.id;
  }

  onSelectedDocumentType(event: GetTypeResult) {
    this.saveParent.documentTypeId = event.id;
  }

  onSelectedMaritalStatus(event: GetTypeResult) {
    this.saveParent.maritalStatusId = event.id;
  }

  getParameters() {
    this.GetServiceParametersList('sextype').subscribe(res => {
      this.listSexs = res[0];
      this.isVisibleSex = res[1];
    });
    this.GetServiceParametersList('bloodtype').subscribe(res => {
      this.listBloods = res[0];
      this.isVisibleBlood = res[1];
    });
    this.GetServiceParametersList('documenttype').subscribe(res => {
      this.listDocumentTypes = res[0];
      this.isVisibleDocumentType = res[1];
    });
    this.GetServiceParametersList('maritalStatus').subscribe(res => {
      this.listMaritalStatus = res[0];
      this.isVisibleMaritalStatus = res[1];
    });
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

  GetServiceParametersList(service: string): Observable<[GetTypeResult[], boolean]> {
    var subject = new Subject<[GetTypeResult[], boolean]>();
    this.parameterService.AssingService(service);
    this.parameterService.getAll().subscribe({
      next: (resp: GetTypeResult[]) => {
        subject.next([resp, true]);
      },
      error: (error: any) => {
        this.notification(error);
      }
    });
    return subject.asObservable();
  }

  cleanForm() {
    this.changeTab(0);
    this.submitted = false;
    this.form.reset();
    this.getParameters();
  }

  editRow(row: ParentsResult) {
    this.getParameters();
    this.changeTab(1);
    this.actionRow = 1;
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
          this.notification(resp);
        },
        error: (error: string) => {
          this.notification(error);
        }
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
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

  notification(message: string) {
    this.message = message;
    this.visible = true;
  }
}
