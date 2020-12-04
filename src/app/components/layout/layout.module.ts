import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from 'src/app/material.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainComponent } from '../main/main.component';
import { ShowComponent } from '../show/show.component';
import { DynamicComponent } from '../dynamic/dynamic.component';
import { LeetcodeComponent } from '../leetcode/leetcode.component';
import { FlatTreeComponent } from '../flat-tree/flat-tree.component';
import { TranslateModule } from '@ngx-translate/core';
// import { CoreModule } from 'src/app/shared/core.module';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'index',
                component: MainComponent
            },{
                path: 'show',
                component: ShowComponent
            },{
                path: 'tree',
                component: FlatTreeComponent
            },{
                path: 'leetcode',
                component: LeetcodeComponent
            },{
                path: '',
                redirectTo: `index`,
                pathMatch: 'full'
            }
        ]
    }
]

@NgModule({
    declarations: [
        LayoutComponent,
        NavBarComponent,
        SideBarComponent,
        MainComponent,
        ShowComponent,
        DynamicComponent,
        LeetcodeComponent,
        FlatTreeComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild()
    ],
    exports: [LayoutComponent]
})
export class AppLayoutModule { }
