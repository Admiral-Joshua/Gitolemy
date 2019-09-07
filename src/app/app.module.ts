import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IpcService } from "./ipc.service";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { MenubarComponent } from "./top-menubar/top-menubar.component";
import { BranchesSidebarComponent } from "./branches-sidebar/branches-sidebar.component";

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    BranchesSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [IpcService],
  bootstrap: [AppComponent]
})
export class AppModule { }
