import { randomize } from './randomize';

/**
 * Represents the parameters of a Roll
 */
export interface IDieOptions {
    /**
     * The number of dice to roll
     *
     * @type {number}
     * @memberof IDieOptions
     */
    numberOfDie: number;
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

export interface IRoll {
    multiple: number;
    typeOfDie: number;
    modifier: number;
    value: number;
}

export class Roll implements IRoll {
    private _multiple = 1;
    private _typeOfDie = 6;
    private _modifier = 0;
    private _value = 0;

    get multiple(): number {
        return this._multiple;
    }

    get typeOfDie(): number {
        return this._typeOfDie;
    }

    get modifier(): number {
        return this._modifier;
    }

    get value(): number {
        return this._value;
    }

    valueOf() {
        return this.value;
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
            this._value += result;
        }
        this._value += this.modifier;
    }
}