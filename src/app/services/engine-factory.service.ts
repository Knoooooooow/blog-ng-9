import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
    providedIn: 'root'
})
export class EngineFactoryService {

    private _cube: THREE.Mesh[] = [];

    constructor() { }

    createCubeFactory(params: CubeParams) {

        const geometry = new THREE.BoxGeometry(params.width, params.height, 10);
        const material = new THREE.MeshLambertMaterial({ color: params.color });

        for (let i = 0; i < params.num; i++) {
            this._cube.push(new THREE.Mesh(geometry, material));
            this.updatePosition(params,i)
        }

    }
    updatePosition(params: CubeParams,i) {
        this._cube[i].position.set(((params.startPositionX + params.width / 2 + (params.width * i)) + (i === 0 ? 0 : params.space * i)), params.startPositionY, 0);
    }

    get cube() {
        return this._cube;
    }
}
export interface CubeParams {
    num: number,
    startPositionX: number,
    startPositionY: number,
    space: number,
    width: number,
    height: number,
    color: any
}