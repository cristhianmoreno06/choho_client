import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public error: string;

  constructor(public _loginService: LoginService, private router: Router) {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.createLoginForm();
  }

  ngOnDestroy() {
  }

  public createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  public loginAttemp(): void {
    if (this.loginForm.valid) {

      this._loginService.loginAttemp(this.loginForm.value).pipe(first())
        .subscribe(
          result => this.router.navigate(['dashboard']),
          err => this.error,
        );
    } else {
      // validate all form fields
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });

    }
  }

}
