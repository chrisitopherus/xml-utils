import {IXML} from "../Interfaces/IXML";
import { IParser } from "../Interfaces/Parser/IParser";
import { IXMLParser } from "../Interfaces/Parser/IXMLParser";
import { XMLParser } from "./xmlParser";

export class Parser implements IParser {
    private readonly xmlParser: IXMLParser = new XMLParser();
    constructor() {
        // do nothing
    }

    public xml2obj(xml: string): IXML {
        return this.xmlParser.xml2obj(xml);
    }
}