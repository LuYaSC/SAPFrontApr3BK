import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDto } from 'src/app/services/models/login-dto';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';
import Validation from '../../../services/utils/validation-forms-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent  implements OnInit {
  form: FormGroup = new FormGroup({
    // fullname: new FormControl(''),
    username: new FormControl(''),
    // email: new FormControl(''),
    password: new FormControl(''),
    // confirmPassword: new FormControl(''),
    //acceptTerms: new FormControl(false),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

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
            Validators.email
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
    this.authService.login(<LoginDto> this.form.value).subscribe( resp => {
      debugger
      let aux = resp;
    })
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
