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

import { sample_xml as sample_xml } from "./sample_xml";
import { parse } from "fast-xml-parser";
import { DatatypeDefinition, DatatypeDefinitionString, DatatypeDefinitionInteger, DatatypeDefinitionEnumeration } from "../src/reqif-naive/definitions/ReqIFDefinition";
import { SpecificationType, SpecObjectType, SpecType } from "../src/reqif-naive/content/ReqIFSpecTypes";
import { ToArray } from "../src/utils";
import { Identifiable } from "../src/reqif-naive/definitions/ReqIFBasicClasses";
import { SpecObject } from "../src/reqif-naive/content/ReqIFSpecObject";
import { Specification } from "../src/reqif-naive/content/ReqIFSpecification";

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


//DataTypes mapping

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

//----------------
//Spec Types

let SpecTypeMap: { [key: string]: any } = {
    "SPEC-OBJECT-TYPE": (v: any): SpecType => {
        return new SpecObjectType ({
            desc: v["@_DESC"],
            identifier: v["@_IDENTIFIER"],
            lastChange: v["@_LAST-CHANGED"],
            longName: v["@_LONG-NAME"],
            specAttributes: v["SPEC-ATTRIBUTES"]
        }); 
    }, 
    "SPECIFICATION-TYPE": (v: any): SpecType => {
        return new SpecificationType ({
            desc: v["@_DESC"],
            identifier: v["@_IDENTIFIER"],
            lastChange: v["@_LAST-CHANGED"],
            longName: v["@_LONG-NAME"],
            specAttributes: v["SPEC-ATTRIBUTES"]
        }); 
    },
}

//----------------
//Spec objects

let SpecObjectMap: { [key: string]: any } = {
    "SPEC-OBJECT": (v: any): SpecObject => {
        return new SpecObject ({
            desc: v["@_DESC"],
            identifier: v["@_IDENTIFIER"],
            lastChange: v["@_LAST-CHANGED"],
            longName: v["@_LONG-NAME"],
            values: v["VALUES"],
            type: v["TYPE"]
        }); 
    }, 

}

//----------------
//Specification
let SpecificationMap = {
    "SPECIFICATION": (v: any): Specification => {
        return new Specification({
            desc: v["@_DESC"],
            identifier: v["@_IDENTIFIER"],
            lastChange: v["@_LAST-CHANGED"],
            longName: v["@_LONG-NAME"],
            values: v["VALUES"],
            type: v["TYPE"],
            children: v["CHILDREN"]
        });
    },
    
};

//---------------------
function extractData<Type>(propsMap:{ [key: string]: any }, source: any): Type[] {
    let res =  Object.keys(source).map((key) => {
        return ToArray(source[key]).map(propsMap[key]);
    });

    return _.flattenDeep(res) as Type[];
}

//-------------Data types


let datatypes:DatatypeDefinition[] = extractData<SpecType>(DataTypeMap, source_datatypes);
let specTypes: SpecType[] = extractData<SpecType>(SpecTypeMap, source_specTypes);
let specObjects: SpecType[] = extractData<SpecType>(SpecObjectMap, source_specObjects);
let specifications: Specification[] = extractData<Specification>(SpecificationMap, source_specifications);


console.log("DataTypes: ", datatypes);
console.log("SpecTypes: ", specTypes);
console.log("SpecObjects: ", specObjects);
console.log("Specifications: ", specifications);