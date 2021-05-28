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

import { sample_xml1 as sample_xml } from "./sample_xml";
import { parse } from "fast-xml-parser";
import { DatatypeDefinition, DatatypeDefinitionString, DatatypeDefinitionInteger, DatatypeDefinitionEnumeration } from "../src/reqif-naive/definitions/ReqIFDefinition";
import { SpecificationType, SpecObjectType, SpecType } from "../src/reqif-naive/content/ReqIFSpecTypes";
import { ToArray } from "../src/utils";
import { Identifiable } from "../src/reqif-naive/definitions/ReqIFBasicClasses";
import { SpecObject } from "../src/reqif-naive/content/ReqIFSpecObject";
import { Specification } from "../src/reqif-naive/content/ReqIFSpecification";

//parsing source
const parsed_xml = parse(sample_xml, {
    ignoreAttributes : false,
});

//Loading raw data from parsed xml
const source_reqif = parsed_xml['REQ-IF'];

const source_header = source_reqif['THE-HEADER']['REQ-IF-HEADER'];
const source_content = source_reqif['CORE-CONTENT']['REQ-IF-CONTENT'];
//content properties
const source_datatypes = source_content['DATATYPES'];
const source_specTypes = source_content['SPEC-TYPES'];
const source_specObjects = source_content['SPEC-OBJECTS'];
const source_specifications = source_content['SPECIFICATIONS'];


//Mapping classes to values from XML

let ExtractingFunctionsMap: {[key: string]: any} = {};

ExtractingFunctionsMap[Identifiable.name] = (v: any): unknown => {
    return {
        desc: v["@_DESC"],
        identifier: v["@_IDENTIFIER"],
        lastChange: v["@_LAST-CHANGED"],
        longName: v["@_LONG-NAME"],
    }
}

ExtractingFunctionsMap[DatatypeDefinitionString.name] = (v: any): unknown => {
    return {
        maxLength: v["@_MAX-LENGTH"]
    };
}

ExtractingFunctionsMap[DatatypeDefinitionInteger.name] = (v: any): unknown => {
    return {
        // maxLength: v["@_MAX-LENGTH"]
    }
}

ExtractingFunctionsMap[DatatypeDefinitionEnumeration.name] = (v: any): unknown => {
    return {
        // maxLength: v["@_MAX-LENGTH"]
    }
}

//Spec Types
ExtractingFunctionsMap[SpecObjectType.name] = (v: any): unknown => {
    return {
        specAttributes: v["SPEC-ATTRIBUTES"]
    }
}

ExtractingFunctionsMap[SpecificationType.name] = (v: any): unknown => {
    return {
        specAttributes: v["SPEC-ATTRIBUTES"]
    }
}

//Spec objects
ExtractingFunctionsMap[SpecObject.name] = (v: any): unknown => {
    return {
        values: v["VALUES"],
        type: v["TYPE"]
    }
}

//Specification
ExtractingFunctionsMap[SpecObject.name] = (v: any): unknown => {
    return {
        values: v["VALUES"],
        type: v["TYPE"],
        children: v["CHILDREN"]
    }
}

//-------------
//Mapping 

const XMLMap: { [key: string]: any } = {
    "DATATYPE-DEFINITION-STRING": DatatypeDefinitionString, 
    "DATATYPE-DEFINITION-INTEGER": DatatypeDefinitionInteger,
    "DATATYPE-DEFINITION-ENUMERATION": DatatypeDefinitionEnumeration,

    //Spec Types
    "SPEC-OBJECT-TYPE": SpecObjectType, 
    "SPECIFICATION-TYPE": SpecificationType,

//Spec objects
    "SPEC-OBJECT": SpecObject, 

//Specification
    "SPECIFICATION": Specification,
}

//---------------------
//@param Type: 
//

Identifiable.prototype 
function extractProps(classProto: any, data: any): unknown {
    console.log('extractProps: ', classProto.name);

    if(Object.getPrototypeOf(classProto) == null) {
        return {};
    }
    
    var res = extractProps(Object.getPrototypeOf(classProto), data);
    
    var extractingFunction = ExtractingFunctionsMap[classProto.name];

    if(extractingFunction != undefined) {
        res = Object.assign({}, res, extractingFunction(data));
    }

    return res;
}

function extractData<Type>(source: any): Type[] {
    var res = Object.keys(source).map(function(className) {
        return ToArray(source[className]).map((data) => {
            return new XMLMap[className](extractProps(XMLMap[className], data))
        });
    });

    return _.flattenDeep(res) as Type[];
}

//-------------Data types

let datatypes: DatatypeDefinition[];
let specTypes: SpecType[];
let specObjects: SpecType[];
let specifications: Specification[];

datatypes = extractData<DatatypeDefinition>(source_datatypes);

// let specTypes: SpecType[] = extractData<SpecType>(GeneralMap, source_specTypes);
// let specObjects: SpecType[] = extractData<SpecType>(GeneralMap, source_specObjects);
// let specifications: Specification[] = extractData<Specification>(GeneralMap, source_specifications);
// // let specRelations: SpecRelation[] = extractData<SpecRelation>(GeneralMap, so);
// // let specRelationsGroup: RelationGroup[] = extractData<RelationGroup>(GeneralMap, source_specifications);

console.log("DataTypes: ", datatypes);
// console.log("SpecTypes: ", specTypes);
// console.log("SpecObjects: ", specObjects);
// console.log("Specifications: ", specifications);

