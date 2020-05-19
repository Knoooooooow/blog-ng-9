import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { ExtensionsService } from 'src/app/services/extensions.service';
import { SideBarNode } from 'src/app/model/sidebar-node';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

    treeControl = new NestedTreeControl<SideBarNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<SideBarNode>();
    node: any;
    constructor(private router: Router, private extensionsService: ExtensionsService) {
        this.dataSource.data = this.extensionsService.appSidebarRoute();
    }

    hasChild = (_: number, node: SideBarNode) => !!node.children && node.children.length > 0;

    ngOnInit() {

    }
    redirectTo(node: SideBarNode, e?: Event) {
        if (node && node.route) {
            this.router.navigate([node.route]);
        }

        if (e) {
            e.stopPropagation();
        }

    }

}
