import { IXMLElement } from "../Interfaces/IXMLElement";
export type XMLVersion = "1.0" | "1.1";

export type XMLAttribute = {
    name: string;
    value: number | string;
};

export type XMLProlog = {
    version: XMLVersion;
    encoding: string;
}

export type XMLSearchFn = (item: IXMLElement) => boolean;

export type XMLElementObject = {
    name: string;
    value: string;
}