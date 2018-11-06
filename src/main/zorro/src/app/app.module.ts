import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {ListComponent} from "./list/list.component";
import {LoginsComponent} from "./logins/logins.component";
import {HeroesComponent} from "./heroes/heroes.component";
import {SaveEmployeeComponent} from "./save-employee/save-employee.component";
import {FileUploadModule} from "ng2-file-upload";
import {ScoresLevelPipe} from "./list/Pipe/scores-level.pipe";

registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    LoginsComponent,
    HeroesComponent,
    SaveEmployeeComponent,
    ScoresLevelPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    NgZorroAntdModule
  ],
    providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
