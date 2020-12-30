import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentFactory,
    ComponentRef,
    OnDestroy
} from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
    selector: 'app-dynamic-component',
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit, OnDestroy {

    @ViewChild("alertContainer", { static: false, read: ViewContainerRef }) container: ViewContainerRef;
    constructor(private resolver: ComponentFactoryResolver) { }

    componentRef: ComponentRef<any>;
    ngOnInit() {
    }
    createComponent() {
        this.container.clear();
        const factory: ComponentFactory<any> =
            this.resolver.resolveComponentFactory(InputComponent);
        this.componentRef = this.container.createComponent(factory);
    }
    private componentCreated(): boolean {
        return !!this.componentRef && !!this.componentRef.instance;
    }
    destoryComponent() {
        if (this.componentCreated()) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
    ngOnDestroy() {
        if (this.componentCreated()) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
}
