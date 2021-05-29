import { ReqIFToolExtension } from "./ReqIFToolExtension";
import { ReqIFHeader } from "./ReqIFHeader"

// import {} from "./content/"
import { ReqIFContent } from "./ReqIFContent"


export class ReqIF {
    lang?: string; //[0..1]
    theHeader?: ReqIFHeader;
    coreContent?: ReqIFContent
    toolExtension?: ReqIFToolExtension; 

    constructor(props?: ReqIF) {
        if(props) {
            this.lang = props['lang'];
            this.theHeader = props['theHeader'];
            this.coreContent = props['coreContent'];
            this.toolExtension = props['toolExtension'];
        }
    }
}

