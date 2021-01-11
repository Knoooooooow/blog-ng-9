import { Injectable, NgZone, OnDestroy } from '@angular/core';

import * as THREE from 'three';
import { WindowService } from './window.service';

@Injectable({
    providedIn: 'root'
})
export class EngineService implements OnDestroy {

    private canvas: HTMLCanvasElement;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private light: THREE.AmbientLight;

    private cube: THREE.Mesh;

    private frameId: number = null;

    public constructor(private ngZone: NgZone, private windowService: WindowService) {
    }

    public ngOnDestroy(): void {
        if (this.frameId != null) {
            cancelAnimationFrame(this.frameId);
        }
    }

    public createScene(canvas: HTMLCanvasElement, canvasContainerRef: HTMLElement): void {
        // The first step is to get the reference of the canvas element from our HTML document
        this.canvas = canvas;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,    // transparent background
            antialias: true // smooth edges
        });
        const canvasContainer = canvasContainerRef;
        const width = canvasContainer.offsetWidth;
        const height = canvasContainer.offsetHeight;
        this.renderer.setSize(width, height);

        // create the scene
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75, width / height, 0.1, 1000
        );
        this.camera.position.z = 5;
        this.scene.add(this.camera);

        // soft white light
        this.light = new THREE.AmbientLight(0x404040);
        this.light.position.z = 10;
        this.scene.add(this.light);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

    }

    public animate(canvasContainerRef: HTMLElement): void {
        const width = canvasContainerRef.offsetWidth;
        const height = canvasContainerRef.offsetHeight;
        
        // We have to run this outside angular zones,
        // because it could trigger heavy changeDetection cycles.
        this.ngZone.runOutsideAngular(() => {
            if (document.readyState !== 'loading') {
                this.render();
            } else {
                window.addEventListener('DOMContentLoaded', () => {
                    this.render();
                });
            }
            this.windowService.resize.subscribe(data => {
                this.resize(width, height);
            })
        });
    }

    public render(): void {
        this.frameId = requestAnimationFrame(() => {
            this.render();
        });

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
    }

    public resize(width, height): void {

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }
}
