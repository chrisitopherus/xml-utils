import { XMLAttribute } from "../types/xml";
import { IComparable } from "./IComparable";

export interface IXMLElement extends IComparable<IXMLElement> {
    name: string;
    value: string;
    attributes: XMLAttribute[];
    children: IXMLElement[];
    parent: IXMLElement | null;
    hasAttributeName(name: string): boolean;
    hasAttributeValue(value: string): boolean;
}