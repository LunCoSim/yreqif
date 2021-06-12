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
    lang: string; //[0..1]
    theHeader: ReqIFHeader;
    coreContent: ReqIFContent
    toolExtension: ReqIFToolExtension; 

    constructor(props?: IReqIF) {
        if(props) {
            this.lang = props['lang'] || "en";
            this.theHeader = props['theHeader'] || new ReqIFHeader();
            this.coreContent = props['coreContent'] || new ReqIFContent();
            this.toolExtension = props['toolExtension'] || new ReqIFToolExtension();
        } else {
            this.lang = "en";
            this.theHeader = new ReqIFHeader();
            this.coreContent = new ReqIFContent();
            this.toolExtension = new ReqIFToolExtension();
        }
    }
}

