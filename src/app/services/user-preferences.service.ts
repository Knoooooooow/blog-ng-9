import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserPreferencesService {

    private _default = {
        lang: 'zh-CN'
    }
    constructor() {
        const userLang = navigator.language;
        if (userLang) {
            this._default.lang = userLang;
        }
    }
    get userLang(){
        return this._default.lang;
    }
}
