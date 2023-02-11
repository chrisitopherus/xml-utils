import { IXML } from "../IXML";

export interface IXMLParser {
    xml2obj(xml: string): IXML
}