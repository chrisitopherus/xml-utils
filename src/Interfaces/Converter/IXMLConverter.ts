import { Result } from "../../Result/result";
import { IXMLConvertable } from "../IXML";

export interface IXMLConverter {
    convertObjToXml(xmlObj: IXMLConvertable) : Result<string>
}