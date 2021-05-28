import { AttributeDefinition } from "../definitions/ReqIFDefinition";
import { Identifiable } from "../definitions/ReqIFBasicClasses";
import { RelationGroup } from "./ReqIFRelationGroup";
import { Specification } from "./ReqIFSpecification";
import { SpecObject } from "./ReqIFSpecObject";
import { SpecRelation } from "./ReqIFSpecRelation";

//------------------------------------------------------------------------------

export class SpecType extends Identifiable {
    specAttributes?: AttributeDefinition[];

    constructor(props?: SpecType) {
        super(props);
        if(props) {
            this.specAttributes = props['specAttributes'];
        }
    }
}

export class  SpecificationType extends SpecType {
    specification?: Specification[];

    constructor(props?: SpecificationType) {
        super(props);
        if(props) {
            this.specification = props['specification'];
        }
    }
}

export class  SpecObjectType extends SpecType {
    specObject?: SpecObject[];

    constructor(props?: SpecObjectType) {
        super(props);
        if(props) {
            this.specObject = props['specObject'];
        }
    }
}

export class  SpecRelationType extends SpecType {
    specRelation?: SpecRelation[];

    constructor(props?: SpecRelationType) {
        super(props);
        if(props) {
            this.specRelation = props['specRelation'];
        }
    }
}

export interface  RelationGroupType extends SpecType {
    relationGroup: RelationGroup[];

    // constructor() {
    //     super();

    //     this.relationGroup = [];
    // }
}