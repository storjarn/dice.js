import { RandomGenerator, randomize } from "./randomize";
import { IRollOptions, Roll } from "./roll";

/**
 * [[include://test.md]]
 *
 * @export
 * @class Dice
 */
export class Dice {

    /**
     * Default error message using parseString()
     *
     * @memberof Dice
     */
    public PARSESTRING_USAGE_MSG = `Usage: pass the number of dice, type of dice, and modifier like so: 2d6m-8
    \n\texample: parseString('2d6m-8') or parseString('3d6')\n`;

    /**
     * Default dice handful
     *
     * @readonly
     * @type {IRollOptions}
     * @memberof Dice
     */
    public get defaults(): IRollOptions {
        return {
            multiple: 1,
            typeOfDie: 6,
            modifier: 0
        };
    }

    /**
     * A random number, defaults to integers (third argument).
     * Third argument (default: true) true means return an integer,
     * otherwise return a float.
     * Usage: random(1) => an integer equal to or between 1 and 100
     * Usage: random(0, 1, false) => a float equal to or between 0 and 1
     *
     * @param {number} [min=0]
     * @param {number} [max=100]
     * @param {boolean} [bAsInt=true]
     * @returns {number}
     * @memberof Dice
     */
    public random(
        min: number = 0,
        max: number = 100,
        bAsInt: boolean = true
    ): number {
        return this.randomize(min, max, bAsInt)();
    }

    /**
     * A random function generator, defaults to floats (third argument).
     * Third argument (default: false) false means return an float,
     * otherwise return a integer.
     *
     * @param {number} [min=0]
     * @param {number} [max=1]
     * @param {boolean} [bAsInt=false]
     * @returns {RandomGenerator}
     * @memberof Dice
     */
    public randomize(
        min: number = 0,
        max: number = 1,
        bAsInt: boolean = false
    ): RandomGenerator {
        return randomize(min, max, bAsInt);
    }

    /**
     * A single die roll, with optional modifier.
     * Ex: d(10)        # 1d10
     * Ex: d(12, 6)     # 1d12+6, 1d12m6
     *
     * @param {number} typeOfDie
     * @param {number} [modifier=0]
     * @returns {Roll}
     * @memberof Dice
     */
    public d(typeOfDie: number, modifier: number = 0): Roll {
        return new Roll(1, typeOfDie, modifier);
    }

    /**
     * Basic Roll generator function.
     *
     * @param {number} [multiple=1]
     * @param {number} [typeOfDie=6]
     * @param {number} [modifier=0]
     * @returns
     * @memberof Dice
     */
    public roll(
        multiple: number = 1,
        typeOfDie: number = 6,
        modifier: number = 0
    ) {
        return new Roll(multiple, typeOfDie, modifier);
    }

    /**
     * String test for dice string format
     *
     * @param {string} str
     * @returns {boolean}
     * @memberof Dice
     */
    public isDiceString(str: string): boolean {
        return !!str && str.indexOf("d") > -1;
    }

    /**
     * Juggernaut parser
     * Checks if isDiceString() first
     *
     * @param {string} str
     * @returns {Roll}
     * @memberof Dice
     */
    public parseString(str: string): Roll {
        if (this.isDiceString(str)) {
            const dSplit = str.split("d");
            const sMultiple = dSplit[0] || "1";
            let sTypeOfDie = dSplit[1];
            let sModifier = "0";
            if (sTypeOfDie.indexOf("m") > -1) {
                const modSplit = sTypeOfDie.split("m");
                sTypeOfDie = modSplit[0];
                if (modSplit.length > 1) {
                    sModifier = modSplit[1];
                } else {
                    sModifier = "0";
                }
            }
            const multiple = parseInt(sMultiple);
            const typeOfDie = parseInt(sTypeOfDie);
            const modifier = parseInt(sModifier);

            if (isNaN(multiple)) {
                throw new Error("The number of dice is not a number!");
            } else if (isNaN(typeOfDie)) {
                throw new Error("The type of dice is not a number!");
            } else if (isNaN(modifier)) {
                throw new Error("The modifier is not a number!");
            } else {
                return new Roll(multiple, typeOfDie, modifier);
            }
        } else {
            throw new Error(`${this.PARSESTRING_USAGE_MSG}: \n\n${str}\n\n`);
        }
    }
}
