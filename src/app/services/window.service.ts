import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WindowService {

    public resize = new Subject();
    constructor() {
        window.addEventListener('resize', (data) => {
            this.resize.next(data);
        });
    }


    get innerWidth(){
        return window.innerWidth;
    }
    get innerHeight(){
        return window.innerHeight;
    }
}
