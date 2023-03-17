import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeBusinessService } from '../../../services/type-business/type-business.service';
import { GetTypeResult } from '../../../services/type-business/models/get-type-result';
import { CreateUpdateTypeBusinessDto } from '../../../services/type-business/models/create-update-type-business-dto';

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

  constructor(private service: TypeBusinessService, private formBuilder: FormBuilder) { }

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
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
          ]
        ],
        statusSelected: [
          '',
          [
            Validators.required,
          ]
        ],
      },
    );
    this.form.value as CreateUpdateTypeBusinessDto;
    this.formSearch.value as any;
    this.service.AssingService(this.nameService);
    this.getParameters();
  }

  onSelectedStatus() {

  }

  getParameters() {
    this.isVisible = false;
    this.service.getAll().subscribe({
      next: (resp: GetTypeResult[]) => {
        this.listTypes = resp;
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
    this.isVisible = false;
    this.visible = false;
    if (this.form.invalid) {
      return;
    }
    let dto = new CreateUpdateTypeBusinessDto({
      id: this.form.get("id").value,
      description: this.form.get("name").value,
      initial: this.form.get("initial").value
    });
    if (this.actionRow === 0) {
      this.service.create(dto).subscribe({
        next: (resp: string) => {
          this.getParameters();
          this.notification(resp);
          this.closeModal();
        },
        error: (error: string) => {
          this.notification(error);
        }
      });
    }
    else {
      this.service.update(dto).subscribe({
        next: (resp: string) => {
          this.getParameters();
          this.notification(resp);
          this.closeModal();
        },
        error: (error: string) => {
          this.notification(error);
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
        this.notification(resp);
      },
      error: (error: string) => {
        this.notification(error);
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
}
