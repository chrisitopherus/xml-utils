import { IXML } from "../Interfaces/IXML";
import { IBuildXML, ISpecifyVersion, ISpecifyEncoding, ISpecifyRoot, IXMLStepwiseBuilder, IXMLBuilder } from "../Interfaces/Builder/IXMLBuilder";
import { XML } from "../XML/xml";
import { XMLVersion, XMLProlog} from "../types/xml";
import { IXMLElement } from "../Interfaces/IXMLElement";
import { XMLElement } from "../XML/element";
import { copyArrayRef } from "../utils/copyArrayRef";

/**
 * Represents a stepwise builder for xml.
 * @class
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
class StepwiseBuilder implements IXMLStepwiseBuilder {
    private version : XMLVersion = "1.0";
    private encoding = "";
    private root = new XMLElement("root", "", [], []);

    constructor(){
        // empty
    }

    /**
     * Method to specify the version of the xml document.
     * @param version The version of the xml document.
     * @returns The builder with the next step.
     */
    public setVersion(version: XMLVersion): ISpecifyEncoding {
        this.version = version;
        return this;
    }

    /**
     * Method to specify the encoding of the xml document.
     * @param encoding The encoding of the xml document.
     * @returns The builder with the nex step.
     */
    public setEncoding(encoding: string): ISpecifyRoot {
        this.encoding = encoding;
        return this;
    }

    /**
     * Method to specify the name of the root element.
     * @param name Name of the root element.
     * @returns The builder with the next step.
     */
    public setRoot(name: string): IBuildXML {
        this.root.name = name;
        return this;
    }

    /**
     * Method for adding a new child to the root element.
     * @param element Element to be added.
     * @returns The builder.
     */
    public addChild(element: IXMLElement): IBuildXML {
        element.parent = this.root;
        this.root.children.push(element);
        return this;
    }

    /**
     * Method for resetting the state to default.
     * @returns The first step of the builder.
     */
    public clear() : ISpecifyVersion {
        this.version = "1.0";
        this.encoding = "";
        this.resetRoot();
        return this;
    }

    /**
     * Method for building the xml.
     * @returns The xml.
     */
    public build(): IXML {
        return new XML(this.createProlog(), new XMLElement(
            this.root.name,
            this.root.value,
            copyArrayRef(this.root.attributes),
            copyArrayRef(this.root.children)
        ));
    }

    /**
     * Method for creating a prolog object.
     * @private
     * @returns A prolog object.
     */
    private createProlog(): XMLProlog {
        return {
            version: this.version,
            encoding: this.encoding
        };
    }

    /**
     * Method for resetting the root element to default.
     * @private
     * @returns The builder.
     */
    private resetRoot() {
        this.root.name = "root";
        this.root.value = "";
        this.root.attributes = [];
        this.root.children = [];
        return this;
    }
}

/**
 * Represents a builder for xml.
 * @class
 * 
 * @description It supports 2 builders:
 * - A stepwise builder which enforces to set the values in a specific order.
 * You create it by using the static method `Create`.
 * 
 * @example
 * ```
 * const swBuilder = XMLBuilder.Create();
 * swBuilder.SetVersion("1.1").
 * swBuilder.SetEncoding("UTF-8")
 * ...
 * ```
 * - A standard builder which provides all the interface methods all the time.
 * You create it by instanciating the class.
 * 
 * @example
 * ```
 * const builder = new XMLBuilder();
 * builder.setRoot("person")
 * ...
 * ```
 * 
 * What you choose is up to you. It mainly depends on what you are trying to achieve.
 * 
 * Keep in mind that both interfaces provide the possibility to method chain except the `build()` method.
 */
export class XMLBuilder implements IXMLBuilder {
    private version : XMLVersion = "1.0";
    private encoding = "";
    private root = new XMLElement("root", "", [], []);

    constructor() {
        // empty
    }

    /**
     * Method the returns a new stepwise builder for xml.
     * @static
     * @returns A stepwise builder.
     */
    public static Create() : ISpecifyVersion {
        return new StepwiseBuilder();
    }

    /**
     * Method to specify the version of the xml document.
     * @param version The version of the xml document.
     * @returns The builder.
     */
    public setVersion(version: XMLVersion): this {
        this.version = version;
        return this;
    }

    /**
     * Method to specify the encoding of the xml document.
     * @param encoding The encoding of the xml document.
     * @returns The builder.
     */
    public setEncoding(encoding: string): this {
        this.encoding = encoding;
        return this;
    }

    /**
     * Method to specify the name of the root element.
     * @param name Name of the root element.
     * @returns The builder.
     */
    public setRoot(name: string): this {
        this.root.name = name;
        return this;
    }

    /**
     * Method for adding a new child to the root element.
     * @param element Element to be added.
     * @returns The builder.
     */
    public addChild(element: IXMLElement): this {
        element.parent = this.root;
        this.root.children.push(element);
        return this;
    }

    /**
     * Method for resetting the state to default.
     * @returns The builder.
     */
    public clear(): this {
        this.version = "1.0";
        this.encoding = "";
        this.resetRoot();
        return this;
    }

    /**
     * Method for building the xml.
     * @returns The xml.
     */
    public build(): IXML {
        return new XML(this.createProlog(), new XMLElement(
            this.root.name,
            this.root.value,
            copyArrayRef(this.root.attributes),
            copyArrayRef(this.root.children)
        ));
    }


    /**
     * Method for creating a prolog object.
     * @private
     * @returns A Prolog object.
     */
    private createProlog(): XMLProlog {
        return {
            version: this.version,
            encoding: this.encoding
        };
    }

    /**
     * Method for resetting the root element to default.
     * @private
     * @returns The builder.
     */
    private resetRoot() {
        this.root.name = "root";
        this.root.value = "";
        this.root.attributes = [];
        this.root.children = [];
        return this;
    }
}