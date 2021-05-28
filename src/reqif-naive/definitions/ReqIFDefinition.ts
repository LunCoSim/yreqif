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
    constructor(props?: DatatypeDefinitionSimple) {
        super(props);
    }
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

export class  DatatypeDefinitionXHTML extends DatatypeDefinition {
    constructor(props?: DatatypeDefinitionXHTML) {
        super(props);
    }
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

export class  DatatypeDefinitionEnumeration extends DatatypeDefinition {
    constructor(props?: DatatypeDefinitionEnumeration) {
        super(props);
    }
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

export class  DatatypeDefinitionBoolean extends DatatypeDefinitionSimple {
    constructor(props?: DatatypeDefinitionBoolean) {
        super(props);
    }
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

export class  DatatypeDefinitionDate extends DatatypeDefinitionSimple {
    constructor(props?: DatatypeDefinitionDate) {
        super(props);
    }
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

export class  DatatypeDefinitionInteger extends DatatypeDefinitionSimple {
    max?: number; //should be int
    min?: number; //should be int

    constructor(props?: DatatypeDefinitionInteger) {
        super(props);
        if(props) {
            this.max = props['max'];
            this.min = props['min'];
        }
    }
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

export class  DatatypeDefinitionReal extends DatatypeDefinitionSimple {
    accuracy?: number;//should be int
    max?: number;
    min?: number;

    constructor(props?: DatatypeDefinitionReal) {
        super(props);
        if(props) {
            this.accuracy = props['accuracy'];
            this.max = props['max'];
            this.min = props['min'];
        }
    }
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



