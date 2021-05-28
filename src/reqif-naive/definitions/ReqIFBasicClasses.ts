//------------------------------------------------------------------------------
//Identifiable

import { AttributeValue } from "./ReqIFDefinition";

//TODO How to connect Identifiable and AlternativeID???? check page 29 figure 10.2 from ReqIF spec
export interface Identifiable {
    desc?: string; //[0..1]
    identifier: string; //UUID
    lastChange?: Date;
    longName?: string; //[0..1];

    alternativeID?: AlternativeID; //Actually
}

export interface AlternativeID {
    identifier: string;
    ident: Identifiable;

}

//----------------------
//Access restriction

//should be abstract interface
export interface AccessControlledElement extends Identifiable {
    isEditable: boolean;

    // constructor(identifier?: string, desc?: string, longName?: string, lastChange?: Date, isEditable?: boolean) {
    //     super(identifier, desc, longName, lastChange);
        
    //     this.isEditable = true;
    //     if(isEditable === false) {
    //         this.isEditable = false;
    //     } 
    // }
}

//-------------------------------------------------------
//SpecElementWithAttributes

export interface SpecElementWithAttributes extends Identifiable {
    values: AttributeValue[]

    // constructor() {
    //     super()

    //     this.values = [];
    // }
}