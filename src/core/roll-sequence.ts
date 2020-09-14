import { IRoll } from './roll';

/**
 * Represents multiple Rolls, as in more than one type of die.
 * Essentially an array of [[Rolls]].
 *
 * @export
 * @class RollSequence
 */
export class RollSequence {
    private _rolls: IRoll[] = [];

    public get value(): number {
        let retVal = 0;
        this._rolls.forEach((roll: IRoll) => {
            retVal += roll.value;
        });
        return retVal;
    }

    public push(...args: IRoll[]): number {
        return this._rolls.push(...args);
    }

    public toJSON() {
        return {
            rolls: this._rolls,
            value: this.value
        };
    }
}