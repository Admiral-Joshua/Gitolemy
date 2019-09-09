import { Component } from "@angular/core";

import { faDesktop, faCodeBranch, faDotCircle, faTag, faCloud} from "@fortawesome/free-solid-svg-icons";

import { IpcService } from "../ipc.service";

@Component({
    templateUrl: "./branches-sidebar.component.html",
    styleUrls: ["./branches-sidebar.component.css"],
    selector: "branches-sidebar"
})

export class BranchesSidebarComponent {

    localBranches: string[] = [
        "master"
    ]

    repoTags: string[] = [
    ]

    remotes: string[] = [
        "origin"
    ]

    currentBranch: string = "master";

    constructor(private readonly _ipc: IpcService) {
        /*this._ipc.on('pong', (event: Electron.IpcMessageEvent) => {
            console.log('pong');
        });

        this._ipc.send('ping');*/
        /*setInterval(() => {
            this.refreshSidebar();
        }, 10000);*/
        this.refreshSidebar();
    }

    fileStatusExpanded: boolean = false;
    localBranchesExpanded: boolean = true;
    tagsExpanded: boolean = false;
    remotesExpanded: boolean = true;

    toggleFileStatus() {
        this.fileStatusExpanded = !this.fileStatusExpanded;
    };

    toggleLocalBranches() {
        this.localBranchesExpanded = !this.localBranchesExpanded;
    };

    toggleTags() {
        this.tagsExpanded = !this.tagsExpanded;
    }

    toggleRemotes() {
        this.remotesExpanded = !this.remotesExpanded;
    }

    switchBranch(branchName : string) {
        for (var i = 0; i < this.localBranches.length; i++)
        {
            if (this.localBranches[i].toLowerCase() === branchName.toLowerCase())
            {
                this.currentBranch = this.localBranches[i];
                break;
            }
        }
    }

    refreshSidebar() {
        //ipcRenderer.send('getLocalBranches');
        this._ipc.send('getLocalBranches');
        this._ipc.on('localBranches', (e, branches) => {
            console.log(branches);
            this.localBranches = branches.all;
        })

        this._ipc.send('getRemotes');
        this._ipc.on('remotes', (e, remotes) => {
            console.log(remotes);
            for (let remote of remotes)
            {
                remote.expanded = false;
            }
            this.remotes = remotes;
        })
    }

    fileStatusIcon = faDesktop;
    branchIcon = faCodeBranch;
    activeBranchIcon = faDotCircle;
    tagIcon = faTag;
    cloudIcon = faCloud;
}