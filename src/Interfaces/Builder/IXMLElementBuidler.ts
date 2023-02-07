import { IXMLElement } from "../IXMLElement";

export interface IXMLElementBuilder {
    setName(name: string) : this;
    setValue(value: string | number) : this;
    addChild(element: IXMLElement) : this;
    addAttribute(name: string, value: string) : this;
    clear() : this;
    build() : IXMLElement;
}