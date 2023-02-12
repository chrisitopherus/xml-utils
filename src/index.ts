import { XMLBuilder } from "./Builder/xmlBuilder";
import { XMLElementBuilder } from "./Builder/xmlElementBuilder";
import { Converter } from "./Converter/converter";
import { XMLParser } from "./Parser/xmlParser";
import { XMLObject } from "./types/xml";

const xmlBuilder = XMLBuilder.Create();
const xb = new XMLBuilder();

const xml = xmlBuilder
    .setVersion("1.0")
    .setEncoding("UTF-8")
    .setRoot("person")
    .addChild(new XMLElementBuilder()
        .addAttribute("isKek", "True")
        .addAttribute("src", "./src")
        .setName("name")
        .setValue("Christopher")
        .build())
    .addChild(new XMLElementBuilder()
        .setName("age")
        .setValue(20)
        .build())
    .addChild(new XMLElementBuilder()
        .setName("siblings")
        .setValue("test")
        .addChild(new XMLElementBuilder()
            .setName("name")
            .setValue("Christina")
            .build())
        .addChild(new XMLElementBuilder()
            .addAttribute("isKek", "False")
            .setName("name")
            .setValue("Peter")
            .addChild(new XMLElementBuilder()
                .setName("age")
                .setValue(33)
                .build())
            .build())
        .build())
    .build();

const xml2 = xb
    .setVersion("1.1")
    .setEncoding("UTF-8")
    .setRoot("city")
    .addChild(new XMLElementBuilder()
        .setName("name")
        .setValue("Gramatneusiedl")
        .addChild(new XMLElementBuilder()
            .setName("plz")
            .setValue(2440)
            .build())
        .build())
    .build();
xb.clear();

const xml3 = xb.build();

const result = xml.toXML().retrieve();
if (!result.success) {
    console.error(result.error);
} else {
    console.info(result.data);
}

const result2 = xml2.toXML().retrieve();
if (!result2.success) {
    console.error(result2.error);
} else {
    console.info(result2.data);
}

const result3 = xml3.toXML().retrieve();
if (!result3.success) {
    console.error(result3.error);
} else {
    console.info(result3.data);
}

console.info(xml.getTagsByName("age"));

const converter = new Converter(4);

const xmlObj: XMLObject = {
    prolog: {
        encoding: "UTF-8",
        version: "1.1"
    },
    root: {
        name: "root",
        value: "test",
        attributes: [],
        children: [
            {
                name: "person",
                value: "",
                attributes: [],
                children: [
                    {
                        name: "name",
                        value: "Christopher",
                        attributes: [],
                        children: []
                    },
                    {
                        name: "age",
                        value: "20",
                        attributes: [],
                        children: []
                    },
                ]
            }
        ]
    }
};

const result4 = converter.obj2xml(xmlObj).retrieve();
if (!result4.success) {
    console.error(result4.error);
} else {
    console.info(result4.data);
}

const xml5 = new XMLParser().xml2obj(xmlObj);
console.log(xml5.getTagsByName("name"));