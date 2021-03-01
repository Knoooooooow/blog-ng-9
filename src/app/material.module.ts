import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import {
    MatDialogModule,
    MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material/dialog';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatRippleModule,
        MatMenuModule,
        MatFormFieldModule,
        MatSliderModule,
        MatSidenavModule,
        MatTreeModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatRadioModule,
        MatTooltipModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule
    ],
    exports: [
        MatToolbarModule,
        MatToolbarModule,
        MatRippleModule,
        MatMenuModule,
        MatFormFieldModule,
        MatSliderModule,
        MatSidenavModule,
        MatTreeModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatRadioModule,
        MatTooltipModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule
    ],
    providers: [
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: { closeOnNavigation: true, hasBackdrop: true, autoFocus: true }
        }
    ]
})
export class MaterialModule { }
