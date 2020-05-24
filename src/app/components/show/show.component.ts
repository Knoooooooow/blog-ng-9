import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

    constructor(private toastService: ToastService) { }

    ngOnInit(): void {
    }
    index: number = 0;
    showToast() {
        this.toastService.show({type:'success'});
    }

}
