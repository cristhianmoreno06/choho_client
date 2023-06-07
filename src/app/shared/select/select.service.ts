import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  public urlGetResources: string;

  constructor(private httpClient: HttpClient) {
    this.urlGetResources = environment.ApiEndPoint;
  }

  getResources(data: any): Observable<any> {
    return this.httpClient.post(this.urlGetResources + data.resourceName, data, {responseType: 'json'});
  }
}
