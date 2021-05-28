import { AttributeDefinition } from "../definitions/ReqIFDefinition";
import { Identifiable } from "../definitions/ReqIFBasicClasses";
import { RelationGroup } from "./ReqIFRelationGroup";
import { Specification } from "./ReqIFSpecification";
import { SpecObject } from "./ReqIFSpecObject";
import { SpecRelation } from "./ReqIFSpecRelation";

//------------------------------------------------------------------------------

export interface  SpecType extends Identifiable {
    specAttributes: AttributeDefinition[];

    // constructor() {
    //     super()

    //     this.specAttributes = []
    // }
}

export interface  SpecificationType extends SpecType {
    specification: Specification[];

    // constructor() {
    //     super()

    //     this.specification = [];
    // }
}

export interface  SpecObjectType extends SpecType {
    specObject: SpecObject[];

    // constructor() {
    //     super();

    //     this.specObject = [];
    // }
}

export interface  SpecRelationType extends SpecType {
    specRelation: SpecRelation[];

    // constructor() {
    //     super();

    //     this.specRelation = [];
    // }
}

export interface  RelationGroupType extends SpecType {
    relationGroup: RelationGroup[];

    // constructor() {
    //     super();

    //     this.relationGroup = [];
    // }
}