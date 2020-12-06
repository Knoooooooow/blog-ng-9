import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { TranslationModel } from '../model/translation.model';

@Injectable({
    providedIn: 'root'
})
export class TranslateLoaderService implements TranslateLoader {

    private cache: TranslationModel[] = [];
    private prefix: string = 'i18n';
    private suffix: string = '.json';
    private defaultFolder: string = 'assets';

    constructor(private http: HttpClient) {
    }


    registerCache(lang: string, json) {
        const registered = this.cache.find((provider) => provider.lang === lang);
        if (!registered) {
            this.cache.push(new TranslationModel({ lang: lang, json: json }));
        }
    }
    cacheRegistered(lang: string): boolean {
        return this.cache.find((x) => x.lang === lang) ? true : false;
    }

    getTranslation(lang: string): Observable<any> {
        return this.getFullTranslationJSON(lang);
    }



    fetchLanguageFile(lang: string): Observable<any> {
        const translationUrl = `${this.defaultFolder}/${this.prefix}/${lang}${this.suffix}?v=${Date.now()}`;
        return this.http.get(translationUrl).pipe(map(data => {
            if (!this.cacheRegistered(lang)) {
                this.cache.push(new TranslationModel({ lang: lang, json: data }))
            }
        }));
    }
    getFullTranslationJSON(lang: string): Observable<any> {
        if (this.cacheRegistered(lang)) {
            return of(this.cache.find((x) => x.lang === lang).json);
        } else {
            const translationUrl = `${this.defaultFolder}/${this.prefix}/${lang}${this.suffix}?v=${Date.now()}`;
            return this.http.get(translationUrl);
        }
    }

}
