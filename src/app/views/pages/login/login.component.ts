import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/services/models/login-dto';
import { LoginResponse } from 'src/app/services/models/login-response';
import { AuthService } from '../../../services/auth.service';
import { GlobalService } from '../../../services/utils/global.service';
import { StorageService } from '../../../services/storage.service';

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
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private storageService: StorageService, private router: Router) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  visible = false;
  message = '';

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
    this.form.value as LoginDto;
  };

  reloadPage(): void {
    window.location.reload();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.visible = false;
    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.form.value)
      .subscribe({
        next: (resp: LoginResponse) => {
          if (resp.isValid) {
            this.storageService.saveUser(resp);
            this.message = 'Welcome: ' + this.storageService.getUser();
            this.visible = true;
            this.router.navigate(["/dashboard"]);
          } else {
            this.message = resp.message;
            this.visible = true;
          }
        },
        error: (error) => {
          this.message = 'Not Available Service: ' + error.message;
          this.visible = true;
        }
      });
  }
}
