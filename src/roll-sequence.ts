import { IRoll } from './roll';

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
            rolls: this._rolls
        };
    }
}