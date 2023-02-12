import { IXMLElement } from "../IXMLElement";

/**
 * Represents a builder for xml elements.
 * @interface
 */
export interface IXMLElementBuilder {
    /**
     * Method for setting the name of the element.
     * @param name Name of the element.
     * @returns The builder.
     */
    setName(name: string) : this;

    /**
     * Method for setting the value of the element.
     * @param value Value of the element.
     * @returns The builder.
     */
    setValue(value: string | number) : this;

    /**
     * Method for adding a new element as a child.
     * @param element The element to be added.
     * @returns The builder.
     */
    addChild(element: IXMLElement) : this;

    /**
     * Method for adding a new attribute.
     * @param name Name of the attribute.
     * @param value Value of the attribute.
     * @returns The builder.
     */
    addAttribute(name: string, value: string) : this;

    /**
     * Method for resetting the state of the builder.
     * @returns The builder.
     */
    clear() : this;

    /**
     * Method for building the element.
     * @returns The element.
     */
    build() : IXMLElement;
}