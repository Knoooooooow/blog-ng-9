import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { TranslateLoaderService } from './translate-loader.service';
import { UserPreferencesService } from './user-preferences.service';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {

    userLang: string;

    private _onLangChange = new Subject<any>();

    constructor(public translate: TranslateService,
        private translateLoaderService: TranslateLoaderService,
        private userPreferencesService: UserPreferencesService,
        private storageService: StorageService) {

        this.initTranslation();
    }

    /**
     * 初始化语言，在appComponent调用一次即可
     */
    initTranslation() {
        const storageLang = this.storageService.getItem('lang');
        if (storageLang) {
            this.translate.use(storageLang);
        } else if (this.userLang) {
            this.translate.use(this.userLang);
        } else {
            this.translate.use(this.userPreferencesService.userLang);
        }
    }

    /**
     * 获得语言的翻译JSON
     * @param lang 语言名称，和文件夹名同步
     */
    async getTranslationJSON(lang = this.userPreferencesService.userLang) {
        return await this.translateLoaderService.getTranslation(lang).toPromise();
    }

    /**
     * 切换语言
     * @param lang 切换的语言
     */
    changeTranslation(lang: string): void {
        this.userLang = lang;
        this.storageService.setItem('lang', lang);
        this.translate.use(lang);
        this._onLangChange.next(lang);
    }
    /**
     * 监听语言变更
     */
    listenTranslationChange(): Observable<string> {
        return this._onLangChange;
    }
    isUserLangChanged(): boolean {
        return this.storageService.hasItem('lang');
    }
}
