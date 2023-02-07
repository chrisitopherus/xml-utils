type ErrorResulObject = {success: false, error: string};
type SuccessfulResultObject<D> = {success: true, data: D};
export type ResultObject<D> = ErrorResulObject | SuccessfulResultObject<D>;