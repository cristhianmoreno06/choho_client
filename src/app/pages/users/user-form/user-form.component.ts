import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public submitUserForm: FormGroup;
  public title: any;
  public isEditable = false;
  public user: any;
  private user_id: any;

  constructor(public _userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.user_id = this.route.snapshot.paramMap.get('user_id');
    if (this.user_id) {
      this.isEditable = true;
      this.title = 'Edición de tercero';
      this.createForms();
      this.getUser(this.user_id);
    } else {
      this.title = 'Registro de tercero';
      this.createForms();
    }
  }

  public createForms() {
    this.generateUserForm();
  }

  public getUser(user_id) {
    const data = {
      user_id: user_id
    };
    this._userService.getUser(data).subscribe((response: any) => {
      this.user = response.tercerosDetail;
      console.log(this.user);
      this.fillForms();
    }, error => {
      Swal.fire({
        title: error.error.title,
        html: error.error.detail,
        icon: 'error',
      });
    });
  }

  public fillForms() {
    this.submitUserForm.get('id').setValue(this.user.id);
    this.submitUserForm.get('nit').setValue(this.user.nit);
    this.submitUserForm.get('razon_social').setValue(this.user.razon_social);
    this.submitUserForm.get('tipo').setValue(this.user.tipo);
    this.submitUserForm.get('activo').setValue((this.user.activo === 's' ? 'Activo' : 'No activo'));
  }

  public generateUserForm(): void {

    this.submitUserForm = new FormGroup({
      id: new FormControl(''),
      nit: new FormControl('', Validators.compose([Validators.required])),
      razon_social: new FormControl('', Validators.compose([Validators.required])),
      tipo: new FormControl('', Validators.compose([Validators.required])),
      activo: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  public createOrUpdateUser() {
    if (this.submitUserForm.valid) {
      this._userService.createOrUpdateUser(this.submitUserForm.value).subscribe((response: any) => {
        Swal.fire({
          title: response.title,
          text: response.text,
          icon: 'success',
        });
      }, error => {
        Swal.fire({
          title: error.error.title,
          text: error.error.text,
          icon: 'error',
        });
      });
    } else {
      // validate all form fields
      Object.keys(this.submitUserForm.controls).forEach(field => {
        const control = this.submitUserForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
