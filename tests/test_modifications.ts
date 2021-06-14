//Should create every Datatype

import { Specification } from "../src/reqif-naive/content/ReqIFSpecification";
import { SpecObject } from "../src/reqif-naive/content/ReqIFSpecObject";
import { DatatypeDefinitionInteger } from "../src/reqif-naive/definitions/ReqIFDatatypeDefinition";
import { SpecificationType } from "../src/reqif-naive/definitions/ReqIFSpecTypes";
import { yReqIF } from "../src/yreqif/yreqif";

const yreqif = new yReqIF();

const dt_integer = new DatatypeDefinitionInteger();
const specObject = new SpecObject();

const specificationType = new SpecificationType();
const specification = new Specification();

yreqif.create(dt_integer);
yreqif.create(specificationType);
yreqif.create(specObject);
yreqif.create(specification);


function toJSON(obj: object) {
    return JSON.stringify(obj, null, 4)
}
// console.log();
// console.log(JSON.stringify(specificationType, null, 4));

console.log(yreqif.to_JSON());