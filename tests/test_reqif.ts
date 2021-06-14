/*to run type:
Seems like tsc caches files and doesn't rebuild files unles resaved in case of automatic path change while moving files from
pne dir into another
//tsc test_reqif.ts -outDir ./build/
//node ./build/test_reqif.js 
*/

/*
To use fast xml parser on local machine
1. install globally using 
npm install -g fast-xml-parser
2. npm link fast-xml-parser
*/

import { yparse, extract } from "../src/yreqif/yparser";

import { sample_xml, sample_xml1, sample_xml2 } from "./sample_xml";

let data = yparse(sample_xml1); //sample_xml2 is not supported yet

let yreqif = extract(data);

//Output parsed structure
console.log(yreqif.to_JSON());

// //Should create every Datatype

// import { Specification } from "../src/reqif-naive/content/ReqIFSpecification";
// import { SpecObject } from "../src/reqif-naive/content/ReqIFSpecObject";
// import { DatatypeDefinitionInteger } from "../src/reqif-naive/definitions/ReqIFDatatypeDefinition";
// import { SpecificationType } from "../src/reqif-naive/definitions/ReqIFSpecTypes";
// import { yReqIF } from "../src/yreqif/yreqif";

// const yreqif = new yReqIF();

// const dt_integer = new DatatypeDefinitionInteger();
// const specObject = new SpecObject();

// const specificationType = new SpecificationType();
// const specification = new Specification();

// yreqif.create(dt_integer);
// yreqif.create(specificationType);
// yreqif.create(specObject);
// yreqif.create(specification);


// function toJSON(obj: object) {
//     return JSON.stringify(obj, null, 4)
// }
// // console.log();
// // console.log(JSON.stringify(specificationType, null, 4));

// console.log(yreqif.to_JSON());