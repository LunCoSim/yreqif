import * as _ from "lodash";
import { parse as fast_xml_parse} from "fast-xml-parser";
import { Identifiable } from "../reqif-naive/definitions/ReqIFBasicClasses";
import { AttributeDefinition, AttributeDefinitionInteger, AttributeValueInteger, DatatypeDefinition, DatatypeDefinitionEnumeration, DatatypeDefinitionInteger, DatatypeDefinitionString } from "../reqif-naive/definitions/ReqIFDefinition";
import { SpecificationType, SpecObjectType, SpecRelationType, SpecType } from "../reqif-naive/content/ReqIFSpecTypes";
import { SpecObject } from "../reqif-naive/content/ReqIFSpecObject";
import { SpecHierarchy, Specification } from "../reqif-naive/content/ReqIFSpecification";
import { ToArray } from "../utils";

import { AttributeDefinitionString } from "../reqif-naive/definitions/ReqIFDefinition"; 
import { AttributeValueString } from "../reqif-naive/definitions/ReqIFDefinition";
import { ReqIF } from "../reqif-naive/ReqIF";
import { ReqIFHeader } from "../reqif-naive/ReqIFHeader";
import { ReqIFContent } from "../reqif-naive/ReqIFContent";

//-------------------------------------

export function yparse(xml: string) {
    //parsing source
    const parsed_xml = fast_xml_parse(xml, {
        ignoreAttributes : false,
    });
    // console.log(parsed_xml['REQ-IF']['CORE-CONTENT']);

    return {
        source: parsed_xml,
        source_reqif: parsed_xml['REQ-IF'],

        source_header: parsed_xml['REQ-IF']['THE-HEADER']['REQ-IF-HEADER'],
        source_content: parsed_xml['REQ-IF']['CORE-CONTENT']['REQ-IF-CONTENT'],
        //content properties
        source_datatypes: parsed_xml['REQ-IF']['CORE-CONTENT']['REQ-IF-CONTENT']['DATATYPES'],
        source_specTypes: parsed_xml['REQ-IF']['CORE-CONTENT']['REQ-IF-CONTENT']['SPEC-TYPES'],
        source_specObjects: parsed_xml['REQ-IF']['CORE-CONTENT']['REQ-IF-CONTENT']['SPEC-OBJECTS'],
        source_specifications: parsed_xml['REQ-IF']['CORE-CONTENT']['REQ-IF-CONTENT']['SPECIFICATIONS'],
    }
}

//----------------------
//helper parser function

function getFirstElement<Type>(data: any [] | void) {
    if(data) {
        return data[0] as Type;
    }
}

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
        specAttributes: extractData(v["SPEC-ATTRIBUTES"])
    }
}

ExtractingFunctionsMap[SpecificationType.name] = (v: any): unknown => {
    return {
        specAttributes: extractData(v["SPEC-ATTRIBUTES"])
    }
}

//Spec objects
ExtractingFunctionsMap[SpecObject.name] = (v: any): unknown => {
    return {
        values: extractData(v["VALUES"]),
        // type: extractData(v["TYPE"])
    }
}

//Specification
ExtractingFunctionsMap[Specification.name] = (v: any): unknown => {
    return {
        values: extractData(v["VALUES"]),
        // type: extractData(v["TYPE"]),
        children: extractData(v["CHILDREN"])
    }
}

ExtractingFunctionsMap[AttributeDefinition.name] = (v: any): unknown => {
    return {
        type: getFirstElement<any>(extractData(v["TYPE"]))
    }
}

//------------------------

ExtractingFunctionsMap[ReqIF.name] = (v: any): unknown => {
    return {
        coreContent: getFirstElement<ReqIFContent>(extractData(v["CORE-CONTENT"])),
        theHeader: getFirstElement<ReqIFHeader>(extractData(v["THE-HEADER"])),
    }
}

ExtractingFunctionsMap[ReqIFHeader.name] = (v: any): unknown => {
    return {
        comment: v["COMMENT"],
        creationTime: v["CREATION-TIME"], //TODO: Parse date
        // repositoryId?: string; //[0..1] TODO
        reqIFToolId: v["REQ-IF-TOOL-ID"],
        reqIFVersion: v["REQ-IF-VERSION"],
        sourceToolId: v["SOURCE-TOOL-ID"],
        title: v["TITLE"],
    }
}

ExtractingFunctionsMap[ReqIFContent.name] = (v: any): unknown => {
    return {
        dataTypes: extractData(v["DATATYPES"]) as DatatypeDefinition[],
        specTypes: extractData(v["SPEC-TYPES"]) as SpecType[],
        specObjects: extractData(v["SPEC-OBJECTS"]) as SpecObject[],
        // specRelations: extractData<SpecRelations[]>(v["SPEC-RELATIONS"]),
        specifications: extractData(v["SPECIFICATIONS"]) as Specification[],
    }
}

//-------------
//Mapping 

const XMLMap: { [key: string]: any } = {
    //
    "REQ-IF": ReqIF,
    "REQ-IF-HEADER": ReqIFHeader,
    "REQ-IF-CONTENT": ReqIFContent,
    //Data types
    "DATATYPE-DEFINITION-STRING": DatatypeDefinitionString, 
    "DATATYPE-DEFINITION-INTEGER": DatatypeDefinitionInteger,
    "DATATYPE-DEFINITION-ENUMERATION": DatatypeDefinitionEnumeration,

    //Spec types
    "SPEC-OBJECT-TYPE": SpecObjectType, 
    "SPECIFICATION-TYPE": SpecificationType,
    "SPEC-RELATION-TYPE": SpecRelationType,
    
    //Spec objects
    "SPEC-OBJECT": SpecObject, 
    "SPEC-HIERARCHY": SpecHierarchy,
    "SPECIFICATION": Specification,

    //Attributes
    "ATTRIBUTE-DEFINITION-STRING": AttributeDefinitionString,
    "ATTRIBUTE-VALUE-STRING": AttributeValueString,

    "ATTRIBUTE-DEFINITION-INTEGER": AttributeDefinitionInteger,
    "ATTRIBUTE-VALUE-INTEGER": AttributeValueInteger,
}

const RefTypes: string[] = [
    "DATATYPE-DEFINITION-STRING-REF", 
    "SPECIFICATION-TYPE-REF",
    "SPEC-OBJECT-TYPE-REF",
    "DATATYPE-DEFINITION-INTEGER-REF"
]

//---------------------
//@param Type: 
//

let INDEX: {[key: string]: any} = {};

export function extractProps(classProto: any, data: any): unknown {
    if(!classProto) {
        return {};
    }

    if((Object.getPrototypeOf(classProto) == null) || (Object.getPrototypeOf(classProto) == undefined)) {
        return {};
    }
    // console.log('extractProps: ', classProto.name);

    var res = extractProps(Object.getPrototypeOf(classProto), data);

    Object.keys(classProto).forEach(key => console.log("", key));

    var extractingFunction = ExtractingFunctionsMap[classProto.name];

    if(extractingFunction != undefined) {
        var extracted = extractingFunction(data);
        
        res = Object.assign({}, res, extracted);
    }
    
    

    // console.log(res);
    // for(let key in Object.getOwnPropertyNames(res)) {
    //     console.log(key);
    // }
    return res;
}

function makeClassFromDate() {

}

function extractRef() {

}

export function extractData(source: any): any[] | void {
    if(source) {
        let firstClassName: string = Object.keys(source)[0]; 
        if(RefTypes.indexOf(firstClassName) != -1) { //checking for ref types!
            return [INDEX[source[firstClassName]]];
        } else {
            var res = Object.keys(source).map(function(className: string) {
                return ToArray(source[className]).map((data) => {
                    var mappedClass = XMLMap[className];
                    if(mappedClass) {
                        var temp = new mappedClass(extractProps(XMLMap[className], data));
        
                        if(temp instanceof Identifiable) {
                            INDEX[temp.identifier] = temp;
                        }
        
                        return temp;
                    } else {
                        console.error('***************** Class not found: ', className)
                    }
                    
                });
            });
            
            return _.flattenDeep(res);
        }
    }
    
}


export function extract(data: unknown) {
    INDEX = {};
    return getFirstElement<ReqIFHeader>(extractData(data));
}