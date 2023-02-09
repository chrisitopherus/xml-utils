import { IXMLElement } from "../Interfaces/IXMLElement";
export type XMLVersion = "1.0" | "1.1";

/**
 * Defines the strucutre of a xml attribute.
 * 
 * Use it to declare an attribute.
 */
export type XMLAttribute = {
    name: string;
    value: number | string;
};

/**
 * Defines the structure of a xml prolog.
 * 
 * Use it to declare a prolog.
 */
export type XMLProlog = {
    version: XMLVersion;
    encoding: string;
}

/**
 * Defines the format of the search function for xml.
 * 
 * Use this if you want to specify your own search logic.
 * 
 * @example Getting all Elements with an attribute named "test".
 * ```
 * const result = xml.search((item) => item.hasAttributeName("test")).retrieve();
 * if (result.success) console.log(result.data);
 * ```
 */
export type XMLSearchFn = (item: IXMLElement) => boolean;

/**
 * Defines the structure of an xml element object.
 * 
 * Use this format to define an xml element.
 */
export type XMLElementObject = {
    name: string;
    value: string;
    attributes: XMLAttribute[];
    children: IXMLElement[];
}

/**
 * Defines the structure of an xml object.
 * 
 * Use this format to convert it to actual xml or to transform it to an XML isntance.
 */
export type XMLObject = {
    prolog: XMLProlog;
    root: XMLElementObject;
}