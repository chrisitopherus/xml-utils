import { IXMLElement } from "../IXMLElement";

export interface IXMLElementBuilder {
    setTag(name: string, value?: string) : this;
    addChild(element: IXMLElement) : this;
    addAttribute(name: string, value: string) : this;
    clear() : this;
    build() : IXMLElement;
}