import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/model/app/app-state';
import { Store } from '@ngrx/store';
import { SetSideBarStateAction } from 'src/app/store/actions/app-action';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

    myColor: string;

    constructor(private store: Store<AppStore>) { }

    ngOnInit(): void {
    }
    displayMenu() {
        this.store.dispatch(new SetSideBarStateAction(false));
    }

}
