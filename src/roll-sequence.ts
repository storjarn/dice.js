import { IRoll } from './roll';

export class RollSequence {
    private _rolls: IRoll[] = [];

    get value(): number {
        let retVal = 0;
        this._rolls.forEach((roll: IRoll) => {
            retVal += roll.value;
        });
        return retVal;
    }

    push(...args: IRoll[]): number {
        return this._rolls.push(...args);
    }
}