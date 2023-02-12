import { IXMLElement } from "../Interfaces/IXMLElement";
import { IXMLElementParser } from "../Interfaces/Parser/IXMLElementParser";
import { XMLElement } from "../XML/element";
import { XMLElementObject } from "../types/xml";

export class XMLElementParser implements IXMLElementParser {
    constructor() {
        // do nothing
    }

    public parseElement(obj: XMLElementObject, parent?: XMLElement): IXMLElement {
        const element: IXMLElement = new XMLElement(obj.name, obj.value, obj.attributes, [], parent);
        if (obj.children.length === 0) {
            return element;
        }

        element.children = obj.children.map(child => this.parseElement(child, element));

        return element;
    }
}