import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', '*')
};
@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {
  token:any;
  baseurl = environment.baseurl;
  constructor(private http: HttpClient) { }

  public postRequest(url: any, data: any): any {
    this.token = localStorage.getItem('token');
    return this.http.post(this.baseurl + url, data, {
      headers: new HttpHeaders().set("token", this.token),
    });
  }

  public getRequest(url: any): any {
    return this.http.get(this.baseurl + url, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token'))
    });
  }

  public putRequest(url: any, data: any): any {
    return this.http.put(this.baseurl + url, data, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token'))
    });
  }

  public deleteRequest(url: any): any {
    return this.http.delete(this.baseurl + url, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token'))
    });
  }
}
