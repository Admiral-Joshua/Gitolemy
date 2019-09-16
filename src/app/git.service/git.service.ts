import { Injectable } from "@angular/core"
import { IpcService } from '../ipc.service'

import { Observable } from "rxjs"

// Icons
import { faUser } from "@fortawesome/free-solid-svg-icons";

// DataTypes
import { GitRepo } from "./datatypes/GitRepo"
import { GitAuthor } from './datatypes/GitAuthor'

@Injectable({
    providedIn: 'root'
})

export class GitService {

    me: GitAuthor

    constructor(private _ipc : IpcService) {
        this.me = new GitAuthor(
            "Joshua Richardson-Noyes",
            "admiraljrn@gmail.com",
            faUser
        )
        this.setUpListeners()

        this.fetchRepos()
        this.fetchHiddenRepos()
    }


    ActiveRepos: GitRepo[]
    HiddenRepos: GitRepo[]

    SelectedRepo: number = 0


    private fetchRepos() {
        this._ipc.send('getRepos')
    }
    private fetchHiddenRepos() {
        this._ipc.send('getHiddenRepos')
    }

    getRepos(): GitRepo[] {
        return this.ActiveRepos
    }
    getHiddenRepos(): GitRepo[] {
        return this.HiddenRepos
    }

    getAuthor(): GitAuthor {
        return this.me
    }

    switchRepo(repo: GitRepo): void {
        this._ipc.send('switchRepo', repo)
    }

    private setUpListeners() {
        this._ipc.on('activeRepos', (e, repos) => {
            this.ActiveRepos = repos;
        });
        this._ipc.on('hiddenRepos', (e, repos) => {
            this.HiddenRepos = repos;
        });
        this._ipc.on('switchRepo', (e, selectedRepo) => {
            this.ActiveRepos.some((repo, i) => {
                if (repo.path === selectedRepo.path) {
                    this.SelectedRepo = i;
                    return true;
                }
            })
        })
    }
}