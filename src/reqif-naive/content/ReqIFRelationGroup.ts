import { SpecElementWithAttributes } from "../definitions/ReqIFBasicClasses";
import { SpecRelation } from "./ReqIFSpecRelation";
import { RelationGroupType } from "./ReqIFSpecTypes";

export interface  RelationGroup extends SpecElementWithAttributes {
    type: RelationGroupType;
    specRelations: SpecRelation[];

    // constructor() {
    //     super()

    //     this.type = new RelationGroupType();
    //     this.specRelations = [];        
    // }
}

