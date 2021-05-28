import { SpecType } from "../content/ReqIFSpecTypes";
import { AccessControlledElement, Identifiable, SpecElementWithAttributes } from "./ReqIFBasicClasses";

/*
------------------------------------------------------------------------------
Basic abstract interface es
------------------------------------------------------------------------------
*/

export class  DatatypeDefinition extends Identifiable {
    constructor(props?: DatatypeDefinition) {
        super(props);
    }
}


export interface  AttributeDefinition extends AccessControlledElement {
    specType: SpecType;

    // constructor(specType?: SpecType) {
    //     super();
    //     // this.spectype = specType;
    // }
}


export interface  AttributeValue {
    specElAt: SpecElementWithAttributes[];
    defaultValue?: AttributeDefinition;

    // constructor() {
    //     this.specElAt = [];
    // }
}

/*
------------------------------------------------------------------------------
Simple interface 
------------------------------------------------------------------------------
*/

export class  DatatypeDefinitionSimple extends DatatypeDefinition {
    // constructor() {
    //     super();
        
    // }
}

export interface  AttributeDefinitionSimple extends AttributeDefinition {
    definition: AttributeValueSimple;
    owningDefinition?: AttributeValueSimple;

    // constructor(definition?:AttributeValueSimple) {
    //     super();
    //     this.definition = definition || new AttributeValueSimple();
    // }
}

export interface  AttributeValueSimple extends AttributeValue {
    dummy?: string; //ToDO find a better way to baypass issue
}

/*
------------------------------------------------------------------------------
Types definition
------------------------------------------------------------------------------
*/

//-----------
//XHTML

export interface  DatatypeDefinitionXHTML extends DatatypeDefinition {
    type: AttributeDefinitionXHTML;

    // constructor() {
    //     super();
        
    // }
}

export interface  AttributeDefinitionXHTML extends AttributeDefinition {
    definition: AttributeValueXHTML;
    owningDefinition?: AttributeValueXHTML;

    // constructor(definition?:AttributeValueXHTML) {
    //     super();
    //     this.definition = definition || new AttributeValueXHTML();
    // }
}

export interface  AttributeValueXHTML extends AttributeValue {
    isSimplified: boolean;
    defaultValue?: AttributeDefinitionXHTML;

    attributeValue?: XhtmlContent;
}

export interface  XhtmlContent {
    theValue: string;
    theOriginalValue: string;
}

//-----------
//Enumeration

export interface  DatatypeDefinitionEnumeration extends DatatypeDefinition {
    type: AttributeDefinitionEnumeration;

    // constructor() {
    //     super();
        
    // }
}

export interface  AttributeDefinitionEnumeration extends AttributeDefinition {
    multiValued?: boolean//Dafult false
    
    definition: AttributeValueEnumeration;
    owningDefinition?: AttributeValueEnumeration;

}

export interface  AttributeValueEnumeration extends AttributeValue {
    defaultValue?: AttributeDefinitionEnumeration;
    values: EnumValue[];//default []
}

export interface  EnumValue {
    values?: AttributeValueEnumeration;
    specifiedValues?: DatatypeDefinitionEnumeration[];//ordered
    enumValue?: EmbeddedValue
}

export interface  EmbeddedValue {
    key: number;
    otherContent: string;//should be link to other content
}

//----------
//Boolean

export interface  DatatypeDefinitionBoolean extends DatatypeDefinitionSimple {
    type: AttributeDefinitionBoolean;
}

export interface  AttributeDefinitionBoolean extends AttributeDefinitionSimple {
    definition: AttributeValueBoolean;
    owningDefinition?: AttributeValueBoolean;
}

export interface  AttributeValueBoolean extends AttributeValueSimple {
    theValue: boolean;
    defaultValue?: AttributeDefinitionBoolean;
}

//---------
//Date

export interface  DatatypeDefinitionDate extends DatatypeDefinitionSimple {
    type: AttributeDefinitionDate;
}

export interface  AttributeDefinitionDate extends AttributeDefinitionSimple {
    definition: AttributeValueDate;
    owningDefinition?: AttributeValueDate;
}

export interface  AttributeValueDate extends AttributeValueSimple {
    theValue: Date;
    defaultValue?: AttributeDefinitionDate;
}

//---------
//Integer

export interface  DatatypeDefinitionInteger extends DatatypeDefinitionSimple {
    max: number; //should be int
    min: number; //should be int
}

export interface  AttributeDefinitionInteger extends AttributeDefinitionSimple {
    definition: AttributeValueInteger;
    owningDefinition?: AttributeValueInteger;
}

export interface  AttributeValueInteger extends AttributeValueSimple {
    theValue: number;
    defaultValue?: AttributeDefinitionInteger;
}


//---------
//Real

export interface  DatatypeDefinitionReal extends DatatypeDefinitionSimple {
    accuracy: number;//should be int
    max: number;
    min: number;
}

export interface  AttributeDefinitionReal extends AttributeDefinitionSimple {
    definition: AttributeValueReal;
    owningDefinition?: AttributeValueReal;
}

export interface  AttributeValueReal extends AttributeValueSimple {
    theValue: number;
    defaultValue?: AttributeDefinitionReal;
}

//---------
//String

export class  DatatypeDefinitionString extends DatatypeDefinitionSimple {
    maxLength?: number; //should be int
    constructor(props?: DatatypeDefinitionString) {
        super(props);
        if(props) {
            this.maxLength = props['maxLength'];
        }
    }
}

export interface  AttributeDefinitionString extends AttributeDefinitionSimple {
    definition: AttributeValueString;
    owningDefinition?: AttributeValueString;

}

export interface  AttributeValueString extends AttributeValueSimple {
    theValue: string;
    defaultValue?: AttributeDefinitionString;
}



