import { RandomGenerator, randomize } from "./randomize";
import { IDieOptions, Roll } from "./roll";

export class Dice {

    public PARSESTRING_USAGE_MSG = `Usage: pass the number of dice, type of dice, and modifier like so: 2d6m-8
    example: parseString('2d6m-8') or parseString('3d6')`;

    public get defaults(): IDieOptions {
        return {
            numberOfDie: 1,
            typeOfDie: 6,
            modifier: 0
        };
    }

    public random(
        min: number = 0,
        max: number = 1,
        bAsInt: boolean = false
    ): number {
        return this.generateRandomizer(min, max, bAsInt)();
    }

    public generateRandomizer(
        min: number = 0,
        max: number = 1,
        bAsInt: boolean = false
    ): RandomGenerator {
        return randomize(min, max, bAsInt);
    }

    public d(typeOfDie: number, modifier: number = 0): Roll {
        return new Roll(1, typeOfDie, modifier);
    }

    public roll(
        multiple: number = 1,
        typeOfDie: number = 6,
        modifier: number = 0
    ) {
        return new Roll(multiple, typeOfDie, modifier);
    }

    public parseString(str: string): Roll {
        if (!!str && str.indexOf("d") > -1) {
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
            throw new Error(this.PARSESTRING_USAGE_MSG);
        }
    }
}
