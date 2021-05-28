import { SpecElementWithAttributes } from "../definitions/ReqIFBasicClasses";
import { RelationGroup } from "./ReqIFRelationGroup";
import { SpecRelationType } from "./ReqIFSpecTypes";

export interface  SpecRelation extends SpecElementWithAttributes {
    type: SpecRelationType;
    specRelations: RelationGroup[];

    // constructor() {
    //     super();

    //     this.type = new SpecRelationType();
    //     this.specRelations = [];        
    // }
}

