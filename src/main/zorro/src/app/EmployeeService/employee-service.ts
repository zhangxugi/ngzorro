import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../employee";
import { map} from "rxjs/operators";
@Injectable()
export class EmployeeService {
  private baseUrl:String='http://localhost:8080/api';
  private employee :Employee;
   headerss= {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  constructor(private _http: HttpClient) {

  }
  getUsers(){
    return this._http.get(this.baseUrl+'/empselect');
  }
  getUser(id:Number){
    return this._http.get(this.baseUrl+'/empselect/'+id);
  }

  deleteUser(id:Number){
    return this._http.delete(this.baseUrl+'/delete/'+id);
  }
  createUser(employee:Employee){
    return this._http.post(this.baseUrl+'/add',JSON.stringify(employee),this.headerss);
  }
  updateUser(employee :Employee){
    return this._http.put(this.baseUrl+'/update',JSON.stringify(employee),this.headerss);

  }
  Excelfile(file:any){
    return this._http.post(this.baseUrl+'/Excelfile',file).
    pipe(map((response:Response) => response.json()));
  }


  setter(employee:Employee){
    this.employee=employee;
  }
  getter(){
    return this.employee;
  }

  vagues(firstName:String){
    return this._http.get(this.baseUrl+'/findByNameLike/'+firstName);
  }
}
