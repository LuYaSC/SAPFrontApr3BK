import { Directive, HostListener, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, UntypedFormControl } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { Observable, Subject } from 'rxjs';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';
import { TypeBusinessService } from 'src/app/services/type-business/type-business.service';

@Directive({
  selector: '[GeneralComponent]'
})
export class GeneralComponent {
  public listSexs: GetTypeResult[];
  public isVisibleSex: boolean;
  public selectedSex: GetTypeResult;
  public listBloods: GetTypeResult[];
  public isVisibleBlood: boolean;
  public selectedBlood: GetTypeResult;
  public listDocumentTypes: GetTypeResult[];
  public isVisibleDocumentType: boolean;
  public selectedDocumentType: GetTypeResult;
  public listMaritalStatus: GetTypeResult[];
  public isVisibleMaritalStatus: boolean;
  public selectedMaritalStatus: GetTypeResult;
  public listBranchOfficeStatus: GetTypeResult[];
  public isVisibleBranchOfficeStatus: boolean;
  public selectedBranchOfficeStatus: GetTypeResult;
  public listCityStatus: GetTypeResult[];
  public isVisibleCityStatus: boolean;
  public selectedCityStatus: GetTypeResult;
  public listRelationStatus: GetTypeResult[];
  public isVisibleRelationStatus: boolean;
  public selectedRelationStatus: GetTypeResult;

  public listRooms: GetTypeResult[];
  public isVisibleRoom: boolean;
  public selectedRoom: GetTypeResult;
  public listTurns: GetTypeResult[];
  public isVisibleTurn: boolean;
  public selectedTurn: GetTypeResult;
  public listModality: GetTypeResult[];
  public isVisibleModality: boolean;
  public selectedModality: GetTypeResult;

  public listPaymentType: GetTypeResult[];
  public isVisiblePaymentType: boolean;
  public selectedPaymentType: GetTypeResult;
  public listAuditPaymentType: GetTypeResult[];
  public isVisibleAuditPaymentType: boolean;
  public selectedAuditPaymentType: GetTypeResult;
  public listPaymentOperation: GetTypeResult[];
  public isVisiblePaymentOperation: boolean;
  public selectedPaymentOperation: GetTypeResult;


  tabindex: number = 0;
  submitted = false;
  actionRow: number = 0;
  isVisible: boolean = false;
  visible: boolean = false;
  message: string = '';
  currentDate = new Date();
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    initial: new FormControl(''),
    dateYMD: new UntypedFormControl(new Date()),
  });
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker?: BsDatepickerDirective;
  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker?.hide();
  }
  bsConfig?: Partial<BsDatepickerConfig>;
  minDate: Date;
  maxDate: Date;
  colorTheme = 'theme-dark-blue';
  showSpinner = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  @Input() listTypes: any[] = [];

  constructor(private parameterService: TypeBusinessService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  visibleItems(): any[] {
    const firstIndex = (this.currentPage - 1) * this.itemsPerPage;
    const lastIndex = Math.min(this.listTypes.length, firstIndex + this.itemsPerPage);

    return this.listTypes.slice(firstIndex, lastIndex);
  }

  getParameters(options: {
    sexType?: boolean,
    bloodType?: boolean,
    documentType?: boolean,
    maritalStatus?: boolean,
    branchOffice?: boolean,
    city?: boolean,
    relation?: boolean,
    room?: boolean,
    turn?: boolean,
    modality?: boolean,
    paymentType?: boolean,
    auditPaymentType?: boolean,
    paymentOperation?: boolean,

  } = {}) {
    const sexType = options.sexType ?? false;
    const bloodType = options.bloodType ?? false;
    const documentType = options.documentType ?? false;
    const maritalStatus = options.maritalStatus ?? false;
    const branchOffice = options.branchOffice ?? false;
    const city = options.city ?? false;
    const relation = options.relation ?? false;
    const room = options.room ?? false;
    const turn = options.turn ?? false;
    const modality = options.modality ?? false;
    const paymentType = options.paymentType ?? false;
    const auditPaymentType = options.auditPaymentType ?? false;
    const paymentOperation = options.paymentOperation ?? false;
    if (sexType) {
      this.GetServiceParametersList('sexType').subscribe(res => {
        this.listSexs = res[0];
        this.isVisibleSex = res[1];
      });
    }
    if (bloodType) {
      this.GetServiceParametersList('bloodType').subscribe(res => {
        this.listBloods = res[0];
        this.isVisibleBlood = res[1];
      });
    }
    if (documentType) {
      this.GetServiceParametersList('documentType').subscribe(res => {
        this.listDocumentTypes = res[0];
        this.isVisibleDocumentType = res[1];
      });
    }
    if (maritalStatus) {
      this.GetServiceParametersList('maritalStatus').subscribe(res => {
        this.listMaritalStatus = res[0];
        this.isVisibleMaritalStatus = res[1];
      });
    }
    if (branchOffice) {
      this.GetServiceParametersList('branchOffice').subscribe(res => {
        this.listBranchOfficeStatus = res[0];
        this.isVisibleBranchOfficeStatus = res[1];
      });
    }
    if (city) {
      this.GetServiceParametersList('city').subscribe(res => {
        this.listCityStatus = res[0];
        this.isVisibleCityStatus = res[1];
      });
    }
    if (relation) {
      this.GetServiceParametersList('relationship').subscribe(res => {
        this.listRelationStatus = res[0];
        this.isVisibleRelationStatus = res[1];
      });
    }
    if (room) {
      this.GetServiceParametersList('room').subscribe(res => {
        this.listRooms = res[0];
        this.isVisibleRoom = res[1];
      });
    }
    if (turn) {
      this.GetServiceParametersList('turn').subscribe(res => {
        this.listTurns = res[0];
        this.isVisibleTurn = res[1];
      });
    }
    if (modality) {
      this.GetServiceParametersList('modality').subscribe(res => {
        this.listModality = res[0];
        this.isVisibleModality = res[1];
      });
    }
    if (paymentType) {
      this.GetServiceParametersList('paymentType').subscribe(res => {
        this.listPaymentType = res[0];
        this.isVisiblePaymentType = res[1];
      });
    }
    if (auditPaymentType) {
      this.GetServiceParametersList('auditPaymentType').subscribe(res => {
        this.listAuditPaymentType = res[0];
        this.isVisibleAuditPaymentType = res[1];
      });
    }
    if (paymentOperation) {
      this.GetServiceParametersList('paymentOperation').subscribe(res => {
        this.listPaymentOperation = res[0];
        this.isVisiblePaymentOperation = res[1];
      });
    }
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

  notification(message: string) {
    this.message = message;
    this.visible = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public changeTab(event: any): void {
    this.tabindex = event;
  }

  cleanForm() {
    this.changeTab(0);
    this.submitted = false;
    this.form.reset();
    this.getParameters();
  }
}
