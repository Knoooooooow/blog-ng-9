import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtensionsService } from './services/extensions.service';
import { HttpClientModule } from '@angular/common/http';
import { AppStoreModule } from './store/app-store.module';
import { ToastModule } from 'src/app/shared/toast/toast.module';
import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderService } from './services/translate-loader.service';


export function setupExtensions(appExtensionService: ExtensionsService): Function {
    return () => appExtensionService.load();
}
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppStoreModule,
        ToastModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: TranslateLoaderService
            }
        })
    ],
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
