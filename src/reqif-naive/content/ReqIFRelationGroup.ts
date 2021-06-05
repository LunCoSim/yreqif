import { SpecRelation } from "./ReqIFSpecRelation";
import { RelationGroupType } from "../definitions/ReqIFSpecTypes";
import { SpecElementWithAttributes } from "./ReqIFSpecElementWithAttributes";

export interface  RelationGroup extends SpecElementWithAttributes {
    type: RelationGroupType;
    specRelations: SpecRelation[];

    // constructor() {
    //     super()

    //     this.type = new RelationGroupType();
    //     this.specRelations = [];        
    // }
}

