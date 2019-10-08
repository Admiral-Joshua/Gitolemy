import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ViewManagementService {
    /*currentView: number

    viewChange: Subject<number> = new Subject<number>();*/

    private viewChange = new BehaviorSubject<number>(1);

    currentView$ = this.viewChange.asObservable();

    constructor() {
    }

    changeView(view: number) {
        this.viewChange.next(view);
        console.log(`View switched to ${view}`);
    }
    /*isInRepo() {
        return this.currentView$ > 3;   
    }*/
}