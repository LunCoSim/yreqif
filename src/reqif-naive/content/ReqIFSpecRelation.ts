import { SpecElementWithAttributes } from "./ReqIFSpecElementWithAttributes";
import { RelationGroup } from "./ReqIFRelationGroup";
import { SpecRelationType } from "../definitions/ReqIFSpecTypes";

export interface  SpecRelation extends SpecElementWithAttributes {
    type: SpecRelationType;
    specRelations: RelationGroup[];

    // constructor() {
    //     super();

    //     this.type = new SpecRelationType();
    //     this.specRelations = [];        
    // }
}

