import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../EmployeeService/employee-service";
import {Router} from "@angular/router";
import {FileUploader} from "ng2-file-upload";
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";
import {UploadFile, UploadXHRArgs} from "ng-zorro-antd/upload";
import {filter} from "rxjs/operators";
import {NzMessageService} from "ng-zorro-antd";





const URL = 'http://localhost:8080/api/Excelfile';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  //页面上的参数
  inputValue: string;
  //实体类对象
 employees:any;
  private event: boolean;
  constructor(private _employeeService:EmployeeService,private _router:Router,private http :HttpClient,private msg: NzMessageService) { }
/*  uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'file'});*/

  ngOnInit() {
    //向队列中添加一个单独的文件后触发
  /* this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };*/
    this._employeeService.getUsers().subscribe((employees)=>{
      console.log(employees);
      this.employees=employees;
    },(error)=>{
      console.log(error);
    })
  }
  deleteUser(data){
    this._employeeService.deleteUser(data.employeeId).subscribe((data)=>{
      this.employees.splice(this.employees.indexOf(data),1);
     // 完成删除操作，再一次执行初始化的方法。
      this.ngOnInit();
    },(error)=>{
      console.log(error);
    });
  }

  updateUser(data){
    this._employeeService.setter(data);
   this._router.navigate(['/op']);

  }

  newUser(){
    let employ: any;
    this._employeeService.setter(employ);
    this._router.navigate(['/op']);
  }
//导出
  exports(){
    location.href="http://localhost:8080/api/UserExcelDownloads";
  }
  //模糊查询
  querys(){
  console.log(this.inputValue);
  if (this.inputValue === undefined || this.inputValue === '') {
      alert("错误");
      this.ngOnInit();
  }else{
    this._employeeService.vagues(this.inputValue).subscribe((data) =>{
        this.employees=data;
    });
  }

}
  uploading = false;
  fileList: UploadFile[] = [];
  //上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    return false;
  }

  handleUpload(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    this.uploading = true;
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', 'http://localhost:8080/api/Excelfile', formData, {
      // reportProgress: true
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (event: {}) => {
          this.uploading = false;
          if(event['body'].msg === 'error'){
            this.msg.success('upload failed.');
          } else {
            this.msg.success('upload successfully.');
            this.ngOnInit();
          }
        },
        err => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }
}


