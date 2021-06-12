import { Identifiable } from "../reqif-naive/basic/ReqIFBasicClasses";
import { ReqIF } from "../reqif-naive/ReqIF";

//--------------------
//Types and other usefull things

export type yIndex = {[key: string]: any};

export interface IyReqIF {
    reqif: ReqIF; //Plain ReqIF orbject
    index: yIndex; //Indexed property that contains links to all identifiable objects
}

//--------------------

export class yReqIF implements IyReqIF {
    reqif: ReqIF; //Plain ReqIF orbject
    index: yIndex; //Indexed property that contains links to all identifiable objects

    constructor(props?: IyReqIF) {
        if(props) {
            this.reqif = props['reqif'];
            this.index = props['index'];
        } else {
            this.reqif = new ReqIF();
            this.index = {};
        }
    };

    doIndex(obj: Identifiable) {
        if(this.index) {
            this.index[obj.identifier] = obj;
        }
    }

    removeIndex(obj: Identifiable | string) {
        if(typeof obj == 'string') {
            //TODO: Finish
        } else {

        }
    }

    getObject(id: string) {
        if(this.index) {
            return this.index[id];
        }
    }

    //-------------
    to_JSON() {
        return JSON.stringify(this, null, 4)
    }
    //-------------
    create<Type extends DatatypeDefinition | SpecType | Specification | SpecObject | SpecHierarchy>(obj: Type) {
        if(obj instanceof DatatypeDefinition) {
            console.log('Creating dataTypes');
            this.reqif.coreContent?.dataTypes?.push(obj)//
        } else if(obj instanceof SpecType) {
            this.reqif.coreContent?.specTypes?.push(obj)//
        } else if(obj instanceof Specification) {
            this.reqif.coreContent?.specifications?.push(obj)//
        } else if(obj instanceof SpecObject) {
            this.reqif.coreContent?.specObjects?.push(obj)//
        } else if(obj instanceof SpecHierarchy) {
            // yreqif.reqif.coreContent?.specTypes?.push(obj)//
        }
        //add to index!
        this.doIndex(obj)
    } 

    update<Type extends DatatypeDefinition | SpecType | Specification | SpecObject | SpecHierarchy | ReqIFHeader>(obj: Type) {
    
        // if(props instanceof DatatypeDefinition) {
        //     this.reqif.coreContent?.dataTypes?.push(props)//
        // } else if(props instanceof SpecType) {
        //     this.reqif.coreContent?.specTypes?.push(props)//
        // } else if(props instanceof Specification) {
        //     this.reqif.coreContent?.specifications?.push(props)//
        // } else if(props instanceof SpecObject) {
        //     this.reqif.coreContent?.specObjects?.push(props)//
        // } else if(props instanceof SpecHierarchy) {
        //     // yreqif.reqif.coreContent?.specTypes?.push(props)//
        // }
        // //add to index!
        // this.doIndex(props)
    } 
    
    delete(obj: Identifiable) {
        //update index!
        //and proper deletion from different plases
        this.removeIndex(obj);
        
        //TODO:
        if(obj instanceof DatatypeDefinition) {
            // this.reqif.coreContent?.dataTypes?.push(props)//
        } else if(obj instanceof SpecType) {
            // this.reqif.coreContent?.specTypes?.push(props)//
        } else if(obj instanceof Specification) {
            // this.reqif.coreContent?.specifications?.push(props)//
        } else if(obj instanceof SpecObject) {
            // this.reqif.coreContent?.specObjects?.push(props)//
        } else if(obj instanceof SpecHierarchy) {
            // yreqif.reqif.coreContent?.specTypes?.push(props)//
        }

    }
}

//---------------------
import { DatatypeDefinition } from "../reqif-naive/definitions/ReqIFDatatypeDefinition"
import { SpecType } from "../reqif-naive/definitions/ReqIFSpecTypes"
import { Specification, SpecHierarchy } from "../reqif-naive/content/ReqIFSpecification"
import { SpecObject } from "../reqif-naive/content/ReqIFSpecObject"

import { ReqIFHeader } from "../reqif-naive/ReqIFHeader"

export const yCreate = {
    DatatypeDefinition,
    SpecType,
    Specification,
    SpecObject,
    SpecHierarchy,
}

export const yUpdate = {
    DatatypeDefinition,
    SpecType,
    Specification,
    SpecObject,
    SpecHierarchy,

    ReqIFHeader,
}

export const yDelete = {
    DatatypeDefinition,
    SpecType,
    Specification,
    SpecObject,
    SpecHierarchy,
}

//---------------------
//CRUD operations
//Assuming that all edits are subclasses of identifiable

/* 
    Create:
        DataType
        SpecType
        Specification
        SpecObject
        SpecHierarchy
    Update:
        DataType
        SpecType
        Specification
        SpecObject
        SpecHierarchy
        +
        Header

        Update could be:
            Add value
            Modify value
            Remove value

            Value could be:
                Build-in value
                Value based on specification


    Delete:
        DataType
        SpecType
        Specification
        SpecObject
        SpecHierarchy
*/


/*
//
Ideas:
1. Everything that could be edited is Identifiable

CRUD operations

1. Create
2. Read
3. Update
4. Delete

Additional operations
5. Visualisations!

At each Identifiable update change it's last-updated field.


Classes to work with
1. ReqIf header - 
update header's fields
2. DataType - 
    create
    
    update

    delete 
3. SpecType - create/update/delete
4. SpecObject - create/update/delete. 
5. Specification

*/