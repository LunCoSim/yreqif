//------------------------------------------------------------------------------
//Identifiable

import { v4 as uuidv4 } from 'uuid';

import { AttributeValue } from "./ReqIFDefinition";

//TODO How to connect Identifiable and AlternativeID???? check page 29 figure 10.2 from ReqIF spec
export class Identifiable {
    desc?: string; //[0..1]
    identifier: string; //UUID
    lastChange?: Date;
    longName?: string; //[0..1];

    alternativeID?: AlternativeID; //Actually

    constructor(props?:Identifiable) {
        if(props) {
            this.identifier = props['identifier'] || uuidv4() as string;
            this.desc = props['desc'];
            this.longName = props['longName'];
            this.lastChange = props['lastChange'];
        } else {
            this.identifier = uuidv4() as string;
        }
    }

}

export interface AlternativeID {
    identifier: string;
    ident?: Identifiable;

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