export interface IComparable<T> {
    compareTo(other: IComparable<T>) : boolean;
}