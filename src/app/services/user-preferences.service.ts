import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserPreferencesService {

    default = {
        lang: 'zh-cn'
    }
    constructor() {
        const userLang = navigator.language;
        if (userLang) {
            this.default.lang = userLang;
        }
    }

}
