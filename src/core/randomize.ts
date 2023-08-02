
/**
 * Any generator of a number, that can be integer or float
 */
export type RandomGenerator = (bAsInt?: boolean) => number;

/**
 * The meta-core or RNG of this library
 * Generates a generator of randomness, based on initial params
 * @param min
 * @param max
 * @param bAsInt
 * @param seed
 * @param _seed
 */
export const randomize = (
    min: number = 0,
    max: number = 1,
    bAsInt: boolean = false,
    _seed: number | string | null = null        // TODO:: Experimental
): RandomGenerator => {
    if (min > max) {
        throw new Error("Min should be less than or equal to max!");
    }
    return (_bAsInt: boolean = false): number => {
        _bAsInt = bAsInt || _bAsInt;
        if (bAsInt) {
            return (Math.floor(Math.random() * (max - min + 1))) + min;
        } else {
            return (Math.random() * (max - min)) + min;
        }
    };
};
