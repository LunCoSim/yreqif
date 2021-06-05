//SpecElementWithAttributes


/*----------------------------------------------------------------------------
All children of DataType
----------------------------------------------------------------------------*/
import { DatatypeDefinition, 
    DatatypeDefinitionBoolean, 
    DatatypeDefinitionDate, 
    DatatypeDefinitionEnumeration, 
    DatatypeDefinitionInteger, 
    DatatypeDefinitionReal, 
    DatatypeDefinitionString, 
    DatatypeDefinitionXHTML } from "../reqif-naive/definitions/ReqIFDefinition";

export const DataTypes: any[] = [//TODO: Find something better then any
    DatatypeDefinitionXHTML,
    DatatypeDefinitionEnumeration,
    DatatypeDefinitionBoolean,
    DatatypeDefinitionDate,
    DatatypeDefinitionInteger,
    DatatypeDefinitionReal,
    DatatypeDefinitionString,
];

/*----------------------------------------------------------------------------
All children of SpecType
----------------------------------------------------------------------------*/
import { SpecificationType, 
    SpecObjectType, 
    SpecRelationType, 
    SpecType,
    RelationGroupType
} from "../reqif-naive/content/ReqIFSpecTypes";

export const SpecTypes: any[] = [//TODO: Find something better then any
    SpecificationType,
    SpecObjectType,
    SpecRelationType,
    RelationGroupType,
];

/*----------------------------------------------------------------------------
All children of SpecType
----------------------------------------------------------------------------*/
