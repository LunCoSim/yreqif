import { ReqIFHeader } from "./ReqIFHeader"
import { ReqIFContent } from "./ReqIFContent"
import { ReqIFToolExtension } from "./ReqIFToolExtension";

export interface IReqIF {
    lang?: string; //[0..1]
    theHeader?: ReqIFHeader;
    coreContent?: ReqIFContent
    toolExtension?: ReqIFToolExtension; 
}

export class ReqIF implements IReqIF {
    lang?: string; //[0..1]
    theHeader?: ReqIFHeader;
    coreContent?: ReqIFContent
    toolExtension?: ReqIFToolExtension; 

    constructor(props?: IReqIF) {
        if(props) {
            this.lang = props['lang'];
            this.theHeader = props['theHeader'];
            this.coreContent = props['coreContent'];
            this.toolExtension = props['toolExtension'];
        }
    }
}

