import { Component } from "@angular/core"
import { IpcService } from "../ipc.service"

import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { ThrowStmt } from '@angular/compiler'

@Component({
    selector: 'repobar',
    templateUrl: "./repobar.component.html",
    styleUrls: ["./repobar.component.css"]
})

export class RepobarComponent {
    constructor(private _ipc: IpcService) {  }

    addIcon = faPlus

    availableRepos: GitRepo[] = [
        new GitRepo("Gitolemy", "C:\\Users\\admir\\Documents\\Programming Projects\\Gitolemy"),
        new GitRepo("Test Repo #1", "C:\\Users\\admir\\Desktop\\TestRepo")
    ]

    activeRepo: number = 0

    getActiveRepos() {

    }

    prepNewRepo() {
        let newIdx = this.availableRepos.push(new GitRepo("", "", 1))
        this.switchRepo(newIdx - 1)
    }

    closeRepo(idx: number) {
        if (this.availableRepos[idx] !== undefined)
        {
            this.availableRepos.splice(idx, 1);
            if (this.availableRepos.length > 0 && this.activeRepo === idx)
            {
                this.switchRepo(idx - 1)
            }
        }
    }
    

    switchRepo(idx: number) {
        if (this.activeRepo !== idx && this.availableRepos[idx] !== undefined)
        {
            this.activeRepo = idx;
        }
    }
}

class GitRepo {
    name: string = ""
    path: string = ""
    type: number = 0

    constructor(name: string, path: string, type?: number)
    {
        this.name = name;
        this.path = path;
        this.type = type || 0;
    }
}