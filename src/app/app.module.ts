import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtensionsService } from './services/extensions.service';
import { HttpClientModule } from '@angular/common/http';
import { AppStoreModule } from './store/app-store.module';
import { ToastModule } from 'src/app/shared/toast/toast.module';
import { MaterialModule } from 'src/app/material.module';

import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderService } from './services/translate-loader.service';
import { AboutComponent } from './dialogs/about/about.component';


export function setupExtensions(appExtensionService: ExtensionsService): Function {
    return () => appExtensionService.load();
}

const entryComponents = [AboutComponent];
@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppStoreModule,
        MaterialModule,
        ToastModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: TranslateLoaderService
            }
        })
    ],
    declarations: [
        AppComponent,
        ...entryComponents
    ],
    entryComponents:[...entryComponents],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: setupExtensions,
            deps: [ExtensionsService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
