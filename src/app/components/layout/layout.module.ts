import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from 'src/app/material.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { IndexComponent } from '../index/index.component';
// import { CoreModule } from 'src/app/shared/core.module';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'index',
                component: IndexComponent
            },
            {
                path: '',
                redirectTo: `index`,
                pathMatch: 'full'
            }
        ]
    }
]

@NgModule({
    declarations: [LayoutComponent, NavBarComponent, SideBarComponent],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        // CoreModule.forChild()
    ],
    exports: [LayoutComponent]
})
export class AppLayoutModule { }
