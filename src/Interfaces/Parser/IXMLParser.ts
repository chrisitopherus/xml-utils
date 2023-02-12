import { XMLObject } from "../../types/xml";
import { IXML } from "../IXML";

export interface IXMLParser {
    xml2obj(xml: string | XMLObject): IXML
}