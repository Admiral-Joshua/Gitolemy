import { Component } from "@angular/core";

import { faPlusCircle, faDownload, faUpload, faFileDownload,
    faCodeBranch, faFileAlt, faTrashAlt, faTag, faPlus, faFolder, faDesktop,
    faCloud, faCloudDownloadAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
    "selector": "top-menubar",
    "templateUrl": "./top-menubar.component.html",
    "styleUrls": ["./top-menubar.component.css"]
})

export class MenubarComponent {
    //displayMode: string = "in-repo";
    displayMode: string = "repo-setup";

    constructor(){ }

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