import { IXML } from "../Interfaces/IXML";
import { IXMLElementParser } from "../Interfaces/Parser/IXMLElementParser";
import { IXMLParser } from "../Interfaces/Parser/IXMLParser";
import { XML } from "../XML/xml";
import { XMLObject } from "../types/xml";
import { XMLElementParser } from "./xmlElementParser";

export class XMLParser implements IXMLParser {
    private readonly elementParser: IXMLElementParser = new XMLElementParser;
    constructor() {
        // do nothing
    }

    public xml2obj(xml: string | XMLObject): IXML {
        if (typeof xml !== "string") {
            return new XML(xml.prolog, this.elementParser.parseElement(xml.root));
        }


        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new XML("" as any, "" as any);
    }
}