import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TreeBaseNode } from './models/tree-base.model';

import { ApiService } from 'src/app/services/api.service';
import { TreeViewDataSource } from './data/tree-view-datasource';

@Component({
    selector: 'app-flat-tree',
    templateUrl: './flat-tree.component.html',
    styleUrls: ['./flat-tree.component.scss']
})
export class FlatTreeComponent implements OnInit {

    @Input()
    nodeId: string = 'root';

    @Output()
    nodeClicked: EventEmitter<TreeBaseNode> = new EventEmitter();

    @Output()
    error: EventEmitter<any> = new EventEmitter();

    treeControl: FlatTreeControl<TreeBaseNode>;
    dataSource: TreeViewDataSource;

    constructor(private apiService: ApiService) {
        this.treeControl = new FlatTreeControl<TreeBaseNode>(this.getLevel, this.isExpandable);
        this.dataSource = new TreeViewDataSource(this.treeControl, this.apiService);
    }

    ngOnInit() {
        this.loadTreeNode();
    }

    onNodeClicked(node: TreeBaseNode) {
        this.nodeClicked.emit(node);
    }

    getLevel = (node: TreeBaseNode) => node.level;

    isExpandable = (node: TreeBaseNode) => node.expandable;

    hasChild = (_: number, nodeData: TreeBaseNode) => nodeData.expandable;

    private loadTreeNode() {
        this.apiService.getTreeNodes(this.nodeId)
            .subscribe(
                (treeNode: TreeBaseNode[]) => {
                    this.dataSource.data = treeNode;
                },
                (error) => this.error.emit(error)
            );
    }

}
