import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WindowService {

    public resize = new Subject();
    public domContentLoaded = new Subject();
    constructor() {
        window.addEventListener('resize', (data) => {
            this.resize.next(data);
        });
        window.addEventListener('DOMContentLoaded', (data) => {
            this.domContentLoaded.next(data);
        });
    }

    
    get innerWidth(){
        return window.innerWidth;
    }
    get innerHeight(){
        return window.innerHeight;
    }

    get requestAnimationFrame(){
        return window.requestAnimationFrame;
    }
    get cancelAnimationFrame(){
        return window.cancelAnimationFrame;
    }
}
