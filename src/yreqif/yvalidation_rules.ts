/*
create
update
delete
*/

import { ReqIFHeader } from "../reqif-naive/ReqIFHeader";
import { yReqIF } from "./yreqif";

export function canDelete(yreqif: yReqIF, action: any): boolean {
    //TODO: Rule that can't delete header!

    let obj: unknown = yreqif.getObject(action.identifier);

    //Rule: Can't remove header
    if(obj instanceof ReqIFHeader) {
        return false;
    }
    return true; //true by default
    //check cases  what would happen if deleted. Any backlincks?
    //Suggest merging?
}

export function canUpdate(yreqif: yReqIF, action: any): boolean {
    return true; //true by default
    //check cases  what would happen if deleted. Any backlincks?
    //Suggest merging?
}