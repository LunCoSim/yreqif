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
    }
}