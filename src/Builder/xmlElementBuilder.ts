import { IXMLElement } from "../Interfaces/IXMLElement";
import { IXMLElementBuilder } from "../Interfaces/Builder/IXMLElementBuidler";
import { XMLElement } from "../XML/element";
import { copyArrayRef } from "../utils/copyArrayRef";

// Contains the XMLElementBuilder class for building xml elements.

export class XMLElementBuilder implements IXMLElementBuilder {
    private element = new XMLElement("", "", [], []);
    constructor() {
        // empty
    }

    public setName(name: string): this {
        this.element.name = name;
        return this;
    }

    public setValue(value: string | number): this {
        this.element.value = value.toString();
        return this;
    }
    
    public addChild(element: IXMLElement): this {
        element.parent = this.element;
        this.element.children.push(element);
        return this;
    }

    public addAttribute(name: string, value: string): this {
        this.element.attributes.push({ name, value });
        return this;
    }

    public clear(): this {
        this.element.name = "";
        this.element.value = "";
        this.element.attributes = [];
        this.element.children = [];
        this.element.parent = null;
        return this;
    }

    public build(): IXMLElement {
        return new XMLElement(
            this.element.name,
            this.element.value,
            copyArrayRef(this.element.attributes),
            copyArrayRef(this.element.children),
            this.element.parent
        );
    }
}