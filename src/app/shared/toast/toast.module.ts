import { NgModule, ModuleWithProviders } from '@angular/core'
import { OverlayModule } from '@angular/cdk/overlay';
import { ToastComponent } from './toast.component';
import { defaultToastConfig, TOAST_CONFIG_TOKEN } from './toast-config';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
    imports: [MaterialModule,OverlayModule],
    declarations: [ToastComponent],
    entryComponents: [ToastComponent]
})
export class ToastModule {
    public static forRoot(config = defaultToastConfig): ModuleWithProviders {
        return {
            ngModule: ToastModule,
            providers: [
                {
                    provide: TOAST_CONFIG_TOKEN,
                    useValue: { ...config },
                },
            ],
        };
    }
}