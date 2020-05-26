import { Injectable } from '@angular/core';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlatTreeControl } from '@angular/cdk/tree';
import { TreeBaseNode } from '../models/tree-base.model';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class TreeViewDataSource {

    treeNodes: TreeBaseNode[];
    dataChange = new BehaviorSubject<TreeBaseNode[]>([]);
    childrenSubscription = null;
    changeSubscription = null;

    get data(): TreeBaseNode[] {
        return this.treeNodes;
    }

    set data(value: TreeBaseNode[]) {
        this.treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    constructor(private treeControl: FlatTreeControl<TreeBaseNode>,
        private apiService: ApiService) {
        this.dataChange.subscribe((treeNodes) => this.treeNodes = treeNodes);
    }

    connect(collectionViewer: CollectionViewer): Observable<TreeBaseNode[]> {
        this.changeSubscription = this.treeControl.expansionModel.changed.subscribe((change) => {
            if ((change as SelectionChange<TreeBaseNode>).added &&
                (change as SelectionChange<TreeBaseNode>).added.length > 0) {
                this.expandTreeNodes(change as SelectionChange<TreeBaseNode>);
            } else if ((change as SelectionChange<TreeBaseNode>).removed) {
                this.reduceTreeNodes(change as SelectionChange<TreeBaseNode>);
            }
        });
        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    }

    disconnect() {
        if (this.childrenSubscription) {
            this.childrenSubscription.unsubscribe();
        }
        if (this.changeSubscription) {
            this.changeSubscription.unsubscribe();
        }
    }

    private expandTreeNodes(change: SelectionChange<TreeBaseNode>) {
        change.added.forEach((node) => this.expandNode(node));
    }

    private reduceTreeNodes(change: SelectionChange<TreeBaseNode>) {
        change.removed.slice().reverse().forEach((node) => this.toggleNode(node));
    }

    private expandNode(node: TreeBaseNode) {
        this.childrenSubscription = this.apiService.getTreeNodes(node)
            .subscribe((children) => {
                const index = this.data.indexOf(node);
                if (!children || index < 0) {
                    node.expandable = false;
                    return;
                }
                const nodes = children.map((actualNode) => {
                    actualNode.level = node.level + 1;
                    return actualNode;
                });
                this.data.splice(index + 1, 0, ...nodes);
                this.dataChange.next(this.data);
            });
    }

    toggleNode(node: TreeBaseNode) {
        const index = this.data.indexOf(node);
        let count = 0;
        for (let i = index + 1; i < this.data.length
            && this.data[i].level > node.level; i++, count++) { }
        this.data.splice(index + 1, count);
        this.dataChange.next(this.data);
    }

}
