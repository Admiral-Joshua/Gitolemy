import { Component } from "@angular/core";
import { IpcService } from 'src/app/ipc.service';

@Component({
    selector: "clone-repo-dialog",
    templateUrl: "./clone.repo.component.html",
    styleUrls: ["./clone.repo.component.css"]
})
export class CloneRepoComponent {

    cloneOptions: any;

    constructor(private _ipc: IpcService) {
        this.cloneOptions = {
            clonePath: "",
            destPath: "",
            folderName: "",
            sectionSelect: ""
        }
    }

    browseDirectory() {
        this._ipc.send('getDir');
        this._ipc.on('dirRes', (res) => {
            console.log(res);
        });
    }
}