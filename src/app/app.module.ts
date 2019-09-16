import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IpcService } from "./ipc.service";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { RepobarComponent } from "./repo-tab-bar/repobar.component";
import { MenubarComponent } from "./top-menubar/top-menubar.component";
import { BranchesSidebarComponent } from "./branches-sidebar/branches-sidebar.component";
import { MainWindowComponent } from "./main-window/main-window.component";

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    BranchesSidebarComponent,
    MainWindowComponent,
    RepobarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [IpcService],
  bootstrap: [AppComponent]
})
export class AppModule { }
