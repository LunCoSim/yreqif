import { Identifiable } from "./definitions/ReqIFBasicClasses";

export interface  ReqIFHeader extends Identifiable {
    comment: string; //[0..1]
    creationTime: Date;
    identifier: string;
    repositoryId: string; //[0..1]
    reqIFToolId: string;
    reqIFVersion: string; //default = 1
    sourceToolId: string;
    title: string

    // constructor() {
    //     super();

    //     this.comment = "";
    //     this.creationTime = new Date();
    //     this.identifier = "";
    //     this.repositoryId = "";
    //     this.reqIFToolId = "";
    //     this.reqIFVersion = "";
    //     this.sourceToolId = "";
    //     this.title = "";
    // }
}