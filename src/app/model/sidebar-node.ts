export interface SideBarNode {
    id: string
    order: number,
    icon: string,
    title: string,
    description: string,
    route: string,
    children?: SideBarNode[];
}