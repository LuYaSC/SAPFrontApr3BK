import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUpdateTypeBusinessDto } from 'src/app/services/type-business/models/create-update-type-business-dto';
import { CollaboratorService } from './../../../services/collaborator/collaborator.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent implements OnInit {

  listTypes: any[] = [];
  typeName: string = '';
  nameService: string = '';
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
  public panes = [
    { name: 'Home 01', id: 'tab-01' },
    { name: 'Profile 02', id: 'tab-02' },
    { name: 'Contact 03', id: 'tab-03' }
  ];
  constructor(private service: CollaboratorService, private formBuilder: FormBuilder) { }

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
            //Validators.email
          ]
        ],
        initial: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(5),
          ]
        ],
      },
    );
    this.form.value as CreateUpdateTypeBusinessDto;
    this.service.AssingService('Collaborator');
    this.getParameters();
  }

  getParameters() {
    this.isVisible = false;
    this.service.getAll().subscribe({
      next: (resp: any[]) => {
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
    debugger;
    this.cleanForm();
    this.actionRow = 0;
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  editRow(row: any) {
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
    this.submitted = true;
    this.isVisible = false;
    this.visible = false;
    if (this.form.invalid) {
      return;
    }
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
