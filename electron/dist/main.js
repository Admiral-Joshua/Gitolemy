"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var simpleGit = require('simple-git')(process.cwd());
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 960,
        height: 640,
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
});
//# sourceMappingURL=main.js.map