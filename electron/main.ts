import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'
import * as ElectronStore from 'electron-store'

import { GitRepo } from "../src/app/git.service/datatypes/GitRepo"


var DataStore = new ElectronStore({
    defaults: {}
})

class RepoStore {
    hidden: GitRepo[] = []
    active: GitRepo[] = []

    constructor() {
        this.hidden = [];
        this.active = [];
    }
}

let activeRepos = new RepoStore();

const simpleGit = require('simple-git')(process.cwd());

let win: BrowserWindow

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `/../../dist/Gitolemy/index.html`),
            protocol: 'file:',
            slashes: true,
        })
    )

    //win.removeMenu();

    win.on('closed', () => {
        DataStore.set('ActiveRepos', JSON.stringify(activeRepos))   ;
        win = null
    })
}

app.on('ready', () => {
    createWindow();
    
    // Load active repo's from memory.
    let data = DataStore.get('ActiveRepos');
    if (data === undefined)
    {
        activeRepos = new RepoStore;
    } else {
        try {
            activeRepos = JSON.parse(data);
        } catch (ex) {
            console.warn("Repo data could not be fetched. This means that the data was corrupted. Any missing repos will now have to be re-added.")
        }
    }

    // Repo functions - used to fetch and store repos that the user is actively looking at on the computer.
    ipcMain.on('getRepos', (e) => {
        e.sender.send('activeRepos', activeRepos.active);
    });
    ipcMain.on('getHiddenRepos', (e) => {
        e.sender.send('hiddenRepos', activeRepos.hidden);
    });
    ipcMain.on('addRepo', (e, repoDetails) => {
        activeRepos.active.push(repoDetails);
    });
    ipcMain.on('hideRepo', (e, repoDetails) => {
        activeRepos.active.some((repo, i) => {
            if (repo.path === repoDetails.path) {
                activeRepos.hidden.push(repo)
                activeRepos.active.splice(i, 1);
                return true;
            }
        });
    })
    ipcMain.on('showRepo', (e, repoDetails) => {
        activeRepos.hidden.some((repo, i) => {
            if (repo.path === repoDetails.path)
            {
                activeRepos.active.push(repo);
                activeRepos.hidden.splice(i, 1)
                return true;
            }
        })
    });
    ipcMain.on('switchRepo', (e, repoDetails) => {
        // Double check the repo specified is valid by checking our local copy of stuff...
        activeRepos.active.some((repo, i) => {
            if (repo.path === repoDetails.path)
            {
                simpleGit.cwd(repoDetails.pathname);
                e.sender.send('switchRepo', repoDetails);
                console.log(`CWD successfully switched to directory: ${repoDetails.path}`)
                return true;
            }
        })
    });

    
    ipcMain.on('getLocalBranches', (e) => {
        simpleGit.branchLocal((err, branches) => {
            if (err) {
                throw err;
            }
            e.sender.send('localBranches', branches);
        });
    });

    ipcMain.on('getRemotes', (e) => {
        simpleGit.getRemotes((err, remotes) => {
            if (err) {
                throw err;
            }
            e.sender.send('remotes', remotes);
        })
    });

    ipcMain.on('getStatus', (e) => {
        simpleGit.status((err, status) => {
            if (err) {
                throw err;
            }
            e.sender.send('statusRes', status);
        })
    })

    ipcMain.on('getDiffs', (e) => {
        simpleGit.diff((err, diffs) => {
            if (err) {
                throw err;
            }
            e.sender.send('diffRes', diffs);
        })
    })
});