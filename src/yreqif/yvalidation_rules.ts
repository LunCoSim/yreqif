/*
create
update
delete
*/

import { yReqIF } from "./yreqif";

export function canDelete(yreqif: yReqIF, action: any): boolean {
    //TODO: Rule that can't delete header!

    return true; //true by default
    //check cases  what would happen if deleted. Any backlincks?
    //Suggest merging?
}

export function canUpdate(yreqif: yReqIF, action: any): boolean {
    return true; //true by default
    //check cases  what would happen if deleted. Any backlincks?
    //Suggest merging?
}