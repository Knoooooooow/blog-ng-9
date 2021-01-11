import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EngineService } from 'src/app/services/engine.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

    @ViewChild('canvasContainer', { static: true })
    public canvasContainer: ElementRef<HTMLDivElement>;

    @ViewChild('rendererCanvas', { static: true })
    public rendererCanvas: ElementRef<HTMLCanvasElement>;

    constructor(private engServ: EngineService) {

    }

    ngOnInit(): void {
        
        setTimeout(() => {
            this.engServ.createScene(this.rendererCanvas.nativeElement, this.canvasContainer.nativeElement);
            this.engServ.animate(this.canvasContainer.nativeElement);
        });
    }

}
