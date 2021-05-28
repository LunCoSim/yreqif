
import { SpecElementWithAttributes } from "../definitions/ReqIFBasicClasses";
import { SpecHierarchy } from "./ReqIFSpecification";
import { SpecRelation } from "./ReqIFSpecRelation";
import { SpecObjectType } from "./ReqIFSpecTypes";

//------------------------------------------------------------------------------

export interface  SpecObject extends SpecElementWithAttributes {
    type: SpecObjectType;
    object: SpecHierarchy;
    source: SpecRelation; //Global shared object, maybe in external source e.g. wikipedia 
    target: SpecRelation; //Global shared object, maybe in external source e.g. wikipedia 

    // constructor() {
    //     super();
        
    //     this.type = new SpecObjectType();
    //     this.object = new SpecHierarchy();
    //     this.source = new SpecRelation(); //Global shared object, maybe in external source e.g. wikipedia 
    //     this.target = new SpecRelation(); //Global shared object, maybe in external source e.g. wikipedia 

    // }
}