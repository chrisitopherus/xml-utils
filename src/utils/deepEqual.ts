export function deepEqual(obj1: Record<string, unknown>, obj2: Record<string, unknown>): boolean {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) return false;

    const obj1Props = Object.getOwnPropertyNames(obj1);
    const obj2Props = Object.getOwnPropertyNames(obj2);

    if (obj1Props.length !== obj2Props.length) return false;

    for (const prop of obj1Props) {
        if ((typeof obj1[prop] === "object" && obj1[prop] !== null) && !deepEqual(obj1[prop] as Record<string, unknown>, obj2[prop] as Record<string, unknown>)) {
            return false;
        } else {
            if (obj1[prop] !== obj2[prop]) return false;
        }
    }

    return true;
}