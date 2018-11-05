import {Component, EventEmitter, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import {EmployeeService} from "../EmployeeService/employee-service";
import {Router} from "@angular/router";
import {FileUploader} from "ng2-file-upload";

const URL = 'http://localhost:8080/api/Excelfile';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  /*@Pipe({ name: 'inputValue' })

  transform(value: string,args?:any): string {
    if(!value) return value;
    if(typeof value !== 'string') {
      throw new Error('Invalid pipe argument for WelcomePipe');
    }
    return "inputValue to " + value;
  }*/
  //页面上的参数
  inputValue: string;
  //实体类对象
  private employees:any;
  constructor(private _employeeService:EmployeeService,private _router:Router/*,private http :HttpClient,private msg: NzMessageService*/) { }
  uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'file'});
  ngOnInit() {
    //向队列中添加一个单独的文件后触发
   this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
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
  }else{
    this._employeeService.vagues(this.inputValue).subscribe((data) =>{
        this.employees=data;
    });
  }


}

  /*customReq = (item: UploadXHRArgs) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    formData.append('id', '1000');
    const req = new HttpRequest('POST', item.action, formData, {
      reportProgress : true,
      withCredentials: true
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total > 0) {
          // tslint:disable-next-line:no-any
          (event as any).percent = event.loaded / event.total * 100;
        }
        // 处理上传进度条，必须指定 `percent` 属性来表示进度
        item.onProgress(event, item.file);
      } else if (event instanceof HttpResponse) {
        // 处理成功
        item.onSuccess(event.body, item.file, event);
      }
    }, (err) => {
      // 处理失败
      item.onError(err, item.file);
    });
  }

  // 一个简单的分片上传
  customBigReq = (item: UploadXHRArgs) => {
    const size = item.file.size;
    const chunkSize = parseInt((size / 3) + '', 10);
    const maxChunk = Math.ceil(size / chunkSize);
    const reqs = Array(maxChunk).fill(0).map((v: {}, index: number) => {
      const start = index * chunkSize;
      let end = start + chunkSize;
      if (size - end < 0) {
        end = size;
      }
      const formData = new FormData();
      formData.append('file', item.file.slice(start, end));
      formData.append('start', start.toString());
      formData.append('end', end.toString());
      formData.append('index', index.toString());
      const req = new HttpRequest('POST', item.action, formData, {
        withCredentials: true
      });
      return this.http.request(req);
    });
    return forkJoin(...reqs).subscribe(resules => {
      // 处理成功
      item.onSuccess({}, item.file, event);
    }, (err) => {
      // 处理失败
      item.onError(err, item.file);
    });
  }*/
}


