import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {EmployeeService} from "./EmployeeService/employee-service";
import {LoginsComponent} from "./logins/logins.component";
import {AuthService} from "./logins/auth.service";
import {HeroesComponent} from "./heroes/heroes.component";
import {SaveEmployeeComponent} from "./save-employee/save-employee.component";

const routes: Routes = [
  {path:'',component:LoginsComponent},
  {path:'s',component:HeroesComponent },
  {path:'list',component:ListComponent},
  {path:'op',component:SaveEmployeeComponent},

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers:[EmployeeService,AuthService],
  declarations: []
})
export class AppRoutingModule { }
