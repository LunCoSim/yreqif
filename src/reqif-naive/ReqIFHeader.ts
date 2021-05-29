import { Identifiable } from "./definitions/ReqIFBasicClasses";

export class ReqIFHeader extends Identifiable {
    comment?: string; //[0..1]
    creationTime?: Date;
    repositoryId?: string; //[0..1]
    reqIFToolId?: string;
    reqIFVersion?: string; //default = 1
    sourceToolId?: string;
    title?: string

    constructor(props?: ReqIFHeader) {
        super(props);
        if(props) {
            this.comment = props["comment"]
            this.creationTime = props["creationTime"]
            this.repositoryId = props["repositoryId"]
            this.reqIFToolId = props["reqIFToolId"]
            this.reqIFVersion = props["reqIFVersion"]
            this.sourceToolId = props["sourceToolId"]
            this.title = props["title"]
        }
    }
}