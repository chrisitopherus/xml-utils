import { XMLElementObject } from "../../types/xml";
import { IXMLElement } from "../IXMLElement";

export interface IXMLElementParser {
    parseElement(obj: XMLElementObject): IXMLElement
}