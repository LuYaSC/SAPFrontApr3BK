import { Component, Input, OnInit, ViewChild, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { KidService } from 'src/app/services/kid/kid.service';
import { KidsResult } from 'src/app/services/kid/models/kids-result';
import { KidByIdDto } from 'src/app/services/kid/models/kid-by-id-dto';
import { BsDatepickerConfig, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { TypeBusinessService } from 'src/app/services/type-business/type-business.service';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';
import { Observable, Subject } from 'rxjs';
import { CreateKidDto } from 'src/app/services/kid/models/create-kid-dto';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.scss']
})
export class KidsComponent implements OnInit {
  @Input() listTypes: KidsResult[] = [];
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
  public panes = [
    { name: 'Home 01', id: 'tab-01' },
    { name: 'Profile 02', id: 'tab-02' },
    { name: 'Contact 03', id: 'tab-03' }
  ];
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
  saveKid: CreateKidDto = new CreateKidDto();
  constructor(private service: KidService, private parameterService: TypeBusinessService, private formBuilder: FormBuilder) {
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
        bornDate: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(10),
          ]
        ],
        startDate: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(10),
          ]
        ],
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
      },
    );
    this.form.value as CreateKidDto;
    this.service.AssingService('Kid');
    this.getListKids();
  }

  changeTab(event: any): void {
    this.tabindex = event;
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

  editRow(row: KidsResult) {
    debugger
    this.changeTab(1);
    this.actionRow = 1;
    debugger
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
    debugger
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
          debugger
          this.cleanForm();
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

  enableOrDisable(row: KidsResult) {
    debugger
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
