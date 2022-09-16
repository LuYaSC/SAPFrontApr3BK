import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { filter, Observable } from 'rxjs';
import { LoginDto } from 'src/app/services/models/login-dto';
import { AuthService } from '../../../services/auth.service';
import { GlobalService } from '../../../services/utils/global.service';
import { AppToastComponent } from '../../notifications/toasters/toast-simple/toast.component';

export enum Colors {
  '' = '',
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  dark = 'dark',
  light = 'light',
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, GlobalService],
})

export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    // fullname: new FormControl(''),
    username: new FormControl(''),
    // email: new FormControl(''),
    password: new FormControl(''),
    // confirmPassword: new FormControl(''),
    //acceptTerms: new FormControl(false),
  });
  submitted = false;

  positions = Object.values(ToasterPlacement);
  positionStatic = ToasterPlacement.Static;
  colors = Object.keys(Colors);
  autohide = true;
  delay = 5000;
  fade = true;

  formChanges!: Observable<any>;

  toasterForm = new UntypedFormGroup({
    autohide: new UntypedFormControl(this.autohide),
    delay: new UntypedFormControl({ value: this.delay, disabled: !this.autohide }),
    fade: new UntypedFormControl({ value: true, disabled: false }),
    closeButton: new UntypedFormControl(true),
    color: new UntypedFormControl('')
  });

  @ViewChildren(ToasterComponent) viewChildren!: QueryList<ToasterComponent>;

  position = 'top-end';
  visible = false;
  percentage = 0;
  messageError= '';

  toggleToast() {
    this.visible = !this.visible;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 100;
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private globalService: GlobalService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        //fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            //Validators.email
          ]
        ],
        //email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ]
        ],
        //confirmPassword: ['', Validators.required],
        //acceptTerms: [false, Validators.requiredTrue]
      },
      /*{
        validators: [Validation.match('password', 'confirmPassword')]
      }*/
    );
    this.formChanges = this.toasterForm.valueChanges.pipe(filter(e => e.autohide !== this.autohide));
    this.formChanges.subscribe(e => {
      this.autohide = e.autohide;
      this.position = e.position;
      this.fade = e.fade;
      const control = this.toasterForm?.get('delay');
      this.autohide ? control?.enable() : control?.disable();
      this.delay = control?.enabled ? e.timeout : this.delay;
    });
  };

  //constructor(private authService: AuthService, private storageService: StorageService) { }

  /*ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }*/

  onSubmit2(): void {
    //const { username, password } = this.form;

    /*this.authService.login(username, password).subscribe({
      next: data => {
        debugger
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });*/
  }

  reloadPage(): void {
    window.location.reload();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    debugger
    this.submitted = true;
    if (this.form.invalid) {

      return;
    }
    this.authService.login(<LoginDto>this.form.value).subscribe((resp) => {
      debugger;
      let aux = resp;
    }, (error => {
      this.messageError = 'Unaivalable Service';
      this.toggleToast();
    }));
  }

  addToast() {
    debugger;
    const formValues = this.toasterForm.value;
    formValues.color = Colors.primary;
    formValues.position = ToasterPlacement.TopEnd;
    formValues.autohide = true;
    formValues.closeButton = true;
    formValues.delay = 5000;

    const toasterPosition = this.viewChildren.filter(item => item.placement === this.toasterForm.value.position);
    toasterPosition.forEach((item) => {
      const title = `Toast ${formValues.color} ${formValues.position}`;
      const { ...props } = { ...formValues, title };
      const componentRef = item.addToast(AppToastComponent, props, {});
      componentRef.instance['closeButton'] = props.closeButton;
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


}
