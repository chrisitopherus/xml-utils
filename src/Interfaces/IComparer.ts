import { IComparable } from "./IComparable";

export interface IComparer<T> {
    compare(item: IComparable<T>, other: IComparable<T>) : boolean;
}