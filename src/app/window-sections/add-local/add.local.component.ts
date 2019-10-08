import { Component } from "@angular/core";
import { timingSafeEqual } from 'crypto';

@Component({
    selector: "add-local-dialog",
    templateUrl: "./add.local.component.html",
    styleUrls: ["./add.local.component.css"]
})
export class AddLocalComponent {
    localOptions: any

    constructor() {
        this.localOptions = {
            path: "",
            name: "",
            sectionSelect: ""
        }
    }
}