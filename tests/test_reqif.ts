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

import { Specification } from "../src/reqif-naive/content/ReqIFSpecification";
import { SpecObject } from "../src/reqif-naive/content/ReqIFSpecObject";
import { SpecObjectType, SpecType } from "../src/reqif-naive/content/ReqIFSpecTypes";
import { DatatypeDefinition } from "../src/reqif-naive/definitions/ReqIFDefinition";
import { extractData, yparse } from "../src/yreqif/yparser";

import { sample_xml as sample_xml } from "./sample_xml";


//-------------Data types

let datatypes: DatatypeDefinition[];
let specTypes: SpecType[];
let specObjects: SpecObjectType[];
let specifications: Specification[];

let data = yparse(sample_xml);

datatypes = extractData<DatatypeDefinition>(data.source_datatypes);
specTypes = extractData<SpecType>(data.source_specTypes);
specObjects = extractData<SpecObject>(data.source_specObjects);
specifications = extractData<Specification>(data.source_specifications);

// // let specRelations: SpecRelation[] = extractData<SpecRelation>(GeneralMap, so);
// // let specRelationsGroup: RelationGroup[] = extractData<RelationGroup>(GeneralMap, source_specifications);

console.log("DataTypes: ", datatypes);
console.log("SpecTypes: ", specTypes);
// console.log("SpecObjects: ", specObjects);
console.log("Specifications: ", specifications);

