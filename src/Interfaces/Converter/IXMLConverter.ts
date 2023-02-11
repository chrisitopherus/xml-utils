import { Result } from "../../Result/result";
import { IXMLConvertable } from "./IXMLConvertable";

export interface IXMLConverter {
    obj2xml(xmlObj: IXMLConvertable) : Result<string>
}