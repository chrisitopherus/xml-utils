import { IConverter } from "../Interfaces/Converter/IConverter";
import { IXMLConvertable } from "../Interfaces/IXMLConvertable";
import { Result } from "../Result/result"; 
import { XMLConverter } from "./xmlConverter";

export class Converter implements IConverter {
    private readonly xmlConverter;
    constructor(indentSize: number){
        this.xmlConverter = new XMLConverter(indentSize);
    }

    public convertObjToXml(xmlObj: IXMLConvertable) : Result<string> {
        return this.xmlConverter.convertObjToXml(xmlObj);
    }   

}