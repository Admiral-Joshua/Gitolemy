import { Component } from "@angular/core";

import { faUser } from "@fortawesome/free-solid-svg-icons";

import { IpcService } from "../ipc.service";
import { ProtractorExpectedConditions } from 'protractor';
import { GitService } from '../git.service/git.service';
import { GitAuthor } from '../git.service/datatypes/GitAuthor';
import { GitRepo } from '../git.service/datatypes/GitRepo';

@Component({
    selector: "main-window",
    templateUrl: "./main-window.component.html",
    styleUrls: ["./main-window.component.css"]
})

export class MainWindowComponent {
    //currentView : string = "file-status";
    currentView : string = "local-repos";

    /*gitAuthor: any = {
        fullName: "Joshua Richardson-Noyes",
        email: "admiraljrn@gmail.com",
        icon: faUser
    }*/

    allFiles: GitFile[] = [];

    getStagedFiles() {
        let stagedFiles =  this.allFiles.filter((file) => {
            return file.status === 3;
        });
        console.log("Files Staged and ready to be committed.\n", stagedFiles);
        return stagedFiles;
    }

    getUnstagedFiles() {
        let unstagedFiles = [];
        for (let file of this.allFiles)
        {
            console.log(file);
        }
        console.log("Files not staged for commit.\n", unstagedFiles);
        return unstagedFiles;
    }

    getLocalRepos(): GitRepo[] {
        return this._git.getHiddenRepos()
    }


    selectedUntrackedFiles: string[] = [];
    selectedTrackedFiles: string[] = [];

    fileChanges: any[] = [];
    
    constructor(private _ipc: IpcService, private _git: GitService) {
        this.refreshStatus();
        //this.getDiffs();
    }

    commitMsg : string = "";

    selectionChanged(e: any) {

    }

    getAuthor(): GitAuthor {
        return this._git.getAuthor()
    }

    getDiffs() {
        this._ipc.send('getDiffs');
        this._ipc.on('diffRes', (e, diffs) => {
            console.log("Git Diffs");
            let filesChanged: any = [];
            diffs = diffs.split("diff --git");
            for (let diff of diffs) {
                this.processDiff(diff);
            }
            console.log(diffs);
        })
    }

    processDiff(diff: string) {
        // Immediately escape as this is likely invalid.
        if (diff.length < 2) { return; }

        let lines = diff.split("\n");

        let fileName = lines[0].split(" ")[1].replace("a/", "");
        let fileData = lines.splice(1).join("\n");

        // Update GitFile to include the diff.
        let idx = this.getFileIdxByName(fileName);
        if (idx > -1) {
            this.allFiles[idx].diff = fileData;
        }
    }

    getFileIdxByName(pathname: string) {
        for (var i = 0; i < this.allFiles.length; i++)
        {
            if (this.allFiles[i].filepath === pathname)
            {
                return i;
            }
        }
        return -1;
    }

    refreshStatus() {
        this._ipc.send('getStatus');
        this._ipc.on('statusRes', (e, status) => {
            console.log("Git Status:");
            console.log(status);
            for (var fileName of status.modified)
            {
                let file = new GitFile(fileName, "modified");
                this.allFiles.push(file);   
            }
            for (var fileName of status.not_added)
            {
                let file = new GitFile(fileName, "not_added");
                this.allFiles.push(file);
            }
            for (var fileName of status.staged)
            {
                let file = new GitFile(fileName, "staged");
                this.allFiles.push(file);
            }
            for (var fileName of status.conflicted)
            {
                let file = new GitFile(fileName, "conflicted");
                this.allFiles.push(file);
            }
            /*console.log(this.stagedFiles);
            console.log(this.unstagedFiles);*/
        });
    }
}

class GitFile {
    filepath: string;
    status: number; // 0 = modified, 1 = new/unadded, 2 = staged, 3 = conflicted
    diff: string;

    constructor(path: string, status: string, diff?: string)
    {
        this.filepath = path;
        switch (status) {
            case "modified": 
                this.status = 0;
            case "not_added":
                this.status = 1;
            case "staged":
                this.status = 2;
            case "conflicted":
                this.status = 3;
        }
        this.diff = diff;
    }
}