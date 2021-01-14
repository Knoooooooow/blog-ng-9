import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AudioService {

    play = new Subject();

    constructor() { }


    playAudio(data) {
        this.play.next(data);
    }

}
