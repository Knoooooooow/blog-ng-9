// /*!
//  * @license
//  * Copyright 2019 Alfresco Software, Ltd.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *     http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { TranslateLoader } from '@ngx-translate/core';
// import { Observable, forkJoin, throwError, of } from 'rxjs';
// import { map, catchError, retry } from 'rxjs/operators';

// export class ComponentTranslationModel {
//     name: string;
//     path: string;
//     json: string[];

//     constructor(obj?: any) {
//         this.name = obj && obj.name;
//         this.path = obj && obj.path;
//         this.json = obj && obj.json || [];
//     }
// }
// export class ObjectUtils {
//     /**
//      * Gets a value from an object by composed key
//      * ObjectUtils.getValue({ item: { nodeType: 'cm:folder' }}, 'item.nodeType') ==> 'cm:folder'
//      * @param target
//      * @param key
//      */
//     static getValue(target: any, key: string): any {

//         if (!target) {
//             return undefined;
//         }

//         const keys = key.split('.');
//         key = '';

//         do {
//             key += keys.shift();
//             const value = target[key];
//             if (value !== undefined && (typeof value === 'object' || !keys.length)) {
//                 target = value;
//                 key = '';
//             } else if (!keys.length) {
//                 target = undefined;
//             } else {
//                 key += '.';
//             }
//         } while (keys.length);

//         return target;
//     }

//     static merge(...objects): any {
//         const result = {};

//         objects.forEach((source) => {
//             Object.keys(source).forEach((prop) => {
//                 if (prop in result && Array.isArray(result[prop])) {
//                     result[prop] = result[prop].concat(source[prop]);
//                 } else if (prop in result && typeof result[prop] === 'object') {
//                     result[prop] = ObjectUtils.merge(result[prop], source[prop]);
//                 } else {
//                     result[prop] = source[prop];
//                 }
//             });
//         });

//         return result;
//     }
// }

// @Injectable({
//     providedIn: 'root'
// })
// export class TranslateLoaderService implements TranslateLoader {

//     private prefix: string = 'i18n';
//     private suffix: string = '.json';
//     private providers: ComponentTranslationModel[] = [];
//     private queue: string[][] = [];
//     private defaultLang: string = 'en';

//     constructor(private http: HttpClient) {
//     }

//     setDefaultLang(value: string) {
//         this.defaultLang = value || 'en';
//     }

//     registerProvider(name: string, path: string) {
//         const registered = this.providers.find((provider) => provider.name === name);
//         if (registered) {
//             registered.path = path;
//         } else {
//             this.providers.push(new ComponentTranslationModel({ name: name, path: path }));
//         }
//     }

//     providerRegistered(name: string): boolean {
//         return this.providers.find((x) => x.name === name) ? true : false;
//     }

//     fetchLanguageFile(lang: string, component: ComponentTranslationModel, fallbackUrl?: string): Observable<void> {
//         const translationUrl = fallbackUrl || `${component.path}/${this.prefix}/${lang}${this.suffix}?v=${Date.now()}`;

//         return this.http.get(translationUrl).pipe(
//             map((res: Response) => {
//                 component.json[lang] = res;
//             }),
//             retry(3),
//             catchError(() => {
//                 if (!fallbackUrl && lang.includes('-')) {
//                     const [langId] = lang.split('-');

//                     if (langId && langId !== this.defaultLang) {
//                         const url = `${component.path}/${this.prefix}/${langId}${this.suffix}?v=${Date.now()}`;

//                         return this.fetchLanguageFile(lang, component, url);
//                     }
//                 }
//                 return throwError(`Failed to load ${translationUrl}`);
//             })
//         );
//     }

//     getComponentToFetch(lang: string): Array<Observable<any>> {
//         const observableBatch = [];
//         if (!this.queue[lang]) {
//             this.queue[lang] = [];
//         }
//         this.providers.forEach((component) => {
//             if (!this.isComponentInQueue(lang, component.name)) {
//                 this.queue[lang].push(component.name);

//                 observableBatch.push(
//                     this.fetchLanguageFile(lang, component)
//                 );
//             }
//         });

//         return observableBatch;
//     }

//     init(lang: string) {
//         if (this.queue[lang] === undefined) {
//             this.queue[lang] = [];
//         }
//     }

//     isComponentInQueue(lang: string, name: string) {
//         return (this.queue[lang] || []).find((x) => x === name) ? true : false;
//     }

//     getFullTranslationJSON(lang: string): any {
//         let result = {};

//         this.providers
//             .slice(0)
//             .sort((a, b) => {
//                 if (a.name === 'app') {
//                     return 1;
//                 }
//                 if (b.name === 'app') {
//                     return -1;
//                 }
//                 return a.name.localeCompare(b.name);
//             })
//             .forEach((model) => {
//                 if (model.json && model.json[lang]) {
//                     result = ObjectUtils.merge(result, model.json[lang]);
//                 }
//             });

//         return result;
//     }

//     getTranslation(lang: string): Observable<any> {
//         let hasFailures = false;
//         const batch = [
//             ...this.getComponentToFetch(lang).map((observable) => {
//                 return observable.pipe(
//                     catchError((error) => {
//                         console.warn(error);
//                         hasFailures = true;
//                         return of(error);
//                     })
//                 );
//             })
//         ];

//         return new Observable((observer) => {

//             if (batch.length > 0) {
//                 forkJoin(batch).subscribe(
//                     () => {
//                         const fullTranslation = this.getFullTranslationJSON(lang);
//                         if (fullTranslation) {
//                             observer.next(fullTranslation);
//                         }
//                         if (hasFailures) {
//                             observer.error('Failed to load some resources');
//                         } else {
//                             observer.complete();
//                         }
//                     },
//                     () => {
//                         observer.error('Failed to load some resources');
//                     });
//             } else {
//                 const fullTranslation = this.getFullTranslationJSON(lang);
//                 if (fullTranslation) {
//                     observer.next(fullTranslation);
//                     observer.complete();
//                 }
//             }
//         });
//     }
// }