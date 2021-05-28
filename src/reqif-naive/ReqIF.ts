import { ReqIFToolExtension } from "./ReqIFToolExtension";
import { ReqIFHeader } from "./ReqIFHeader"

// import {} from "./content/"
import { ReqIFContent } from "./ReqIFContent"


export interface ReqIF {
    lang: string; //[0..1]
    theHeader: ReqIFHeader;
    coreContent: ReqIFContent
    toolExtension: ReqIFToolExtension; 

    // constructor() {
    //     this.lang = "en";
    //     this.theHeader = new ReqIFHeader();
    //     this.coreContent = new ReqIFContent();
    //     this.toolExtension = new ReqIFToolExtension();
    // }
}

