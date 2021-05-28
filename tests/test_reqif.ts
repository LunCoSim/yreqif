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

import { sample_xml } from "./sample_xml";
import { parse } from "fast-xml-parser";
import { DatatypeDefinitionString } from "../src/reqif-naive/definitions/ReqIFDefinition";
import { SpecType } from "../src/reqif-naive/content/ReqIFSpecTypes";
import { ToArray } from "../src/utils";

// import { ReqIF } from "./reqif-naive/ReqIF"

// const r = new ReqIF();


const j = parse(sample_xml, {
    ignoreAttributes : false,
});

const source_reqif = j['REQ-IF'];
const source_header = source_reqif['THE-HEADER']['REQ-IF-HEADER'];
const source_content = source_reqif['CORE-CONTENT']['REQ-IF-CONTENT'];
//content properties
const source_datatypes = source_content['DATATYPES'];
const source_specTypes = source_content['SPEC-TYPES'];
const source_specObjects = source_content['SPEC-OBJECTS'];
const source_specifications = source_content['SPECIFICATIONS'];




// let DataTypeMap = {
//     "DATATYPE-DEFINITION-STRING": function(v: unknown) {
//         return {
//             desc: v["@_DESC"],
//             identifier: v["@_IDENTIFIER"],
//             lastChange: v["@_LAST-CHANGED"],
//             longName: v["@_LONG-NAME"],
//             maxLength: v["@_MAX-LENGTH"]
//         } as DatatypeDefinitionString
//     }
// }

//-------------Data types
const datatypes:DatatypeDefinitionString[] = [];

ToArray(source_datatypes).map((dt) => {
    console.log(dt);
    if(dt['DATATYPE-DEFINITION-STRING'] != undefined) {
        ToArray(dt['DATATYPE-DEFINITION-STRING']).map((v) => {
            datatypes.push({
                desc: v["@_DESC"],
                identifier: v["@_IDENTIFIER"],
                lastChange: v["@_LAST-CHANGED"],
                longName: v["@_LONG-NAME"],
                maxLength: v["@_MAX-LENGTH"]
            } as DatatypeDefinitionString);
        })
    } else if(dt['DATATYPE-DEFINITION-INTEGER'] != undefined) {
        //
    } else if(dt['DATATYPE-DEFINITION-ENUMERATION'] != undefined) {
        //
    }
});

console.log(datatypes);

//----------------



const specTypes: SpecType[] = [];

ToArray(source_specTypes).map((dt) => {
    console.log(dt);
    if(dt['SPEC-OBJECT-TYPE'] != undefined) {
        ToArray(dt['SPEC-OBJECT-TYPE']).map((v) => {
            specTypes.push({
                identifier: v['@_IDENTIFIER'],
                longName: v['@_LONG-NAME'],
                specAttributes: []
            } as SpecType);
        })
    } else if(dt['SPECIFICATION-TYPE'] != undefined) {
        ToArray(dt['SPECIFICATION-TYPE']).map((v) => {
            specTypes.push({
                identifier: v['@_IDENTIFIER'],
                longName: v['@_LONG-NAME'],
                specAttributes: []
            } as SpecType);
        })
    } else if(dt[''] != undefined) {
        //
    }
});

console.log(specTypes);