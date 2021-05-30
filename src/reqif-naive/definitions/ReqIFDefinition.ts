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


export class AttributeDefinition extends AccessControlledElement {
    type?: SpecType;

    constructor(props?: AttributeDefinition) {
        super(props);
        if(props) {
            this.type = props['type'];
        }
    }
}


export class AttributeValue {
    // specElAt?: SpecElementWithAttributes[];
    // defaultValue?: AttributeDefinition;
    definition?: AttributeDefinition | DatatypeDefinition;

    constructor(props?: AttributeValue) {
        if(props) {
            this.definition = props['definition'];
        }
    }
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

export class AttributeDefinitionSimple extends AttributeDefinition {
    // definition?: AttributeValueSimple;
    // owningDefinition?: AttributeValueSimple;

    // constructor(props?: AttributeDefinitionSimple) {
    //     super(props);
    //     if(props) {
    //         this.definition = props['definition'];
    //         this.owningDefinition = props['owningDefinition'];
    //     }
    // }
}

export class  AttributeValueSimple extends AttributeValue {
    constructor(props?: AttributeValueSimple) {
        super(props);
    }
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

export class AttributeDefinitionInteger extends AttributeDefinitionSimple {
    definition?: AttributeValueInteger;
    owningDefinition?: AttributeValueInteger;

    constructor(props?: AttributeDefinitionInteger) {
        super(props);
        if(props) {
            this.definition = props['definition'];
            this.owningDefinition = props['owningDefinition'];
        }
    }
}

export class AttributeValueInteger extends AttributeValueSimple {
    theValue?: number;
    defaultValue?: AttributeDefinitionInteger;

    constructor(props?: AttributeValueInteger) {
        super(props);
        if(props) {
            this.theValue = props['theValue'];
            this.defaultValue = props['defaultValue'];
        }
    }
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

export class AttributeDefinitionString extends AttributeDefinitionSimple {
    definition?: AttributeValueString;
    owningDefinition?: AttributeValueString;

    constructor(props?: AttributeDefinitionString) {
        super(props);
        if(props) {
            this.definition = props['definition'];
            this.owningDefinition = props['owningDefinition'];
        }
    }
}

export class AttributeValueString extends AttributeValueSimple {
    theValue?: string;
    defaultValue?: AttributeDefinitionString;

    constructor(props?: AttributeValueString) {
        super(props);
        if(props) {
            this.theValue = props['theValue'];
            this.defaultValue = props['defaultValue'];
        }
    }
}



