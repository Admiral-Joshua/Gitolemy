import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'

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
        win = null
    })
}

app.on('ready', () => {
    createWindow();
    
    /*ipcMain.on('ping', (e) => {
        e.sender.send('pong')
    });*/
    
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