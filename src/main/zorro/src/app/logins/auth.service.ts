import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class AuthService {
  private baseUrl: String = 'http://localhost:8080/api';

  constructor(private _http: HttpClient ) {}
  //登录与后台连接，data是参数
  login(data:any){
    console.log(data)
    return this._http.post(this.baseUrl+'/login',data);
  }

}


