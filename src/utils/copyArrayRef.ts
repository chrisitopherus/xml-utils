export function copyArrayRef<T>(array: T[]): T[] {
    return array.map(item => item);
}