import { IXML } from "../Interfaces/IXML";
import { IBuildXML, ISpecifyVersion, ISpecifyEncoding, ISpecifyRoot, IXMLSafeBuilder, IXMLBuilder } from "../Interfaces/Builder/IXMLBuilder";
import { XML } from "../XML/xml";
import { XMLVersion, XMLProlog} from "../types/xml";
import { IXMLElement } from "../Interfaces/IXMLElement";
import { XMLElement } from "../XML/element";

class StepwiseBuilder implements IXMLSafeBuilder{
    private version : XMLVersion = "1.0";
    private encoding = "";
    private root = new XMLElement("root", "", [], []);

    constructor(){
        // empty
    }

    public setVersion(version: XMLVersion): ISpecifyEncoding {
        this.version = version;
        return this;
    }

    public setEncoding(encoding: string): ISpecifyRoot {
        this.encoding = encoding;
        return this;
    }

    public setRoot(name: string): IBuildXML {
        this.root.tagName = name;
        return this;
    }

    public addChild(element: IXMLElement): IBuildXML {
        element.parent = this.root;
        this.root.children.push(element);
        return this;
    }

    public clear() : IBuildXML {
        this.version = "1.0";
        this.encoding = "";
        this.root = new XMLElement("root", "", [], []);
        return this;
    }

    public build(): IXML {
        return new XML(this.createProlog(), this.root);
    }

    private createProlog(): XMLProlog {
        return {
            version: this.version,
            encoding: this.encoding
        };
    }
}

export class XMLBuilder implements IXMLBuilder {
    private version : XMLVersion = "1.0";
    private encoding = "";
    private root = new XMLElement("root", "", [], []);

    constructor() {
        // empty
    }

    public static Create() : ISpecifyVersion {
        return new StepwiseBuilder();
    }

    public setVersion(version: XMLVersion): this {
        this.version = version;
        return this;
    }

    public setEncoding(encoding: string): this {
        this.encoding = encoding;
        return this;
    }

    public setRoot(name: string): this {
        this.root.tagName = name;
        return this;
    }

    public addChild(element: IXMLElement): this {
        element.parent = this.root;
        this.root.children.push(element);
        return this;
    }

    public build(): IXML {
        return new XML(this.createProlog(), this.root);
    }

    public clear(): this {
        this.version = "1.0";
        this.encoding = "";
        this.root = new XMLElement("root", "", [], []);
        return this;
    }

    private createProlog(): XMLProlog {
        return {
            version: this.version,
            encoding: this.encoding
        };
    }
}