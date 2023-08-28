import { assert } from 'chai'
import {
    cachedInArray,
    getElementIndex,
    getRange,
    groupArray,
    inArray,
    sliceByElement,
    tranformIntoCachedInArray,
    withNullsAsEmpty,
    withoutFalsy,
    withoutTheBools,
    withoutTheUndefined,
} from '../../../lib/utilities/arrayUtils'

describe('getRange', () => {
    it('should return array with correct number of entries', () => {
        assert.deepEqual(getRange(0), [])
        assert.deepEqual(getRange(4), [0, 1, 2, 3])
    })
    it('should return empty array for negative range', () => {
        assert.deepEqual(getRange(-10), [])
    })
})
describe('getRange with start and end arguments', () => {
    it('should return array with correct number of entries', () => {
        assert.deepEqual(getRange(3, 4), [3])
        assert.deepEqual(getRange(2, 6), [2, 3, 4, 5])
    })
    it('should return empty array if start is greater than end', () => {
        assert.deepEqual(getRange(2, 1), [])
        assert.deepEqual(getRange(-3, -4), [])
    })
    it('should handle negative numbers', () => {
        assert.deepEqual(getRange(-3, 0), [-3, -2, -1])
        assert.deepEqual(getRange(-1, 3), [-1, 0, 1, 2])
    })
    it('should have same effect as slicing a bigger "simple range"', () => {
        assert.deepEqual(getRange(3, 14), getRange(20).slice(3, 14))
    })
})

describe('inArray', () => {
    it('returns true for values in array', () => {
        assert.isTrue(inArray([1, 2, 3], 1))
        assert.isTrue(inArray(['1', 2, 3], '1'))
        assert.isTrue(inArray(['asdf', 'gh', 'jkl'], 'gh'))
        const obj = { a: true }
        assert.isTrue(inArray([obj, []], obj))
    })

    it('returns false for values not array', () => {
        assert.isFalse(inArray([1, 2, 3], 4))
        assert.isFalse(inArray(['1', 2, 3], 1))
        assert.isFalse(inArray(['1', 2, 3], '2'))
        assert.isFalse(inArray(['asdf', 'gh', 'jkl'], 'as'))
        assert.isFalse(inArray([{ a: true }, []], { a: true }))
    })
})

describe('cachedInArray', () => {
    it('returns function can check if element is in cached array', () => {
        const numInArray = cachedInArray([1, 2, 3])
        assert.isTrue(numInArray(1))
        assert.isFalse(numInArray(4))

        const strInArray = cachedInArray(['asdf', 'gh', 'jkl'])
        assert.isTrue(strInArray('gh'))
        assert.isFalse(strInArray('not'))
    })
})

describe('tranformIntoCachedInArray', () => {
    type SimpleValue = { val1: number; val2: number; someString: string }
    const data: SimpleValue[] = [
        { val1: 5, val2: 6, someString: 'taco' },
        { val1: 10, val2: 20, someString: 'bell' },
    ]
    const generator = (item: SimpleValue) => item.val1 + item.val2

    it('returns function can check if transformed element is in cached array', () => {
        const checkByValue = tranformIntoCachedInArray(data, generator)

        assert.isTrue(checkByValue({ val1: 5, val2: 6, someString: 'cookie' }))
        assert.isFalse(checkByValue({ val1: 3, val2: 80, someString: 'red' }))

        const checkByOtherValue = tranformIntoCachedInArray(
            data,
            (item: SimpleValue) => item.someString,
        )
        assert.isTrue(
            checkByOtherValue({ val1: 4, val2: 2, someString: 'taco' }),
        )
        assert.isFalse(
            checkByOtherValue({ val1: 4, val2: 2, someString: 'red' }),
        )
    })
})

describe('getElementIndex', () => {
    it('returns first matched item index in array', () => {
        const match = (e: number) => e === 2
        assert.equal(getElementIndex([1, 2, 3, 2], match), 1)
    })

    it('returns -1 if there is no match in array', () => {
        const match = (e: number) => e === 0
        assert.equal(getElementIndex([1, 2, 3], match), -1)
    })
})

describe('groupArray', () => {
    it('groups arrays', () => {
        assert.deepEqual(
            groupArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (n) =>
                n % 2 === 1 ? 'odd' : 'even',
            ),
            {
                odd: [1, 3, 5, 7, 9],
                even: [2, 4, 6, 8, 10],
            },
        )
    })
})

describe('sliceByElement', () => {
    const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    it('Slice test arrays', () => {
        assert.deepEqual(
            sliceByElement(oneToTen, 4, 10),
            [4, 5, 6, 7, 8, 9, 10],
        )
        assert.deepEqual(sliceByElement(oneToTen, 10, 10), [10])
        assert.deepEqual(sliceByElement(oneToTen, 1, 10), oneToTen)
    })
    it('If elements are not in array', () => {
        assert.deepEqual(sliceByElement(oneToTen, -100, -100), [])
        assert.deepEqual(sliceByElement(oneToTen, 0, -1), [])
        assert.deepEqual(sliceByElement(oneToTen, 4, 500), [])
    })
})

describe('withNullAsEmpty', () => {
    it('Returns a new array without the null values', () => {
        const array = [null, 1, undefined, 2, null]
        const expected = new Array(array.length)
        expected[1] = 1
        expected[2] = undefined
        expected[3] = 2
        const actual = withNullsAsEmpty(array)
        assert.deepEqual(actual, expected)
        assert.deepEqual(actual.length, array.length)
    })
})

describe('withoutTheBools', () => {
    it('Returns a new array without the Boolean values', () => {
        const testFn = () => undefined
        const array = [null, 0, 1, undefined, 2, true, [], {}, testFn, false]
        const expected = [null, 0, 1, undefined, 2, [], {}, testFn]

        const actual = withoutTheBools(array)
        assert.deepEqual(actual, expected)
    })
})

describe('withoutTheUndefined', () => {
    it('Returns a new array without the Boolean values', () => {
        const testFn = () => undefined
        const array = [null, 0, 1, undefined, 2, true, [], {}, testFn, false]
        const expected = [null, 0, 1, 2, true, [], {}, testFn, false]

        const actual = withoutTheUndefined(array)
        assert.deepEqual(actual, expected)
    })
})

describe('withoutFalsy', () => {
    it('Returns a new array without the falsy values', () => {
        const testFn = () => undefined
        const array = [
            null,
            NaN,
            '',
            'testing',
            0,
            1,
            undefined,
            2,
            true,
            [],
            {},
            testFn,
            false,
        ]
        const expected = ['testing', 1, 2, true, [], {}, testFn]

        const actual = withoutFalsy(array)
        assert.deepEqual(actual, expected)
    })
})
