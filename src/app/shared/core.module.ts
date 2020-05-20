// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ModuleWithProviders } from '@angular/compiler/src/core';
// import { TranslateStore, TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateLoaderService } from '../services/translate-loader.service';
// // import { TranslationService } from '../services/translation.service';



// @NgModule({
//     declarations: [],
//     imports: [
//         CommonModule,
//         TranslateModule
//     ], exports: [
//         CommonModule,
//         TranslateModule
//     ]
// })
// export class CoreModule {
//     static forRoot(): ModuleWithProviders {
//         return {
//             ngModule: CoreModule,
//             providers: [
//                 TranslateStore,
//                 TranslateService,
//                 { provide: TranslateLoader, useClass: TranslateLoaderService }

//             ]
//         };
//     }
//     static forChild(): ModuleWithProviders {
//         return {
//             ngModule: CoreModule
//         };
//     }
//     // constructor(translation: TranslationService) {
//     //     translation.addTranslationFolder('en', 'assets/i18n');
//     // }
// }
