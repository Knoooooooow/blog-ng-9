import { Injectable } from '@angular/core';
import { EngineService } from 'src/app/services/engine.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AudioService {

    play = new Subject();
    pause = new Subject();

    activeAudio: HTMLAudioElement;

    constructor(private engServ: EngineService) { }


    chooseAudio(element: HTMLElement) {
        element.click();
    }

    uploadAudio(file: FileList, audio: HTMLAudioElement) {
        this.activeAudio = audio;
        this.activeAudio.src = URL.createObjectURL(file[0]);
        this.activeAudio.load();
        this.playAudio();
    }
    playAudio(isLoadVisualizer = true) {
        if (this.hasActiveAudio()) {
            this.activeAudio.play();
            if (isLoadVisualizer) {
                this.engServ.play(this.activeAudio);
            }
        }
    }
    changeAudioStatus(){
        if(this.isPlayingAudio()){
            this.activeAudio.pause();
        }else{
            this.activeAudio.play();
        }
    }
    isPlayingAudio(){
        return this.activeAudio && !this.activeAudio.paused;
    }
    hasActiveAudio() {
        return !!this.activeAudio;
    }
}
