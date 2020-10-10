import { randomize } from './randomize';

/**
 * Represents the parameters of a Roll
 */
export interface IRollOptions {
    /**
     * The number of dice to roll
     *
     * @type {number}
     * @memberof IDieOptions
     */
    multiple: number;
    /**
     * The type of die to roll
     *
     * @type {number}
     * @memberof IDieOptions
     */
    typeOfDie: number;
    /**
     * The modifier to add to the total
     *
     * @type {number}
     * @memberof IDieOptions
     */
    modifier: number;
}

/**
 * Defines a handful of one type/side of dice
 * Example 3 6-sided, or 2 10-sided dice.
 * Includes metrics.
 *
 * @export
 * @interface IRoll
 */
export interface IRoll extends IRollOptions {
    /**
     * Calculated value for this roll
     *
     * @type {number}
     * @memberof IRoll
     */
    value: number;
    /**
     * Each raw roll from the randomizer
     *
     * @type {number[]}
     * @memberof IRoll
     */
    die: number[];
    /**
     * The calculated minimum value
     *
     * @type {number}
     * @memberof IRoll
     */
    min: number;
    /**
     * The calculated maximum value for this roll
     *
     * @type {number}
     * @memberof IRoll
     */
    max: number;
}

/**
 * Implementation of an IRoll at it's basest functionality
 * Calculates a handful of similarly-sided die.
 *
 * @export
 * @class Roll
 * @implements {IRoll}
 */
export class SidedRoll implements IRoll {
    private _multiple = 1;
    private _typeOfDie = 6;
    private _modifier = 0;
    private _value = 0;
    private _die: number[] = [];

    get multiple(): number {
        return this._multiple;
    }

    get typeOfDie(): number {
        return this._typeOfDie;
    }

    get modifier(): number {
        return this._modifier;
    }

    get die(): number[] {
        return this._die;
    }

    get value(): number {
        return this._value;
    }

    get min(): number {
        return this.multiple + this.modifier;
    }

    get max(): number {
        return this.multiple * this.typeOfDie + this.modifier;
    }

    valueOf() {
        return this.value;
    }

    toJSON(): IRoll {
        return {
            multiple: this.multiple,
            typeOfDie: this.typeOfDie,
            modifier: this.modifier,
            value: this.value,
            die: this.die,
            min: this.min,
            max: this.max
        };
    }

    constructor(_multiple: number = 1, _typeOfDie: number = 6, _modifier: number = 0) {
        this._multiple = _multiple;
        this._modifier = _modifier;
        this._typeOfDie = _typeOfDie;

        this._findValue();
    }

    private _findValue() {
        for (let i = 1; i < this.multiple + 1; ++i) {
            const result = randomize(1, this.typeOfDie, true)();
            this._die.push(result);
            this._value += result;
        }
        this._value += this.modifier;
    }
}