import { Component, OnInit, OnDestroy } from "@angular/core";
import { ViewManagementService } from './view.management.service';

@Component({
    templateUrl: "./view.management.component.html",
    selector: "view-manager",
    styleUrls: ["./view.management.component.css"]
})
export class ViewManagementComponent implements OnDestroy {
    
    private _alive: boolean = true;

    currentView: number;

    constructor(public viewService: ViewManagementService) {
 
        this.viewService.currentView$.subscribe(
            (view) => {
                this.currentView = view;
            }
        )
    }

    isInRepo(): boolean {
        return this.currentView > 3;
    }

    ngOnDestroy() {
        this._alive = false;
    }
}