#!/usr/bin/env node

/**
 * Runs the library parse and/or calculate functions
 * to randomize numbers based on the concept of a
 * handful of die.
 */

const runAsBinary = !module.parent;

import { Dice } from '../src/core/dice';
import { underline as _, bold as B, italic as i, green as g } from 'colors';

import * as pkg from '../package.json';
import { RollSequence } from '../src';

const name = pkg.name;
const version = pkg.version;
const desc = pkg.description;

const bin = 'dice';

export const dice = new Dice();

const retVal: RollSequence = new RollSequence();

let isJSON = false;
let isPretty = false;

export async function cli(): Promise<number> {
    retVal.clear();

    const args = process.argv.slice(2);

    if (!args.length || args.includes('--help')) {
        usage();
        return 0;
    }

    findJSONarg(args);
    findPrettyArg(args);

    switch (args.length) {
        case 1:
            //parseString
            retVal.push(dice.parseString(args[0]));
            display(retVal);
            break;
        case 2:
            if (
                dice.isDiceString(args[0])
                && dice.isDiceString(args[1])
            ) {
                const roll1 = dice.parseString(args[0]);
                const roll2 = dice.parseString(args[1]);
                retVal.push(roll1, roll2);
            } else {
                // <arg1>d<arg2>
                retVal.push(
                    dice.roll(
                        parseInt(args[0]),
                        parseInt(args[1])
                    )
                );
            }

            display(retVal);
            break;
        case 3:
            if (
                dice.isDiceString(args[0])
                && dice.isDiceString(args[1])
                && dice.isDiceString(args[2])
            ) {
                const roll1 = dice.parseString(args[0]);
                const roll2 = dice.parseString(args[1]);
                const roll3 = dice.parseString(args[2]);
                retVal.push(roll1, roll2, roll3);
            } else {
                // <arg1>d<arg2> + <arg3>
                retVal.push(
                    dice.roll(
                        parseInt(args[0]),
                        parseInt(args[1]),
                        parseInt(args[2])
                    )
                );
            }

            display(retVal);
            break;
        default:
            const testArgs = args.filter((item: string) => !dice.isDiceString(item));
            if (testArgs.length) {
                usage();
            } else {
                args.forEach(
                    (arg: string) => {
                        const val = dice.parseString(arg);
                        retVal.push(val);
                    }
                );
                display(retVal);
            }
            break;
    }
    return retVal.value;
}

export function usage() {
    console.warn(g(
        `
${B(name + i(' v' + version))}

${i(_('Description'))}: ${desc}

${i(_('Usage'))}:

    > ${bin} 2 6                                        # 2d6
    > ${bin} 2 6 -1                                     # 2d6-1
    > ${bin} 2d6m-1                                     # 2d6-1
    > ${bin} 1d6 2d8 3d10 4d12 5d14 6d16 7d18 8d20m-1

`
    ));
}

function display(seq: RollSequence) {
    if (isJSON) {
        console.log(JSON.stringify(seq, null, isPretty ? 4 : 0));
    } else {
        console.log(seq.value);
    }
}

function findJSONarg(args: string[]) {
    if (args.includes('--json')) {
        isJSON = true;
        args.splice(args.indexOf('--json'), 1);
    }
    if (args.includes('-J')) {
        isJSON = true;
        args.splice(args.indexOf('-J'), 1);
    }
}
function findPrettyArg(args: string[]) {
    if (args.includes('--pretty')) {
        findJSONarg(args);
        isPretty = true;
        args.splice(args.indexOf('--pretty'), 1);
    }
}

async function main() {
    if (runAsBinary) {
        await cli();
        process.exit(0);
    }
}

main();
