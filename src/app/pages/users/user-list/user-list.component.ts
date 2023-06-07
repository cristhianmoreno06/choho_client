import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users: any;

  constructor(public _userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this._userService.getUsers().subscribe((response: any) => {
      this.users = response.terceros;
      console.log(this.users);
    }, error => {
      Swal.fire({
        title: error.error.title,
        html: error.error.detail,
        icon: 'error',
      });
    });
  }

  public deleteUser(user_id, index) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este tercero?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      icon: 'question',
    }).then((result) => {
      if (!result.dismiss) {
        const data = {
          'user_id': user_id,
        };
        this._userService.deleteUser(data).subscribe((response: any) => {
          this.users = [];
          this.getUsers();
          Swal.fire({
            title: response.title,
            text: response.text,
            icon: 'success'
          });

        }, error => {
          Swal.fire({
            title: error.error.title,
            text: error.error.text,
            icon: 'error'
          });
        });
      }
    });
  }

}
