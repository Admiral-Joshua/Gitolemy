import { Component } from "@angular/core";

import { GitAuthor } from '../../git.service/datatypes/GitAuthor';
import { GitRepo } from '../../git.service/datatypes/GitRepo';

import { IpcService } from "../../ipc.service";
import { GitService } from '../../git.service/git.service';

@Component({
    selector: "file-status",
    styleUrls: ["./file.status.component.css"],
    templateUrl: "./file.status.component.html"
})
export class FileStatusComponent {
    
    allFiles: GitFile[] = [];
    commitMsg : string = "";


    constructor(private _ipc: IpcService, private _git: GitService) {
        this.refreshStatus();
        //this.getDiffs();
    }

    getStagedFiles() {
        let stagedFiles =  this.allFiles.filter((file) => {
            return file.status === 3;
        });
        console.log("Files Staged and ready to be committed.\n", stagedFiles);
        return stagedFiles;
    }

    getAuthor(): GitAuthor {
        return this._git.getAuthor()
    }

    getUnstagedFiles() {
        let unstagedFiles = [];
        /*for (let file of this.allFiles)
        {
            console.log(file);
        }*/
        console.log("Files not staged for commit.\n", unstagedFiles);
        return unstagedFiles;
    }

    refreshStatus() {
        this._ipc.send('getStatus');
        this._ipc.on('statusRes', (e, status) => {
            console.log("Git Status:", status);
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