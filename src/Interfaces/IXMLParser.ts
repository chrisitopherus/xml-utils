import { Result } from "../Result/result";

export interface IXMLParser {
    parseXMLToObj(xmlObj: string) : Result<string>
}