import { Identifiable } from "../reqif-naive/basic/ReqIFBasicClasses";
import { ReqIF } from "../reqif-naive/ReqIF";

//--------------------
//Types and other usefull things

export type yIndex = {[key: string]: any};

export interface IyReqIF {
    reqif: ReqIF; //Plain ReqIF orbject
    index?: yIndex; //Indexed property that contains links to all identifiable objects
}

//--------------------

export class yReqIF implements IyReqIF {
    reqif: ReqIF; //Plain ReqIF orbject
    index?: yIndex; //Indexed property that contains links to all identifiable objects

    constructor(props?: IyReqIF) {
        if(props) {
            this.reqif = props['reqif'];
            this.index = props['index'];
        } else {
            this.reqif = new ReqIF();
        }
    };
}

export class yReqIFCrud {

    // //---------------------
    // //CRUD operations
    // //Assuming that all edits are subclasses of identifiable
    // create<T extends Identifiable>(props: T) {
    //     /*TODO:
    //     how to implement different create rules for different classes?
    //     */
    // }

    // read(identifier: string) {
    //     if(this.index) {
    //         return this.index[identifier];
    //     } else {
    //         console.error("Missing item in index, identifier: ", identifier);
    //     }
    // }
    
    update(yreqif: yReqIF, props: Identifiable) {
        /*TODO:
        how to implement different update rules for different classes?
        */
    }

    // delete(identifier: string | Identifiable) {
    //     /*TODO:
    //     how to implement different delete rules for different classes?
    //     */
    // }
}



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