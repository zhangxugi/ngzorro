import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'ScoresLevelPipe'
})
export class ScoresLevelPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    //searchText 是input标签的参数。RegExp正则表达式
    let searchText = new RegExp(args, 'ig');
    //data遍历集合的别名 search搜索，必须是string
    return value.filter(data => {
      if (data.employeeId||data.firstName || data.gender || data.lastName || data.dob ) {
        //转化为string类型
        let employeeId:string;
        employeeId = data.employeeId+"";
        return employeeId.search(searchText) !== -1 ||data.firstName.search(searchText) !== -1 || data.gender.search(searchText) !== -1 || data.lastName.search(searchText) !== -1 ||data.dob.search(searchText) !== -1
      }
    });
  }


}
