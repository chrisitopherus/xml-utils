import { IXMLElement } from "../Interfaces/IXMLElement";
import { IXMLElementBuilder } from "../Interfaces/Builder/IXMLElementBuidler";
import { XMLAttribute } from "../types/xml";
import { XMLElement } from "../XML/element";
export class XMLElementBuilder implements IXMLElementBuilder {
    private element = new XMLElement("", "", [], []);
    constructor() {
        // empty
    }

    setTag(name: string, value?: string): this {
        this.element.tagName = name;
        this.element.tagValue = value || "";
        return this;
    }
    
    addChild(element: IXMLElement): this {
        element.parent = this.element;
        this.element.children.push(element);
        return this;
    }

    addAttribute(name: string, value: string): this {
        this.element.attributes.push({ name, value });
        return this;
    }

    clear(): this {
        this.element.tagName = "";
        this.element.tagValue = "";
        this.element.attributes = [];
        this.element.children = [];
        this.element.parent = null;
        return this;
    }

    build(): IXMLElement {
        return this.element;
    }
}