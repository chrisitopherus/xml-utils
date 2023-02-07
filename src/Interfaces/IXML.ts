import { Result } from "../Result/result";
import { XMLAttribute, XMLProlog } from "../types/xml";
import { IXMLElement } from "./IXMLElement";
export interface IXMLConvertable {
    prolog: XMLProlog;
    rootElement: IXMLElement;
}

export interface IXML extends IXMLConvertable {
    toXML() : Result<string>;
    getTagsByName(name: string) : IXMLElement[];
    getTagsByAttributeName(name: string) : IXMLElement[];
    getTagsByAttributeValue(value: string) : IXMLElement[];
    getTagsByAttribute(attribute: XMLAttribute) : IXMLElement[];
    getTagsByValue(value: string) : IXMLElement[];
}