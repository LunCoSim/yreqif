
import { SpecElementWithAttributes } from "../basic/ReqIFSpecElementWithAttributes";
import { RelationGroup } from "./ReqIFRelationGroup";
import { SpecObject } from "./ReqIFSpecObject";
import { SpecificationType } from "../definitions/ReqIFSpecTypes";

export class Specification extends SpecElementWithAttributes {
    type?: SpecificationType;
    // root?: SpecHierarchy;
    // sourceSpecification?: RelationGroup;
    // targetSpecificaiton?: RelationGroup;
    children?: SpecHierarchy[]; //ordered
    // coreContent?:todo
    constructor(props?:Specification) {
        super(props);
        if(props) {
            this.type = props['type'];
            // this.root = props['root']; 
            // this.sourceSpecification = props['sourceSpecification'];
            // this.targetSpecificaiton = props['targetSpecificaiton'];
            this.children = props['children'];
        }
    }
}

export class SpecHierarchy extends SpecElementWithAttributes {
    isTableInternal?: boolean;
    object?: SpecObject;
    parent?: SpecHierarchy;
    children?: SpecHierarchy[]; //ordered
    root?: Specification;

    constructor(props?:SpecHierarchy) {
        super(props);
        if(props) {
            this.isTableInternal = props['isTableInternal'];
            this.object = props['object']; 
            this.parent = props['parent'];
            this.children = props['children'];
            this.root = props['root'];
        }
    }
}
