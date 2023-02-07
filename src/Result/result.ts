import { ResultObject } from "../types/result";

/**
 * Represents a Result of an operation.
 * @class
 */
export class Result<D> {
    /**
     * The result of the operation.
     * @private
     * @readonly
     */
    private readonly result : ResultObject<D>;

    /**
     * Initializes an instance of the Result class.
     * @constructor
     * @public
     * @param resultObj The result of the operation.
     */
    public constructor(resultObj: ResultObject<D>) {
        this.result = resultObj;
    }

    /**
     * Retrieves the result wrapped in an object.
     * @public
     * @returns The result wrapped in an object.
     */
    public retrieve() : ResultObject<D>{
        return this.result;
    }
}
