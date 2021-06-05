//-------------------------------------------------------
//SpecElementWithAttributes

import { AttributeValue } from "../definitions/ReqIFAttributeValue";
import { Identifiable } from "../definitions/ReqIFBasicClasses";

export class SpecElementWithAttributes extends Identifiable {
    values?: AttributeValue[]

    constructor(props?:SpecElementWithAttributes) {
        super(props);
        if(props) {
            this.values = props['values'];
        }
    }
}

