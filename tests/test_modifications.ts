//Should create every Datatype

import { Specification } from "../src/reqif-naive/content/ReqIFSpecification";
import { SpecObject } from "../src/reqif-naive/content/ReqIFSpecObject";
import { DatatypeDefinitionInteger, IDatatypeDefinitionInteger } from "../src/reqif-naive/definitions/ReqIFDatatypeDefinition";
import { SpecificationType, SpecObjectType } from "../src/reqif-naive/definitions/ReqIFSpecTypes";
import { IReqIFHeader } from "../src/reqif-naive/ReqIFHeader";
import { yReqIF } from "../src/yreqif/yreqif";

const yreqif = new yReqIF();

const dt_integer = new DatatypeDefinitionInteger({
    longName: "Basic integer"
});

const specObject = new SpecObject();

const specObjectType = new SpecObjectType();

const specificationType = new SpecificationType();
const specification = new Specification();

let yObjects = [dt_integer, specObject, specObjectType, specificationType, specification];

//Creating 
yObjects.map((v) => yreqif.create(v));

console.log("Created new objects: ");
console.log(yreqif.to_JSON());

//Updating
let upd: IDatatypeDefinitionInteger = {
    identifier: dt_integer.identifier,
    longName: "111"
};

yreqif.update(upd);

yreqif.update({
    identifier: yreqif.reqif.theHeader.identifier,
    comment: "asdasds"
} as IReqIFHeader);

console.log("Created new objects: ");
console.log(yreqif.to_JSON());

//Deleting

yObjects.map((v) => yreqif.delete(v));

console.log("After deleting: ");
console.log(yreqif.to_JSON());
