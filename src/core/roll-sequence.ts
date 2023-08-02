import { IRoll } from "./roll";

/**
 * Represents multiple Rolls, as in more than one type of die.
 * Essentially an array of [[IRoll]].
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

    public constructor(...args: IRoll[]) {
        if (!Array.isArray(args)) {
            args = [args];
        }
        this.push(...args);
    }

    public push(...args: IRoll[]): number {
        return this._rolls.push(...args);
    }

    public clear(): void {
        this._rolls = [];
    }

    public toJSON() {
        return {
            rolls: this._rolls,
            value: this.value
        };
    }
}