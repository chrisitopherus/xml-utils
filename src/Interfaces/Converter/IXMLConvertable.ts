import { XMLElementObject, XMLProlog } from "../../types/xml";

export interface IXMLConvertable {
    prolog: XMLProlog;
    root: XMLElementObject;
}