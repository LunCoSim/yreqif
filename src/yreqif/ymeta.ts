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
    RelationGroupType
} from "../reqif-naive/definitions/ReqIFSpecTypes";

export const SpecTypes: any[] = [//TODO: Find something better then any
    SpecificationType,
    SpecObjectType,
    SpecRelationType,
    RelationGroupType,
];

/*---------------------------------------------------------------------------
Attributes
----------------------------------------------------------------------------*/

