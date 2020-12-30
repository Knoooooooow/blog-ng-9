import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from 'src/app/material.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainComponent } from '../main/main.component';
import { InputComponent } from '../input/input.component';
import { ShowComponent } from '../show/show.component';
import { DynamicComponent } from '../dynamic/dynamic.component';
import { LeetcodeComponent } from '../leetcode/leetcode.component';
import { FlatTreeComponent } from '../flat-tree/flat-tree.component';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationComponent } from '../animation/animation.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'index',
                component: MainComponent,
                data: { animationName: 'AnimationRoute1' }
            }, {
                path: 'show',
                component: ShowComponent,
                data: { animationName: 'AnimationRoute2' }
            }, {
                path: 'tree',
                component: FlatTreeComponent,
                data: { animationName: 'AnimationRoute3' }
            }, {
                path: 'leetcode',
                component: LeetcodeComponent,
                data: { animationName: 'AnimationRoute4' }
            }, {
                path: 'animation',
                component: AnimationComponent,
                data: { animationName: 'AnimationRoute5' }
            }
            , {
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
        InputComponent,
        ShowComponent,
        DynamicComponent,
        LeetcodeComponent,
        FlatTreeComponent,
        AnimationComponent
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
