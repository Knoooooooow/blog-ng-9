import { Injectable, NgZone, OnDestroy } from '@angular/core';

import * as THREE from 'three';
import { EngineFactoryService } from './engine-factory.service';
import { WindowService } from './window.service';

@Injectable({
    providedIn: 'root'
})
export class EngineService implements OnDestroy {

    private canvas: HTMLCanvasElement;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.OrthographicCamera;
    private scene: THREE.Scene;
    private light: THREE.AmbientLight;

    // private cube: THREE.Mesh;

    private frameId: number = null;


    public constructor(private ngZone: NgZone,
        private windowService: WindowService,
        private engineFactoryService: EngineFactoryService) {
    }

    public ngOnDestroy(): void {
        if (this.frameId != null) {
            this.windowService.cancelAnimationFrame(this.frameId);
        }
    }
    width
    height

    public createScene(canvas: HTMLCanvasElement, canvasContainerRef: HTMLElement): void {
        // The first step is to get the reference of the canvas element from our HTML document
        this.canvas = canvas;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,    // transparent background
            antialias: true // smooth edges
        });
        const canvasContainer = canvasContainerRef;
        this.width = canvasContainer.offsetWidth;
        this.height = canvasContainer.offsetHeight;
        this.renderer.setSize(this.width, this.height);

        // create the scene
        this.initScene();
        this.initCamera(this.width, this.height);
        this.initLight();
    }
    num = 1;
    space = 1;
    frustumSize = 1000;
    barWidth = 1;
    barHeight = 1;
    color = 0x00ff00;
    hasActiveAudio = false;
    play(audio) {
        if(!this.width || !this.hasActiveAudio){
            return ;
        }
        let context = new AudioContext();
        let source = context.createMediaElementSource(audio);
        let analyser = context.createAnalyser();
        source.connect(analyser);
        analyser.connect(context.destination);
        analyser.fftSize = 1024;
        let bufferLength = analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);
        let barWidth = this.width / bufferLength;
        let barHeight;
        
        this.barWidth = barWidth;
        this.num = bufferLength;
        let that = this;
        this.addCube();
        function renderFrame() {
            requestAnimationFrame(renderFrame);

            analyser.getByteFrequencyData(dataArray);

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];
                that.engineFactoryService.cube[i].scale.y = barHeight;

            }
        }
        renderFrame();
    }
    addCube() {
        this.engineFactoryService.createCubeFactory({
            num: this.num,
            startPositionX: this.width / -2,
            startPositionY: this.height / -2,
            space: this.space,
            width: this.barWidth,
            height: this.barHeight,
            color: this.color
        })

        for (let i = 0; i < this.num; i++) {
            this.scene.add(this.engineFactoryService.cube[i]);
        }
    }

    public animate(canvasContainerRef: HTMLElement): void {

        this.ngZone.runOutsideAngular(() => {
            if (document.readyState !== 'loading') {
                this.render();
            } else {
                this.windowService.domContentLoaded.subscribe(_ => {
                    this.render();
                });
            }
            this.windowService.resize.subscribe(_ => {
                this.resize(canvasContainerRef);
            })
        });

    }

    public render(): void {
        this.frameId = this.windowService.requestAnimationFrame(() => {
            this.render();
        });

        this.renderer.render(this.scene, this.camera);
    }
    
    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);
    }

    initCamera(width, height) {
        this.camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 100);
        this.camera.position.set(0, 0, 100);
        this.scene.add(this.camera);
    }
    initLight() {
        this.light = new THREE.AmbientLight(0x404040);
        this.light.position.z = 1;
        this.scene.add(this.light);
    }

    public resize(canvasContainerRef): void {

        this.width = canvasContainerRef.offsetWidth;
        this.height = canvasContainerRef.offsetHeight;
        
        this.updateCubePosition();

        this.camera.left = -this.width / 2;
        this.camera.right = this.width / 2;
        this.camera.top = this.height / 2;
        this.camera.bottom = -this.height / 2;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
    }
    updateCubePosition(){
        for (let i = 0; i < this.engineFactoryService.cube.length; i++) {
            this.engineFactoryService.updatePosition({
                num: this.num,
                startPositionX: this.width / -2,
                startPositionY: this.height / -2,
                space: this.space,
                width: this.barWidth,
                height: this.barHeight,
                color: this.color
            }, i)
        }
    }
}
