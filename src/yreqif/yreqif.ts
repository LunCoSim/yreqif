import { Identifiable } from "../reqif-naive/definitions/ReqIFBasicClasses";
import { ReqIF } from "../reqif-naive/ReqIF";

//--------------------
//Types and other usefull things

export type yIndex = {[key: string]: any};

//--------------------

export class yReqIF {
    reqif: ReqIF; //Plain ReqIF orbject
    index?: yIndex; //Indexed property that contains links to all identifiable objects

    constructor(props?: yReqIF) {
        if(props) {
            this.reqif = props['reqif'];
            this.index = props['index'];
        } else {
            this.reqif = new ReqIF();
        }
    };

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
    
    // update(props: Identifiable) {
    //     /*TODO:
    //     how to implement different update rules for different classes?
    //     */
    // }

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

Classes to work with
1. ReqIf header
2. DataType
3. SpecType
4. SpecObject
5. Specification

*/