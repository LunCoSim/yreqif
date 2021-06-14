//Should create every Datatype

import { Specification } from "../src/reqif-naive/content/ReqIFSpecification";
import { SpecObject } from "../src/reqif-naive/content/ReqIFSpecObject";
import { DatatypeDefinitionInteger } from "../src/reqif-naive/definitions/ReqIFDatatypeDefinition";
import { SpecificationType, SpecObjectType } from "../src/reqif-naive/definitions/ReqIFSpecTypes";
import { yReqIF } from "../src/yreqif/yreqif";

const yreqif = new yReqIF();

const dt_integer = new DatatypeDefinitionInteger();
const specObject = new SpecObject();

const specObjectType = new SpecObjectType();

const specificationType = new SpecificationType();
const specification = new Specification();

let yObjects = [dt_integer, specObject, specObjectType, specificationType, specification];

yObjects.map((v) => yreqif.create(v));

console.log("Created new objects: ");
console.log(yreqif.to_JSON());

yObjects.map((v) => yreqif.delete(v));

console.log("After deleting: ");
console.log(yreqif.to_JSON());
