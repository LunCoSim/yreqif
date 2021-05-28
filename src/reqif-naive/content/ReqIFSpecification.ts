
import { SpecElementWithAttributes } from "../definitions/ReqIFBasicClasses";
import { RelationGroup } from "./ReqIFRelationGroup";
import { SpecObject } from "./ReqIFSpecObject";
import { SpecificationType } from "./ReqIFSpecTypes";

export interface  Specification extends SpecElementWithAttributes {
    type: SpecificationType;
    root: SpecHierarchy;
    sourceSpecification: RelationGroup;
    targetSpecificaiton: RelationGroup;

    // constructor() {
    //     super();

    //     this.type = new SpecificationType();
    //     this.root = new SpecHierarchy();
    //     this.sourceSpecification = new RelationGroup();
    //     this.targetSpecificaiton = new RelationGroup();
    // }
}

export interface  SpecHierarchy extends SpecElementWithAttributes {
    isTableInternal: boolean;
    object: SpecObject;
    parent: SpecHierarchy;
    children: Specification[]; //ordered
    specObjects: SpecObject[];

    // constructor() {
    //     super()

    //     this.isTableInternal = false;
    //     this.object = new SpecObject();
    //     this.parent = new SpecHierarchy();
    //     this.children = []; //ordered
    //     this.specObjects = [];
    // }
}
