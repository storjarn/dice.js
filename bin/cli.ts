#!/usr/bin/env node

/**
 */

const runAsBinary = !module.parent;

import { Dice } from '../src/dice';
import * as colors from 'colors';

const name = 'dice.js';

export const dice = new Dice();

let retVal = 0;

export async function cli(): Promise<number> {
    const args = process.argv.slice(2);
    if (!args.length) {
        usage();
        return 0;
    }
    switch (args.length) {
        case 1:
            //parseString
            retVal = dice.parseString(args[0]).value
            console.log(retVal);
            break;
        case 2:
            // <arg1>d<arg2>
            retVal = dice.roll(
                parseInt(args[0]),
                parseInt(args[1])
            ).value
            console.log(retVal);
            break;
        case 3:
            // <arg1>d<arg2> + <arg3>
            retVal = dice.roll(
                parseInt(args[0]),
                parseInt(args[1]),
                parseInt(args[2])
            ).value;
            console.log(retVal);
        default:
            usage();
    }
    return retVal;
}

function usage() {
    console.warn(colors.green(
        `
${colors.bold(colors.underline(name) + ' usage')}:

$ ${name} 2 6       # 2d6
$ ${name} 2 6 -1    # 2d6-1
$ ${name} 2d6m-1    # 2d6-1

`
    ));
}
async function main() {
    if (runAsBinary) {
        await cli();
        process.exit(0);
    }
}

main();
