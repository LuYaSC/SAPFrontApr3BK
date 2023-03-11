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
  submitted = false;
  actionRow: number = 0;
  isVisible: boolean = false;
  visible: boolean = false;

  message: string = '';
  constructor(private service: TypeBusinessService, private formBuilder: FormBuilder) { }

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
        initial: [
          '',
          [
            Validators.minLength(2),
            Validators.maxLength(5),
          ]
        ],
      },
    );
    this.form.value as CreateUpdateTypeBusinessDto;
    this.service.AssingService(this.nameService);
    this.getParameters();
  }

  getParameters() {
    this.isVisible = false;
    this.service.getAll().subscribe({
      next: (resp: GetTypeResult[]) => {
        this.listTypes = resp;
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

  openModal() {
    this.cleanForm();
    this.actionRow = 0;
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  editRow(row: GetTypeResult) {
    this.actionRow = 1;
    this.form.setValue({ id: row.id, name: row.description, initial: row.initial });
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
