import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { DynamicComponent } from '../dynamic/dynamic.component';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {


    @ViewChild('DynamicComponent') DynamicComponent: DynamicComponent;

    constructor(private toastService: ToastService) { }

    ngOnInit(): void {
    }
    index: number = 0;
    showToast() {
        this.toastService.show({ type: 'success' });
    }
    createDynamicComponent() {
        this.DynamicComponent.createComponent();
    }
    destoryDynamicComponent() {
        this.DynamicComponent.destoryComponent();
    }
}
