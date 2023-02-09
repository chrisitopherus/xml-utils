
import { IXMLConverter } from "../Interfaces/Converter/IXMLConverter";
import { IXMLConvertable } from "../Interfaces/IXMLConvertable";
import { Result } from "../Result/result";
import { XMLAttribute, XMLProlog, XMLElementObject } from "../types/xml";

export class XMLConverter implements IXMLConverter {
    private indent: string;
    constructor(indentSize: number) {
        this.indent = " ".repeat(indentSize);
    }

    convertObjToXml(xmlObj: IXMLConvertable): Result<string> {
        let xml = this.prologToString(xmlObj.prolog);
        try {
            xml += `\r\n${this.elementToString(xmlObj.root, 0)}`;
            return new Result({
                success: true,
                data: xml
            });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            return new Result({
                success: false,
                error: error.message
            });
        }
    }

    private prologToString(prolog: XMLProlog) : string {
        return `<?xml version="${prolog.version}" encoding="${prolog.encoding}"?>`;
    }

    private elementToString(element: XMLElementObject, indent: number) : string {
        let xml = "";
        if (element.children.length === 0) {
            xml += `${this.addIndent(indent)}<${element.name}${this.attributesToString(element.attributes)}>${element.value}</${element.name}>\n`;
        } else {
            xml += `${this.addIndent(indent)}<${element.name}${this.attributesToString(element.attributes)}>\n`;
            if (element.value !== "") {
                xml += `${this.addIndent(indent + 1)}${element.value}\n`;
            }

            element.children.forEach(child => xml += this.elementToString(child, indent + 1));
            xml += `${this.addIndent(indent)}</${element.name}>\n`;
        }

        return xml;

    }

    private attributesToString(attributes: XMLAttribute[]) : string {
        let attributeText = "";
        if (attributes.length === 0) {
            return attributeText;
        }

        attributes.forEach(attribute => attributeText += ` ${this.attributeToString(attribute)}`);
        return attributeText;
    }

    private attributeToString(attribute: XMLAttribute) : string {
        return `${attribute.name}="${attribute.value}"`;
    }

    private addIndent(count: number) : string {
        return this.indent.repeat(count);
    }
}