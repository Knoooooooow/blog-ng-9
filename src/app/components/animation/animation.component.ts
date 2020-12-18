import { Component, OnInit } from '@angular/core';
import { defaultAnimation } from 'src/app/animations/default-animation';

@Component({
    selector: 'app-animation',
    templateUrl: './animation.component.html',
    styleUrls: ['./animation.component.scss'],
    animations: [defaultAnimation]
})
export class AnimationComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
    isShowFadeInOut: boolean = true;
    changeIsShowFadeInOut() {
        this.isShowFadeInOut = !this.isShowFadeInOut;
    }
}
