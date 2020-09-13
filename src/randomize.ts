
export type RandomGenerator = () => number;

export const randomize = (min: number = 0, max: number = 1, bAsInt: boolean = false): RandomGenerator => {
    if (min > max) {
        throw new Error("Min should be less than or equal to max!");
    }
    return (): number => {
        if (bAsInt) {
            return (Math.floor(Math.random() * (max - min + 1))) + min;
        } else {
            return (Math.random() * (max - min)) + min;
        }
    };
};
