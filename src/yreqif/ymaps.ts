import { AccessControlledElement, 
    Identifiable
} from "../reqif-naive/basic/ReqIFBasicClasses";
import { AttributeValue, 
    AttributeValueInteger, 
    AttributeValueSimple, 
} from "../reqif-naive/definitions/ReqIFAttributeValue";
import { AttributeDefinition, 
    AttributeDefinitionInteger, 
    AttributeDefinitionSimple, 
    AttributeDefinitionString, 
    SpecificationType, 
    SpecObjectType, 
    SpecRelationType, 
    SpecType 
} from "../reqif-naive/definitions/ReqIFSpecTypes";
import { DatatypeDefinition, 
    DatatypeDefinitionEnumeration, 
    DatatypeDefinitionInteger, 
    DatatypeDefinitionSimple, 
    DatatypeDefinitionString 
} from "../reqif-naive/definitions/ReqIFDatatypeDefinition";
import { SpecObject } from "../reqif-naive/content/ReqIFSpecObject";
import { SpecHierarchy, 
    Specification 
} from "../reqif-naive/content/ReqIFSpecification";
import { AttributeValueString } from "../reqif-naive/definitions/ReqIFAttributeValue";
import { ReqIFHeader } from "../reqif-naive/ReqIFHeader";
import { ReqIFContent } from "../reqif-naive/ReqIFContent";
import { ReqIF } from "../reqif-naive/ReqIF";

import { extractData, 
    getFirstElement 
} from "./yparser";
import { SpecElementWithAttributes } from "../reqif-naive/basic/ReqIFSpecElementWithAttributes";


/*
------------------------------------------------------------------------------
Defining functions that knows how to extract data for particular class from
parsed XML data
------------------------------------------------------------------------------
*/

export let ExtractingFunctionsMap: {[key: string]: any} = {};

//Initialisation is done in that manner because values of Class.name propertys are calculated at runtime
ExtractingFunctionsMap[Identifiable.name] = (v: any): unknown => {
    return {
        desc: v["@_DESC"],
        identifier: v["@_IDENTIFIER"],
        lastChange: v["@_LAST-CHANGED"],
        longName: v["@_LONG-NAME"],
    }
}

ExtractingFunctionsMap[AccessControlledElement.name] = (v: any): unknown => {
    return {
        isEditable: v["IS-EDITABLE"],
    }
}

ExtractingFunctionsMap[DatatypeDefinition.name] = (v: any): unknown => {
    return;
}

ExtractingFunctionsMap[DatatypeDefinitionSimple.name] = (v: any): unknown => {
    return;
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

//Spec types

ExtractingFunctionsMap[SpecType.name] = (v: any): unknown => {
    return {
        specAttributes: extractData(v["SPEC-ATTRIBUTES"])
    }
}

ExtractingFunctionsMap[SpecObjectType.name] = (v: any): unknown => {
    return {};
}

ExtractingFunctionsMap[SpecificationType.name] = (v: any): unknown => {
    return {};
}

ExtractingFunctionsMap[SpecRelationType.name] = (v: any): unknown => {
    return {};
}

//Spec objects

ExtractingFunctionsMap[SpecElementWithAttributes.name] = (v: any): unknown => {
    return {
        values: extractData(v["VALUES"]),
    }
}

ExtractingFunctionsMap[SpecObject.name] = (v: any): unknown => {
    return {
        type: getFirstElement<any>(extractData(v["TYPE"])),
    }
}

ExtractingFunctionsMap[SpecHierarchy.name] = (v: any): unknown => {
    return {
        object: getFirstElement<any>(extractData(v["OBJECT"])),
        children: extractData(v["CHILDREN"])
    //     isTableInternal?: boolean;
    // object?: SpecObject;
    // parent?: SpecHierarchy;
    // children?: SpecHierarchy[]; //ordered
    // root?: Specification;
    }
}

//Specification
ExtractingFunctionsMap[Specification.name] = (v: any): unknown => {
    return {
        type: getFirstElement<any>(extractData(v["TYPE"])),
        children: extractData(v["CHILDREN"])
    }
}

//Attribute definition
ExtractingFunctionsMap[AttributeDefinition.name] = (v: any): unknown => {
    return {
        type: getFirstElement<any>(extractData(v["TYPE"]))
    }
}

ExtractingFunctionsMap[AttributeDefinitionSimple.name] = (v: any): unknown => {
    return;
}

ExtractingFunctionsMap[AttributeDefinitionString.name] = (v: any): unknown => {
    return {};
}

ExtractingFunctionsMap[AttributeDefinitionInteger.name] = (v: any): unknown => {
    return {};
}

//Attribute values

ExtractingFunctionsMap[AttributeValue.name] = (v: any): unknown => {
    return {
        definition: getFirstElement<any>(extractData(v["DEFINITION"]))
    };
}

ExtractingFunctionsMap[AttributeValueSimple.name] = (v: any): unknown => {
    return;
}

ExtractingFunctionsMap[AttributeValueString.name] = (v: any): unknown => {
    return {
        theValue: v["@_THE-VALUE"]
    };
}

ExtractingFunctionsMap[AttributeValueInteger.name] = (v: any): unknown => {
    return {
        theValue: parseInt(v["@_THE-VALUE"])
    };
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

/*
------------------------------------------------------------------------------
Mapping classes to values from XML
------------------------------------------------------------------------------
*/

export const XMLMap: { [key: string]: any } = {
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

/*
------------------------------------------------------------------------------
List of ref types
------------------------------------------------------------------------------
*/

export const RefTypes: string[] = [
    "DATATYPE-DEFINITION-STRING-REF", 
    "SPECIFICATION-TYPE-REF",
    "SPEC-OBJECT-TYPE-REF",
    "DATATYPE-DEFINITION-INTEGER-REF",
    "ATTRIBUTE-DEFINITION-STRING-REF",
    "ATTRIBUTE-DEFINITION-INTEGER-REF",
    "SPEC-OBJECT-REF"
]