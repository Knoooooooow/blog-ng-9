import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { TreeBaseNode } from '../components/flat-tree/models/tree-base.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor() { }


    getTreeNodes(id) {
        const mockData = [
            { id: '1', name: '模拟数据1' },
            { id: '2', name: '模拟数据2' },
            { id: '2', name: '模拟数据3' },
        ]
        return of(mockData).pipe(map((nodes: TreeBaseNode[]) => nodes.map(
            (node) => new TreeBaseNode(node)
        )
        ))
    }
}
