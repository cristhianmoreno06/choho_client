import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TokenInterface } from 'src/app/Interfaces/token-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public urlLogin: string;

  constructor(private httpClient: HttpClient) {
    this.urlLogin = environment.ApiEndPoint + 'login';
  }

  public loginAttemp(data: any) {
    return this.httpClient.post<TokenInterface>(this.urlLogin, data).pipe(tap(response => {
      localStorage.setItem('id-user', response.id);
      localStorage.setItem('name-user', response.name);
      localStorage.setItem('access_token', response.token);
      localStorage.setItem('rol-user', response.activo);
      return true;
    }));
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }
}
