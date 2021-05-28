import { SpecType } from "./content/ReqIFSpecTypes"
import { SpecObject } from "./content/ReqIFSpecObject"
import { SpecRelation } from "./content/ReqIFSpecRelation"
import { Specification } from "./content/ReqIFSpecification"
import { RelationGroup } from "./content/ReqIFRelationGroup"
import { DatatypeDefinition } from "./definitions/ReqIFDefinition"

export interface  ReqIFContent {
    dataTypes: DatatypeDefinition[];
    specTypes: SpecType[];
    specObjects: SpecObject[];
    specRelations: SpecRelation[];
    specifications: Specification[];
    specRelationsGroup: RelationGroup[];

    // constructor() {
    //     this.dataTypes = [];
    //     this.specTypes = [];
    //     this.specObjects = [];
    //     this.specRelations = [];
    //     this.specifications = [];
    //     this.specRelationsGroup = [];
    // }
}