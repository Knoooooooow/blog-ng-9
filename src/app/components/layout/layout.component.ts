import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/model/app/app-state';
import { getIsShowSideBar } from 'src/app/store/selectors/app-selector';
import { RouterOutlet } from '@angular/router';
import { AnimationRoute } from 'src/app/animations/default-animation';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: { class: 'app-layout' },
    animations: [AnimationRoute]

})
export class LayoutComponent implements OnInit {

    isShowSideBar: boolean;

    constructor(private store: Store<AppStore>) {
        
    }

    ngOnInit(): void {
        this.listenIsShowSideBar();
    }
    listenIsShowSideBar() {
        this.store.select(getIsShowSideBar).subscribe(data => {
            this.isShowSideBar = data;
        })
    }
    
    animationRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationName'];
    }
}
