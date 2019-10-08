import { Component } from "@angular/core";

import { faPlusCircle, faDownload, faUpload, faFileDownload,
    faCodeBranch, faFileAlt, faTrashAlt, faTag, faPlus, faFolder, faDesktop,
    faCloud, faCloudDownloadAlt} from '@fortawesome/free-solid-svg-icons';
import { ViewManagementService } from '../view-manager/view.management.service';

@Component({
    "selector": "top-menubar",
    "templateUrl": "./top-menubar.component.html",
    "styleUrls": ["./top-menubar.component.css"]
})

export class MenubarComponent {

    currentView: number;

    constructor(private viewService: ViewManagementService){
        this.viewService.currentView$.subscribe((view) => {
            this.currentView = view;
        });
    }

    switchView(view: number) {
        this.viewService.changeView(view);
    }

    // In-Repo display mode.
    commitIcon = faPlusCircle;
    pullIcon = faDownload;
    pushIcon = faUpload;
    fetchIcon = faFileDownload;
    branchIcon = faCodeBranch;
    stashIcon = faFileAlt;
    discardIcon = faTrashAlt;
    tagIcon = faTag;


    localIcon = faDesktop;
    remoteIcon = faCloud;
    cloneIcon = faCloudDownloadAlt;
    addIcon = faFolder;
    createIcon = faPlus;


}