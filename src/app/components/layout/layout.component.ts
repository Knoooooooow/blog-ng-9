import { Component, OnInit } from '@angular/core';
import { INITIAL_APP_STATE } from './../../store/initial-state';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/model/app/app-state';
import { getIsShowSideBar } from 'src/app/store/selectors/app-selector';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    isShowSideBar: boolean;

    constructor(private store: Store<AppStore>) {
        this.isShowSideBar = INITIAL_APP_STATE.isShowSideBar;
    }

    ngOnInit(): void {
        this.listenIsShowSideBar();
    }
    listenIsShowSideBar() {
        this.store.select(getIsShowSideBar).subscribe(data => {
            this.isShowSideBar = data;
        })
    }
}
