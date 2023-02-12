import { XMLObject } from "../../types/xml";
import { IXMLElement } from "../IXMLElement";

export interface IXMLElementParser {
    parseElement(obj: XMLObject): IXMLElement
}