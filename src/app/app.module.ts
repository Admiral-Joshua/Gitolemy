import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IpcService } from "./ipc.service";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

/*
 * View Manager
*/
import { ViewManagementComponent } from "./view-manager/view.management.component";
import { ViewManagementService } from "./view-manager/view.management.service";
/* ----------------------------------- */
/* ----------------------------------- */

/*
 * Window Views
*/
import { FileStatusComponent } from "./window-sections/file-status/file.status.component";
import { BranchGraphComponent } from "./window-sections/branch-graph/branch.graph.component";
import { CloneRepoComponent } from "./window-sections/clone-repo/clone.repo.component";
import { AddLocalComponent } from "./window-sections/add-local/add.local.component";
import { RepobarComponent } from "./repo-tab-bar/repobar.component";
import { MenubarComponent } from "./top-menubar/top-menubar.component";
import { BranchesSidebarComponent } from "./branches-sidebar/branches-sidebar.component";
import { MainWindowComponent } from "./main-window/main-window.component";
/* ----------------------------------- */
/* ----------------------------------- */

@NgModule({
  declarations: [
    AppComponent,
    ViewManagementComponent,
    MenubarComponent,
    BranchesSidebarComponent,
    MainWindowComponent,
    RepobarComponent,
    
    FileStatusComponent,
    BranchGraphComponent,
    CloneRepoComponent,
    AddLocalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [
    IpcService,
    ViewManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
