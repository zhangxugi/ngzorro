import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'ScoresLevelPipe'
})
export class ScoresLevelPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');


    return value.filter(data => {
      if (data.employeeId||data.firstName || data.gender || data.lastName || data.dob ) {
        let employeeId:string;
        employeeId = data.employeeId+"";
        return employeeId.search(searchText) !== -1 ||data.firstName.search(searchText) !== -1 || data.gender.search(searchText) !== -1 || data.lastName.search(searchText) !== -1 ||data.dob.search(searchText) !== -1
      }
    });
  }


}
