class Node {
    id: string;
    name: string;
    constructor(node) {
        this.id = node.id;
        this.name = node.name;
    }
}
export class TreeBaseNode {

    id: string;
    name: string;
    level: number;
    expandable = true;
    node: Node;

    constructor(node: Node, level?: number, expandable?: boolean) {
        this.id = node.id;
        this.name = node.name;
        this.level = level ? level : 0;
        this.expandable = expandable ? expandable : true;
        this.node = node ? new Node(node) : undefined;

    }
}