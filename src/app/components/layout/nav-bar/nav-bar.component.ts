import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/model/app/app-state';
import { Store } from '@ngrx/store';
import { SetSideBarStateAction } from 'src/app/store/actions/app-action';
import { getIsShowSideBar } from 'src/app/store/selectors/app-selector';
import { ExtensionsService } from 'src/app/services/extensions.service';
import { TranslationService } from 'src/app/services/translation.service';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from 'src/app/dialogs/about/about.component';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

    myColor: string;
    sideBarStatus: boolean;

    supportLang = [];
    constructor(private store: Store<AppStore>,
        private extensionsService: ExtensionsService,
        private translationService:TranslationService,
        public dialog: MatDialog) {

        this.supportLang = this.extensionsService.appSupportLanguages();
    }

    ngOnInit(): void {
        this.listenIsShowSideBar();
    }

    changeLang(key:string){
        this.translationService.changeTranslation(key);
    }
    listenIsShowSideBar() {
        this.store.select(getIsShowSideBar).subscribe(data => {
            this.sideBarStatus = data;
        })
    }

    openDialog(){
        this.dialog.open(AboutComponent);
    }

    toggleMenu() {
        this.store.dispatch(new SetSideBarStateAction(!this.sideBarStatus));
    }
}
