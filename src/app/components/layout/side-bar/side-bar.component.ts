import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
const sideBarData =[
    {
        name: '模拟倒计时',
        route: 'index'
    }
]
export interface SideBarNode {
    name: string;
    route?: string,
    children?: SideBarNode[];
}
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

    treeControl = new NestedTreeControl<SideBarNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<SideBarNode>();
    node:any;
    constructor(private router:Router) {
        this.dataSource.data = sideBarData;
    }

    hasChild = (_: number, node: SideBarNode) => !!node.children && node.children.length > 0;

    ngOnInit() {

    }
    redirectTo(node:SideBarNode,e?:Event) {
        if(node && node.route){
            this.router.navigate([node.route]);
        }
        
        if(e){
            e.stopPropagation();
        }
        
    }

}
