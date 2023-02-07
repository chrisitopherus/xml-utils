import { describe, expect, test } from "@jest/globals";
import { Result } from "../../Result/result";
describe("Tests for Result class", () => {
    test("Retrieving Error", () => {
        const result = new Result({ success: false, error: "Something went wrong..." });
        const resultObj = result.retrieve();
        if (!resultObj.success) {
            expect(resultObj.error).toBe("Something went wrong...");
        }
    });

    test("Retrieving Data", () => {
        const result = new Result({ success: true, data: 69 });
        const resultObj = result.retrieve();
        if (resultObj.success) {
            expect(resultObj.data).toBe(69);
        }
    });
});