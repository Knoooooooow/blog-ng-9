import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/model/app/app-state';
import { Store } from '@ngrx/store';
import { SetSideBarStateAction } from 'src/app/store/actions/app-action';
import { getIsShowSideBar } from 'src/app/store/selectors/app-selector';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

    myColor: string;
    sideBarStatus: boolean;

    constructor(private store: Store<AppStore>) { }

    ngOnInit(): void {
        this.listenIsShowSideBar();
    }
    listenIsShowSideBar() {
        this.store.select(getIsShowSideBar).subscribe(data => {
            this.sideBarStatus = data;
        })
    }

    toggleMenu() {
        this.store.dispatch(new SetSideBarStateAction(!this.sideBarStatus));
    }
}
