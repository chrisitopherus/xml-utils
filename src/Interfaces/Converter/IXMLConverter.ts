import { Result } from "../../Result/result";
import { IXMLConvertable } from "../IXMLConvertable";

export interface IXMLConverter {
    convertObjToXml(xmlObj: IXMLConvertable) : Result<string>
}