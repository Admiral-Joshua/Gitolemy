import { Component } from "@angular/core";

import { faPlusCircle, faDownload, faUpload, faFileDownload,
    faCodeBranch, faFileAlt, faTrashAlt, faTag} from '@fortawesome/free-solid-svg-icons';

@Component({
    "selector": "top-menubar",
    "templateUrl": "./top-menubar.component.html",
    "styleUrls": ["./top-menubar.component.css"]
})

export class MenubarComponent {
    constructor(){ }

    commitIcon = faPlusCircle;

    pullIcon = faDownload;
    pushIcon = faUpload;
    fetchIcon = faFileDownload;

    branchIcon = faCodeBranch;

    stashIcon = faFileAlt;
    discardIcon = faTrashAlt;
    tagIcon = faTag;

}