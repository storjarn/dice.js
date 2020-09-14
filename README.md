# @postdawn/dice.js

> simple or sequenced RNG (random number generator) API and dice simulator

---

## Installation

This package can be used as a library in your application, or as a cli command on your system.

---

### As a library:

```bash
$ npm install --save @postdawn/dice.js
```

### As a command-line binary:

```bash
$ npm install -g @postdawn/dice.js
```

## Usage

### As a library:

Import the `Dice` class (and any supporting type classes) into your project like so:

```typescript
import { Dice, Roll } from '@postdawn/dice.js';
// ...
const dice = new Dice();
// ...
const val: number = dice.roll(3, 6, -2).value;          // some integer equal to or between 1 and 16, i.e. 3d6-2
// ...
const randNum: number = dice.random(3, 18);             // some float equal to or between 3 and 18, rand(3, 18)
// ...
const randInt: number = dice.random(3, 18, true);       // some integer equal to or between 3 and 18, i.e. 3d6
// ...
const r1: Roll = dice.parseString("2d8m-1");            // some integer equal to or between 1 and 15, i.e. 2d8-1
const r2: Roll = new Roll(2, 3);                        // some integer equal to or between 2 and 6, i.e. 2d3
const r3: Roll = dice.d(3);                             // some integer equal to or between 1 and 3, i.e. 1d3
const value: number = r1.value + r2.value - r3.value;   // some integer equal to or between 0 and 18
```

### As a command-line binary:

You can use it on your terminal like so:

```bash
$ dice 2 6                  # 2d6
```

OR

```bash
$ dice 2 6 -1               # 2d6-1
```

OR

```bash
$ dice 2d6                  # 2d6
```

OR

```bash
$ dice 2d6m-1               # 2d6-1
```

OR

```bash
$ dice 1d6 2d6 3d6 4d6      # some integer equal to or between 9 and 60, i.e. 1-6 + 2-12 + 3-18 + 4-24
```

OR

```bash
$ dice 1d6 2d6m-1            # some integer equal to or between 2 and 17, i.e. 1-6 + 1-11
```

You can even pass `--json`, and also `--pretty`, to get CLI data to feed to other applications.

```bash
$ dice 2d6 3d6 4d6m-2 --json --pretty
{
    "rolls": [
        {
            "multiple": 2,
            "typeOfDie": 6,
            "modifier": 0,
            "value": 5,
            "die": [
                2,
                3
            ]
        },
        {
            "multiple": 3,
            "typeOfDie": 6,
            "modifier": 0,
            "value": 10,
            "die": [
                2,
                5,
                3
            ]
        },
        {
            "multiple": 4,
            "typeOfDie": 6,
            "modifier": -2,
            "value": 11,
            "die": [
                5,
                3,
                1,
                4
            ]
        }
    ]
}
```