/*---------------------------------------------------------------------------
Abstract interface es
----------------------------------------------------------------------------*/
import { Identifiable } from "../basic/ReqIFBasicClasses";

export class  DatatypeDefinition extends Identifiable {
    constructor(props?: DatatypeDefinition) {
        super(props);
    }
}

export class  DatatypeDefinitionSimple extends DatatypeDefinition {
    constructor(props?: DatatypeDefinitionSimple) {
        super(props);
    }
}

/*---------------------------------------------------------------------------
Implementations
----------------------------------------------------------------------------*/

//XHTML

export class DatatypeDefinitionXHTML extends DatatypeDefinition {
    constructor(props?: DatatypeDefinitionXHTML) {
        super(props);
    }
}

//Enumeration

export class DatatypeDefinitionEnumeration extends DatatypeDefinition {
    constructor(props?: DatatypeDefinitionEnumeration) {
        super(props);
    }
}

//Boolean

export class  DatatypeDefinitionBoolean extends DatatypeDefinitionSimple {
    constructor(props?: DatatypeDefinitionBoolean) {
        super(props);
    }
}

//Date

export class  DatatypeDefinitionDate extends DatatypeDefinitionSimple {
    constructor(props?: DatatypeDefinitionDate) {
        super(props);
    }
}

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

//String

export class DatatypeDefinitionString extends DatatypeDefinitionSimple {
    maxLength?: number; //should be int
    constructor(props?: DatatypeDefinitionString) {
        super(props);
        if(props) {
            this.maxLength = props['maxLength'];
        }
    }
}
