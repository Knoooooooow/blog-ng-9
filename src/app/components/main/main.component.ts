import { AudioService } from './../../services/audio.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EngineService } from 'src/app/services/engine.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy {

    @ViewChild('canvasContainer', { static: true })
    public canvasContainer: ElementRef<HTMLDivElement>;

    @ViewChild('rendererCanvas', { static: true })
    public rendererCanvas: ElementRef<HTMLCanvasElement>;


    private _onDestory = new Subject<boolean>();


    constructor(private engServ: EngineService, private audioService: AudioService) {

    }


    ngOnInit(): void {
        setTimeout(() => {
            this.engServ.createScene(this.rendererCanvas.nativeElement, this.canvasContainer.nativeElement);
            this.engServ.animate(this.canvasContainer.nativeElement);
        });
        this.audioService.play.pipe(takeUntil(this._onDestory)).subscribe(data => {

        })
    }

    ngOnDestroy() {
        this._onDestory.next(true);
        this._onDestory.complete();
    }
}
