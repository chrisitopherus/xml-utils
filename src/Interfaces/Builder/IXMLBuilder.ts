import { XMLVersion} from "../../types/xml";
import { IXML } from "../IXML";
import { IXMLElement } from "../IXMLElement";

// The file declares interfaces that represent builders for xml.

/**
 * Represents the version setting step of the builder.
 * @interface
 */
export interface ISpecifyVersion {
    /**
     * Method to specify the version of the xml document.
     * @param version The version of the xml document.
     * @returns The builder with the next step.
     */
    setVersion(version: XMLVersion) : ISpecifyEncoding;
}

/**
 * Represents the encoding setting step of the builder.
 * @interface
 */
export interface ISpecifyEncoding {
    /**
     * Method to specify the encoding of the xml document.
     * @param encoding The encoding of the xml document.
     * @returns The builder with the nex step.
     */
    setEncoding(encoding: string) : ISpecifyRoot;
}

/**
 * Represents the root setting step of the builder.
 * @interface
 */
export interface ISpecifyRoot {
    /**
     * Method to specify the name of the root element.
     * @param name Name of the root element.
     * @returns The builder with the next step.
     */
    setRoot(name: string) : IBuildXML;
}

/**
 * Represents the build setting step of the builder.
 * @interface
 */
export interface IBuildXML {
    /**
     * Method for adding a new child to the root element.
     * @param element Element to be added.
     * @returns The builder.
     */
    addChild(element: IXMLElement) : IBuildXML;

    /**
     * Method for resetting the state of the builder.
     * @returns The first step of the builder.
     */
    clear() : ISpecifyVersion;

    /**
     * Method for building the xml.
     * @returns The xml.
     */
    build() : IXML;
}

/**
 * Represents a stepwise builder for xml.
 * @interface
 * 
 * @description
 * Pros:
 * - Ensures that the user sets all the values in a certain order.
 * - Prevents using other methods before a certain step is reached.
 * - Prevents using a method multiple times in the same process of building.
 * 
 * Cons:
 * - It is not possible to clear the builder after it has builded the xml.
 * - In order to clear, it would be possible to "pseudo" build an xml again to then call the `clear()` method.
 */
export interface IXMLStepwiseBuilder extends ISpecifyVersion, ISpecifyEncoding, ISpecifyRoot, IBuildXML {}

/**
 * Represents a builder for xml.
 * @interface
 * @description
 * Pros:
 * - Is easily clearable through the `clear()` method.
 * - Provides a flexible interface by giving access to all methods.
 * 
 * Cons:
 * - The user could be using the same methods multiple times in the same process of building, which could lead to unnecessary calls.
 * - Does not force the user to set meta information which could lead sometimes to problems. 
 */
export interface IXMLBuilder {
    /**
     * Method to specify the version of the xml document.
     * @param version The version of the xml document.
     * @returns The builder.
     */
    setVersion(version: XMLVersion) : this;

    /**
     * Method to specify the encoding of the xml document.
     * @param encoding The encoding of the xml document.
     * @returns The builder.
     */
    setEncoding(encoding: string) : this;

    /**
     * Method to specify the name of the root element.
     * @param name Name of the root element.
     * @returns The builder with the next step.
     */
    setRoot(name: string) : this;

    /**
     * Method for adding a new child to the root element.
     * @param element Element to be added.
     * @returns The builder.
     */
    addChild(element: IXMLElement) : this;

    /**
     * Method for resetting the state of the builder.
     * @returns The builder.
     */
    clear() : this;

    /**
     * Method for building the xml.
     * @returns The xml.
     */
    build() : IXML;
}