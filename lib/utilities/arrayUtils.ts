type GetRange1 = (end: number) => number[]
type GetRange2 = (start: number, end: number) => number[]
export type DictionaryOf<T> = Record<string, T>

export const getRange: GetRange1 & GetRange2 = (
    num1: number,
    num2?: number,
): number[] => {
    const [start, end] = num2 === undefined ? [0, num1] : [num1, num2]
    const arr = []
    for (let i = start; i < end; i++) {
        arr.push(i)
    }
    return arr
}

export const inArray = <T>(haystack: T[], needle: T): boolean => {
    return haystack.some((e) => e === needle)
}

export const cachedInArray = <T extends string | number>(haystack: T[]) => {
    const list = haystack.reduce<DictionaryOf<string>>((dict, e) => {
        dict[e.toString()] = typeof e
        return dict
    }, {})

    return (key: string | number): key is T => {
        return list[key] !== undefined && list[key] === typeof key
    }
}
export const tranformIntoCachedInArray = <T>(
    haystack: T[],
    keyGenerator: (val: T) => string | number,
) => {
    const check = cachedInArray(haystack.map(keyGenerator))

    return (lookupItem: T): lookupItem is T => check(keyGenerator(lookupItem))
}

export const groupArray = <T>(
    arr: T[],
    keyProvider: (e: T) => string,
): DictionaryOf<T[]> => {
    const result: DictionaryOf<T[]> = {}
    arr.forEach((e) => {
        const key = keyProvider(e)
        result[key] = result[key] || []
        result[key].push(e)
    })
    return result
}

export const withoutTheBools = <T>(arr: Array<T | boolean>): T[] =>
    arr.filter((e): e is T => typeof e !== 'boolean')
export const withoutTheUndefined = <T>(arr: Array<T | undefined>): T[] =>
    arr.filter((e): e is T => e !== undefined)
export const withNullsAsEmpty = <T>(arr: Array<T | null>): T[] => {
    const new_arr: T[] = new Array<T>(arr.length)
    arr.forEach((value, index) => {
        if (value) {
            new_arr[index] = value
        }
    })
    return new_arr
}

export const withoutFalsy = <T>(arr: Array<T>): T[] => arr.filter(Boolean)

export const getElementIndex = <T>(
    list: T[],
    match: (e: T) => boolean,
): number => {
    for (let i = 0; i < list.length; i++) {
        if (match(list[i])) {
            return i
        }
    }

    return -1
}

/* Returns every element inbetween, including both ends
 * In case one or more of the ends are not in the array, an empty array is returned
 */
export const sliceByElement = <T>(arr: T[], element1: T, element2: T): T[] => {
    const index1 = getElementIndex(arr, (o) => o === element1)
    const index2 = getElementIndex(arr, (o) => o === element2)
    if (index1 === -1 || index2 === -1) {
        return []
    }
    return arr.slice(Math.min(index2, index1), Math.max(index2, index1) + 1)
}
