import { Component, Input, OnInit, ViewChild, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CreateUpdateTypeBusinessDto } from 'src/app/services/type-business/models/create-update-type-business-dto';
import { KidService } from 'src/app/services/kid/kid.service';
import { KidsResult } from 'src/app/services/kid/models/kids-result';
import { BsDatepickerConfig, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { TypeBusinessService } from 'src/app/services/type-business/type-business.service';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';
import { Observable, Subject } from 'rxjs';

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
            Validators.minLength(3),
            Validators.maxLength(10),
          ]
        ],
        startDate: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
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
        lastName: [
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
        sex: [
          '',
          [
            Validators.required,
          ]
        ],
        blood: [
          '',
          [
            Validators.required,
          ]
        ],
        documentType: [
          '',
          [
            Validators.required,
          ]
        ],
        documentNumber: [
          '',
          [
            Validators.minLength(5),
            Validators.maxLength(10),
          ]
        ],
        placeBorn: [
          '',
          [
            Validators.minLength(5),
            Validators.maxLength(30),
          ]
        ],
      },
    );
    this.form.value as CreateUpdateTypeBusinessDto;
    this.service.AssingService('Kid');
    this.getParameters();
  }

  getParameters() {
    this.isVisible = false;
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

  GetServiceParametersList(service: string): Observable<[GetTypeResult[], boolean]> {
    var subject = new Subject<[GetTypeResult[], boolean]>();
    this.parameterService.AssingService(service);
    this.parameterService.getAll().subscribe({
      next: (resp: GetTypeResult[]) => {
        subject.next([resp, true]);
      },
      error: (error: any) => {
        //this.message = error;
        //this.visible = true;
      }
    });
    return subject.asObservable();
  }

  cleanForm() {
    this.form.reset();
  }

  openModal() {
    debugger;
    this.cleanForm();
    this.actionRow = 0;
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  editRow(row: KidsResult) {
    debugger
    this.actionRow = 1;
    //this.form.setValue({ id: row.id, name: row.description, initial: row.initial });
    console.log("🚀 ~ file: type-business.component.ts ~ line 68 ~ TypeBusinessComponent ~ changes ~ aux", this.form)
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  toggleLiveDemo() {
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  handleLiveDemoChange(event: boolean) {
    this.liveDemoVisible = event;
  }

  createOrUpdate() {
    debugger
    this.submitted = true;
    this.visible = false;
    if (this.form.invalid) {
      return;
    }
    this.isVisible = false;
    debugger
    let dto = new CreateUpdateTypeBusinessDto({
      id: this.form.get("id").value,
      description: this.form.get("name").value,
      initial: this.form.get("initial").value
    });
    if (this.actionRow === 0) {
      /*this.service.create(dto).subscribe({
        next: (resp: string) => {
          this.getParameters();
          this.notification(resp);
          this.closeModal();
        },
        error: (error: string) => {
          this.notification(error);
        }
      });*/
    }
    else {
      /*this.service.update(dto).subscribe({
        next: (resp: string) => {
          this.getParameters();
          this.notification(resp);
          this.closeModal();
        },
        error: (error: string) => {
         this.notification(error);
        }
      });*/
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  closeModal() {
    debugger
    this.cleanForm();
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  notification(message: string) {
    this.message = message;
    this.visible = true;
  }
}
