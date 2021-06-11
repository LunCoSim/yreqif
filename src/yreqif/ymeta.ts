/*----------------------------------------------------------------------------
All subclasses of DataType
----------------------------------------------------------------------------*/
import { DatatypeDefinitionBoolean, 
    DatatypeDefinitionDate, 
    DatatypeDefinitionEnumeration, 
    DatatypeDefinitionInteger, 
    DatatypeDefinitionReal, 
    DatatypeDefinitionString, 
    DatatypeDefinitionXHTML } from "../reqif-naive/definitions/ReqIFDatatypeDefinition";

export const DataTypes: any[] = [//TODO: Find something better then any
    DatatypeDefinitionXHTML,
    DatatypeDefinitionEnumeration,
    DatatypeDefinitionBoolean,
    DatatypeDefinitionDate,
    DatatypeDefinitionInteger,
    DatatypeDefinitionReal,
    DatatypeDefinitionString,
];

/*---------------------------------------------------------------------------
All subclasses of SpecType
----------------------------------------------------------------------------*/
import { SpecificationType, 
    SpecObjectType, 
    SpecRelationType, 
    RelationGroupType,
} from "../reqif-naive/definitions/ReqIFSpecTypes";

export const SpecTypes: any[] = [//TODO: Find something better then any
    SpecificationType,
    SpecObjectType,
    SpecRelationType,
    RelationGroupType,
];

import { AttributeDefinition, 
    // AttributeDefinitionBoolean, 
    // AttributeDefinitionDate, 
    AttributeDefinitionInteger, 
    // AttributeDefinitionReal, 
    AttributeDefinitionString, 
    // AttributeDefinitionXHTML, 
    // AttributeValueEnumeration 
} from "../reqif-naive/definitions/ReqIFSpecTypes";

export const AttributeDefinitions: any[] = [//TODO: Find something better then any
    AttributeDefinition, 
    // AttributeDefinitionBoolean, 
    // AttributeDefinitionDate, 
    AttributeDefinitionInteger, 
    // AttributeDefinitionReal, 
    AttributeDefinitionString, 
    // AttributeDefinitionXHTML, 
    // AttributeValueEnumeration 
];

/*---------------------------------------------------------------------------
Elements with attributs, subclasses of SpecElementWithAttributes
----------------------------------------------------------------------------*/
import { RelationGroup } from "../reqif-naive/content/ReqIFRelationGroup";
import { SpecHierarchy, 
    Specification 
} from "../reqif-naive/content/ReqIFSpecification";
import { SpecObject } from "../reqif-naive/content/ReqIFSpecObject";
import { SpecRelation } from "../reqif-naive/content/ReqIFSpecRelation";

export const ElementsWithAttributes: any[] = [//TODO: Find something better then any
    RelationGroup,
    Specification,
    SpecHierarchy,
    SpecObject,
    SpecRelation,
];