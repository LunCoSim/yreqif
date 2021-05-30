import * as _ from "lodash";
import { parse as fast_xml_parse} from "fast-xml-parser";

import { ToArray } from "../utils";


import { ReqIF } from "../reqif-naive/ReqIF";

import { yReqIF, yIndex } from "./yreqif";
import { ExtractingFunctionsMap, RefTypes, XMLMap } from "./ymaps";
import { Identifiable } from "../reqif-naive/definitions/ReqIFBasicClasses";

//-------------------------------------

export function yparse(xml: string) {
    //parsing source
    const parsed_xml = fast_xml_parse(xml, {
        ignoreAttributes : false,
    });

    return parsed_xml;
}

//----------------------
//helper parser function

export function getFirstElement<Type>(data: any [] | void) {
    if(data) {
        return data[0] as Type;
    }
}

//---------------------
//@param Type: 
//

//TODO: Instead of global index create new for this exact file
let INDEX: yIndex = {};

export function extractProps(classProto: any, data: any): unknown {
    //------Excluding the highest parent
    if(!classProto) {
        return;
    }

    if((Object.getPrototypeOf(classProto) == null) || (Object.getPrototypeOf(classProto) == undefined)) {
        return;
    }

    if(classProto['name'] == "") {
        return;
    }
    //------Finish: Excluding the highest parent

    var res = extractProps(Object.getPrototypeOf(classProto), data);

    Object.keys(classProto).forEach(key => console.log("", key));

    var extractingFunction = ExtractingFunctionsMap[classProto.name];

    if(extractingFunction != undefined) {
        var extracted = extractingFunction(data);
        
        res = Object.assign({}, res, extracted);
    } else {
        console.error("Extraction function not found for: ", classProto.name)
    }
    return res;
}

function makeClassFromDate() {

}

function extractRef() {

}

export function extractData(source: any): any[] | void {
    if(source) {
        let firstClassName: string = Object.keys(source)[0]; 
        if(RefTypes.indexOf(firstClassName) != -1) { //checking for ref types!
            return [INDEX[source[firstClassName]]];
        } else {
            var res = Object.keys(source).map(function(className: string) {
                return ToArray(source[className]).map((data) => {
                    var mappedClass = XMLMap[className];
                    if(mappedClass) {
                        var temp = new mappedClass(extractProps(XMLMap[className], data));
        
                        if(temp instanceof Identifiable) {
                            INDEX[temp.identifier] = temp;
                        }
        
                        return temp;
                    } else {
                        console.error('***************** Class not found: ', className)
                    }
                    
                });
            });
            
            return _.flattenDeep(res);
        }
    }
}


export function extract(data: unknown) {
    INDEX = {};

    let res = new yReqIF({
        reqif: getFirstElement<ReqIF>(extractData(data)) as ReqIF,
        index: INDEX
    });
    
    INDEX = {};//As INDEX is global, cleaning it

    return res;
}