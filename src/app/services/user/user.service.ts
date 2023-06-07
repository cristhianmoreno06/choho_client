import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public urlGetUsers: string;
  public urlCreateOrUpdateUser: string;
  public urlGetUser: string;
  public urlDeleteUser: string;

  constructor(private httpClient: HttpClient) {
    this.urlGetUsers = environment.ApiEndPoint + 'user/list';
    this.urlGetUser = environment.ApiEndPoint + 'user/detail';
    this.urlDeleteUser = environment.ApiEndPoint + 'user/delete';
    this.urlCreateOrUpdateUser = environment.ApiEndPoint + 'user/createOrUpdate';
  }

  public getUsers() {
    return this.httpClient.get(this.urlGetUsers);
  }

  public getUser(data: any) {
    return this.httpClient.post(this.urlGetUser, data, { responseType: 'json' });
  }

  public deleteUser(data: any) {
    return this.httpClient.post(this.urlDeleteUser, data, { responseType: 'json' });
  }

  public createOrUpdateUser(data: any) {
    return this.httpClient.post(this.urlCreateOrUpdateUser, data, { responseType: 'json' });
  }
}
