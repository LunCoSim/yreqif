import * as _ from "lodash";
import { parse as fast_xml_parse} from "fast-xml-parser";
import { Identifiable } from "../reqif-naive/definitions/ReqIFBasicClasses";
import { DatatypeDefinitionEnumeration, DatatypeDefinitionInteger, DatatypeDefinitionString } from "../reqif-naive/definitions/ReqIFDefinition";
import { SpecificationType, SpecObjectType, SpecRelationType } from "../reqif-naive/content/ReqIFSpecTypes";
import { SpecObject } from "../reqif-naive/content/ReqIFSpecObject";
import { Specification } from "../reqif-naive/content/ReqIFSpecification";
import { ToArray } from "../utils";


//-------------------------------------

export function yparse(xml: string) {
    //parsing source
    const parsed_xml = fast_xml_parse(xml, {
        ignoreAttributes : false,
    });
    console.log(parsed_xml);

    return {
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
    "SPEC-RELATION-TYPE": SpecRelationType,
    
//Spec objects
    "SPEC-OBJECT": SpecObject, 

//Specification
    "SPECIFICATION": Specification,
}

//---------------------
//@param Type: 
//

export function extractProps(classProto: any, data: any): unknown {
    if(!classProto) {
        return {};
    }

    if((Object.getPrototypeOf(classProto) == null) || (Object.getPrototypeOf(classProto) == undefined)) {
        return {};
    }
    // console.log('extractProps: ', classProto.name);

    var res = extractProps(Object.getPrototypeOf(classProto), data);
    
    var extractingFunction = ExtractingFunctionsMap[classProto.name];

    if(extractingFunction != undefined) {
        res = Object.assign({}, res, extractingFunction(data));
    }

    return res;
}

export function extractData<Type>(source: any): Type[] {
    var res = Object.keys(source).map(function(className) {
        return ToArray(source[className]).map((data) => {
            var clas = XMLMap[className];
            if(clas) {
                return new XMLMap[className](extractProps(XMLMap[className], data))
            } else {
                console.error('Class: ', className, ' not found')
            }
            
        });
    });

    return _.flattenDeep(res) as Type[];
}