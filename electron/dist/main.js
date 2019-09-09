"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var simpleGit = require('simple-git')(process.cwd());
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/Gitolemy/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    //win.removeMenu();
    win.on('closed', function () {
        win = null;
    });
}
electron_1.app.on('ready', function () {
    createWindow();
    /*ipcMain.on('ping', (e) => {
        e.sender.send('pong')
    });*/
    electron_1.ipcMain.on('getLocalBranches', function (e) {
        simpleGit.branchLocal(function (err, branches) {
            if (err) {
                throw err;
            }
            e.sender.send('localBranches', branches);
        });
    });
    electron_1.ipcMain.on('getRemotes', function (e) {
        simpleGit.getRemotes(function (err, remotes) {
            if (err) {
                throw err;
            }
            e.sender.send('remotes', remotes);
        });
    });
    electron_1.ipcMain.on('getStatus', function (e) {
        simpleGit.status(function (err, status) {
            if (err) {
                throw err;
            }
            e.sender.send('statusRes', status);
        });
    });
    electron_1.ipcMain.on('getDiffs', function (e) {
        simpleGit.diff(function (err, diffs) {
            if (err) {
                throw err;
            }
            e.sender.send('diffRes', diffs);
        });
    });
});
//# sourceMappingURL=main.js.map