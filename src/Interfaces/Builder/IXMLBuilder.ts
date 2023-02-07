import { XMLVersion} from "../../types/xml";
import { IXML } from "../IXML";
import { IXMLElement } from "../IXMLElement";

export interface ISpecifyVersion {
    setVersion(version: XMLVersion) : ISpecifyEncoding;
}

export interface ISpecifyEncoding {
    setEncoding(encoding: string) : ISpecifyRoot;
}

export interface ISpecifyRoot {
    setRoot(name: string) : IBuildXML;
}

export interface IBuildXML {
    addChild(element: IXMLElement) : IBuildXML;
    clear() : IBuildXML;
    build() : IXML;
}

export interface IXMLSafeBuilder extends ISpecifyVersion, ISpecifyEncoding, ISpecifyRoot, IBuildXML {}

export interface IXMLBuilder {
    setVersion(version: XMLVersion) : this;
    setEncoding(encoding: string) : this;
    setRoot(name: string) : this;
    addChild(element: IXMLElement) : this;
    clear() : this;
    build() : IXML;
}