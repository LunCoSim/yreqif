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

import * as _ from "lodash";

import { sample_xml } from "./sample_xml";
import { parse } from "fast-xml-parser";
import { DatatypeDefinition, DatatypeDefinitionString, DatatypeDefinitionInteger, DatatypeDefinitionEnumeration } from "../src/reqif-naive/definitions/ReqIFDefinition";
import { SpecType } from "../src/reqif-naive/content/ReqIFSpecTypes";
import { ToArray } from "../src/utils";
import { Identifiable } from "../src/reqif-naive/definitions/ReqIFBasicClasses";

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




let DataTypeMap: { [key: string]: any } = {
    "DATATYPE-DEFINITION-STRING": (v: any): DatatypeDefinition => {
        return new DatatypeDefinitionString ({
            desc: v["@_DESC"],
            identifier: v["@_IDENTIFIER"],
            lastChange: v["@_LAST-CHANGED"],
            longName: v["@_LONG-NAME"],
            maxLength: v["@_MAX-LENGTH"]
        }); 
    }, 
    "DATATYPE-DEFINITION-INTEGER": (v: any): DatatypeDefinition => {
        return new DatatypeDefinitionInteger ({
            desc: v["@_DESC"],
            identifier: v["@_IDENTIFIER"],
            lastChange: v["@_LAST-CHANGED"],
            longName: v["@_LONG-NAME"],
        }); 
    },
    "DATATYPE-DEFINITION-ENUMERATION": (v: any): DatatypeDefinition => {
        return new DatatypeDefinitionEnumeration ({
            desc: v["@_DESC"],
            identifier: v["@_IDENTIFIER"],
            lastChange: v["@_LAST-CHANGED"],
            longName: v["@_LONG-NAME"],
        }); 
    },
}

//-------------Data types
let datatypes:DatatypeDefinition[] = [];

function extractDatatype(type: any) {
    const definition = Object.keys(type)[0] as string;
    if(definition != undefined) {
        return ToArray(type[definition]).map(DataTypeMap[definition]);
    }
}

datatypes = _.flatten(ToArray(source_datatypes).map(extractDatatype)) as DatatypeDefinition[];

console.log("DataTypes: ", datatypes);

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