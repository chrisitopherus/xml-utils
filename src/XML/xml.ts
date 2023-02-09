import { Converter } from "../Converter/converter";
import { IXML } from "../Interfaces/IXML";
import { IXMLConverter } from "../Interfaces/Converter/IXMLConverter";
import { Result } from "../Result/result";
import { XMLAttribute, XMLProlog, XMLSearchFn } from "../types/xml";
import { IXMLElement } from "../Interfaces/IXMLElement";
import { IXMLParser } from "../Interfaces/IXMLParser";
import { IComparer } from "../Interfaces/IComparer";
import { IComparable } from "../Interfaces/IComparable";
import { XMLElement } from "./element";

export class XML implements IXML, IComparer<IXMLElement> {
    public prolog: XMLProlog;
    public rootElement: IXMLElement;
    private converter: IXMLConverter = new Converter(4);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static parser: IXMLParser = "" as any;
    constructor(prolog: XMLProlog, rootElement: IXMLElement) {
        this.prolog = prolog;
        this.rootElement = rootElement;
    }

    public static parse(xml: string) : Result<string> {
        return this.parser.parseXMLToObj(xml);
    }

    public toXML(): Result<string> {
        return this.converter.convertObjToXml(this);
    }

    public getTagsByName(name: string): IXMLElement[] {
        return this.recursiveSearch(
            this.rootElement,
            [],
            (item) => item.name === name
        );
    }

    public getTagsByValue(value: string): IXMLElement[] {
        return this.recursiveSearch(
            this.rootElement,
            [],
            (item) => item.value === value
        );
    }

    public getTagsByAttributeName(name: string): IXMLElement[] {
        return this.recursiveSearch(
            this.rootElement,
            [],
            (item) => item.hasAttributeName(name)
        );
    }

    public getTagsByAttributeValue(value: string): IXMLElement[] {
        return this.recursiveSearch(
            this.rootElement,
            [],
            (item) => item.hasAttributeValue(value)
        );
    }

    public getTagsByAttribute(attribute: XMLAttribute): IXMLElement[] {
        return this.recursiveSearch(
            this.rootElement,
            [],
            (item) => item.hasAttributeName(attribute.name)
                && item.hasAttributeValue(attribute.value.toString())
        );
    }

    public compare(item: IComparable<XMLElement>, other: IComparable<XMLElement>): boolean {
        return item.compareTo(other);
    }

    private recursiveSearch(currentElement: XMLElement, foundTags: XMLElement[], checkFn : XMLSearchFn) : XMLElement[] {
        if (checkFn(currentElement)) {
            foundTags.push(currentElement);
        }

        currentElement.children.forEach(child => this.recursiveSearch(child, foundTags, checkFn));
        return foundTags;
    }
}