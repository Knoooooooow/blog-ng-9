import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/model/app/app-state';
import { SetSideBarStateAction } from 'src/app/store/actions/app-action';
import { getIsShowSideBar } from 'src/app/store/selectors/app-selector';
import { ExtensionsService } from 'src/app/services/extensions.service';
import { TranslationService } from 'src/app/services/translation.service';
import { AboutComponent } from 'src/app/dialogs/about/about.component';
import { AudioService } from 'src/app/services/audio.service';

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
        private translationService: TranslationService,
        private audioService: AudioService,
        public dialog: MatDialog) {

        this.supportLang = this.extensionsService.appSupportLanguages();
    }
    @ViewChild('audioUpload', { static: true })
    public audioUpload: ElementRef<HTMLElement>;

    @ViewChild('audio', { static: true })
    public audio: ElementRef<HTMLAudioElement>;

    ngOnInit(): void {
        this.listenIsShowSideBar();
    }
    playAudio(){
        this.audioService.changeAudioStatus();
    }
    isPlayingAudio(){
        return this.audioService.isPlayingAudio();
    }

    openInput() {
        this.audioService.chooseAudio(this.audioUpload.nativeElement);
    }
    fileChange(file: FileList) {
        this.audioService.uploadAudio(file, this.audio.nativeElement)
    }

    changeLang(key: string) {
        this.translationService.changeTranslation(key);
    }
    listenIsShowSideBar() {
        this.store.select(getIsShowSideBar).subscribe(data => {
            this.sideBarStatus = data;
        })
    }

    openDialog() {
        this.dialog.open(AboutComponent);
    }

    toggleMenu() {
        this.store.dispatch(new SetSideBarStateAction(!this.sideBarStatus));
    }
}
