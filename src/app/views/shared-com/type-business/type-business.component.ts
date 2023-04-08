import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeBusinessService } from '../../../services/type-business/type-business.service';
import { GetTypeResult } from '../../../services/type-business/models/get-type-result';
import { CreateUpdateTypeBusinessDto } from '../../../services/type-business/models/create-update-type-business-dto';
import { ReportResult } from 'src/app/services/utils/models/report-result';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-type-business',
  templateUrl: './type-business.component.html',
  styleUrls: ['./type-business.component.scss']
})
export class TypeBusinessComponent implements OnInit {

  @Input() listTypes: GetTypeResult[] = [];
  @Input() typeName: string = '';
  @Input() nameService: string = '';
  @Input() haveInitials: boolean = true;
  public liveDemoVisible = false;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    initial: new FormControl(''),
  });
  formSearch: FormGroup = new FormGroup({
    name: new FormControl(''),
    statusSelected: new FormControl(''),
  });
  submitted = false;
  actionRow: number = 0;
  isVisible: boolean = false;
  visible: boolean = false;
  message: string = '';
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalItemsCount: number = 0;
  listTemp: GetTypeResult[];
  isAdmin: boolean = false;

  constructor(private service: TypeBusinessService, private formBuilder: FormBuilder, private storageService: StorageService) {
    this.isAdmin = storageService.validateIsAdmin();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        id: [],
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
          ]
        ],
        initial: [
          '',
          [
            Validators.minLength(2),
            Validators.maxLength(5),
          ]
        ],
      },
    );
    this.formSearch = this.formBuilder.group(
      {
        name: [
          '',
          []
        ],
        statusSelected: [
          '',
          []
        ],
      },
    );
    this.form.value as CreateUpdateTypeBusinessDto;
    this.formSearch.value as any;
    this.service.AssingService(this.nameService);
    this.getParameters();
  }

  showAlert(icon: any, title: any, text: any, duration: number = 2) {
    let timer;
    timer = duration * 1000;
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: timer
    });
  }

  modelCancel(row: GetTypeResult) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro que desea eliminar el registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Si, ${!row.isDeleted ? 'Deshabilitar' : 'Habilitar'}!`,
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.enableOrDisable(row);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.showAlert('error', 'Cancelado', 'La operacion fue cancelada', 2);
      }
    })
  }

  filterSearch(clean: boolean) {
    let nameSearch = this.formSearch.get("name").value;
    let statusSearch = this.formSearch.get("statusSelected").value;

    if (clean || (nameSearch === '' && statusSearch === '')) {
      this.formSearch.setValue({ name: '', statusSelected: '' });
      this.getParameters();
    }
    else {
      let statusBool = statusSearch === '1';
      this.listTypes = this.listTemp.filter(x => x.description.includes(nameSearch?.toUpperCase()) && x.isDeleted === !statusBool);
      this.onPageChange(1);
      this.visibleItems();
    }
  }

  getParameters() {
    this.isVisible = false;
    this.service.getAll().subscribe({
      next: (resp: GetTypeResult[]) => {
        this.listTypes = resp;
        this.listTemp = resp;
        this.totalItemsCount = resp.length;
        this.isVisible = true;
      },
      error: (error: any) => {
        this.message = error;
        this.visible = true;
      }
    });
  }

  cleanForm() {
    this.form.reset();
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  visibleItems(): any[] {
    const firstIndex = (this.currentPage - 1) * this.itemsPerPage;
    const lastIndex = Math.min(this.listTypes.length, firstIndex + this.itemsPerPage);
    return this.listTypes.slice(firstIndex, lastIndex);
  }

  openModal() {
    this.cleanForm();
    this.actionRow = 0;
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  editRow(row: GetTypeResult) {
    this.actionRow = 1;
    let initial = (row.initial === undefined || row.initial === null) ? '' : row.initial;
    this.form.setValue({ id: row.id, name: row.description, initial: initial });
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
    if (this.form.invalid) {
      return;
    }
    this.isVisible = false;
    this.visible = false;
    let dto = new CreateUpdateTypeBusinessDto({
      id: this.form.get("id").value,
      description: this.form.get("name").value,
      initial: this.form.get("initial").value
    });
    if (this.actionRow === 0) {
      this.service.create(dto).subscribe({
        next: (resp: string) => {
          this.getParameters();
          this.showAlert('success', 'Success', resp);
          this.closeModal();
        },
        error: (error: string) => {
          this.showAlert('error', 'Error', error);
        }
      });
    }
    else {
      this.service.update(dto).subscribe({
        next: (resp: string) => {
          this.getParameters();
          this.showAlert('success', 'Success', resp);
          this.closeModal();
        },
        error: (error: string) => {
          this.showAlert('error', 'Error', error);
        }
      });
    }
  }

  enableOrDisable(row: GetTypeResult) {
    let dto = new CreateUpdateTypeBusinessDto({
      id: row.id,
      description: row.description,
      initial: row.initial === null ? '' : row.initial,
      isDisabled: !row.isDeleted
    });
    this.service.update(dto).subscribe({
      next: (resp: string) => {
        this.getParameters();
        this.showAlert('success', 'Success', resp);
      },
      error: (error: string) => {
        this.showAlert('error', 'Error', error);
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  closeModal() {
    this.cleanForm();
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  notification(message: string) {
    this.message = message;
    this.visible = true;
  }

  downloadPdf() {
    this.service.generatePdf().subscribe({
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

  b64toBlob(b64Data: any, contentType: string): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
