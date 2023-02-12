import { Converter } from "../Converter/converter";
import { IXML } from "../Interfaces/IXML";
import { IXMLConverter } from "../Interfaces/Converter/IXMLConverter";
import { Result } from "../Result/result";
import { XMLAttribute, XMLObject, XMLProlog, XMLSearchFn } from "../types/xml";
import { IXMLElement } from "../Interfaces/IXMLElement";
import { IComparer } from "../Interfaces/IComparer";
import { IComparable } from "../Interfaces/IComparable";
import { XMLElement } from "./element";
import { IXMLParser } from "../Interfaces/Parser/IXMLParser";
import { Parser } from "../Parser/parser";

export class XML implements IXML, IComparer<IXMLElement> {
    public prolog: XMLProlog;
    public root: IXMLElement;
    private converter: IXMLConverter = new Converter(4);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static parser: IXMLParser = new Parser();
    constructor(prolog: XMLProlog, rootElement: IXMLElement) {
        this.prolog = prolog;
        this.root = rootElement;
    }

    public static parse(xml: string | XMLObject) : Result<IXML> {
        try {
            return new Result({
                success: true,
                data: this.parser.xml2obj(xml)
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return new Result({
                success: false,
                error: error.message
            });
        }
    }

    public toXML(): Result<string> {
        return this.converter.obj2xml(this);
    }

    public getTagsByName(name: string): IXMLElement[] {
        return this.recursiveSearch(
            this.root,
            [],
            (item) => item.name === name
        );
    }

    public getTagsByValue(value: string): IXMLElement[] {
        return this.recursiveSearch(
            this.root,
            [],
            (item) => item.value === value
        );
    }

    public getTagsByAttributeName(name: string): IXMLElement[] {
        return this.recursiveSearch(
            this.root,
            [],
            (item) => item.hasAttributeName(name)
        );
    }

    public getTagsByAttributeValue(value: string): IXMLElement[] {
        return this.recursiveSearch(
            this.root,
            [],
            (item) => item.hasAttributeValue(value)
        );
    }

    public getTagsByAttribute(attribute: XMLAttribute): IXMLElement[] {
        return this.recursiveSearch(
            this.root,
            [],
            (item) => item.hasAttributeName(attribute.name)
                && item.hasAttributeValue(attribute.value.toString())
        );
    }

    public search(searchFn: XMLSearchFn): Result<IXMLElement[]> {
        try {
            const result = this.recursiveSearch(this.root, [], searchFn);
            return new Result({
                success: true,
                data: result
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return new Result({
                success: false,
                error: error.message
            });
        }
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