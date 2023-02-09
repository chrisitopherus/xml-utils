import { Result } from "../Result/result";
import { XMLAttribute, XMLSearchFn } from "../types/xml";
import { IXMLConvertable } from "./IXMLConvertable";
import { IXMLElement } from "./IXMLElement";

export interface IXML extends IXMLConvertable {
    toXML() : Result<string>;
    getTagsByName(name: string) : IXMLElement[];
    getTagsByAttributeName(name: string) : IXMLElement[];
    getTagsByAttributeValue(value: string) : IXMLElement[];
    getTagsByAttribute(attribute: XMLAttribute) : IXMLElement[];
    getTagsByValue(value: string) : IXMLElement[];
    search(searchFn: XMLSearchFn): Result<IXMLElement[]>
}