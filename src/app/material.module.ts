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
        MatInputModule
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
        MatInputModule
    ]
})
export class MaterialModule { }
