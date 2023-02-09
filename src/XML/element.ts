import { IXMLElement } from "../Interfaces/IXMLElement";
import { XMLAttribute } from "../types/xml";

export class XMLElement implements IXMLElement {
    public parent: XMLElement | null = null; 
    constructor(public name: string, public value: string, public attributes: XMLAttribute[], public children: IXMLElement[], parent?: XMLElement | null) {
        if (parent) {
            this.parent = parent;
        }
    }

    public hasAttributeName(name: string): boolean {
        return this.attributes.some(attribute => attribute.name === name);
    }

    public hasAttributeValue(value: string): boolean {
        return this.attributes.some(attribute => attribute.value === value);
    }

    public compareTo(other: XMLElement): boolean {
        return this.name === other.name && this.value === other.value;
    }
}