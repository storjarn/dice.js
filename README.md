# @postdawn/dice.js

> random number generator and dice simulator

## Installation

This package can be used as a library in your application, or as a cli command on your system.

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

Import the class into your project like so:

```typescript
import { Dice, Roll } from '@postdawn/dice.js';
// ...
const dice = new Dice();
const roll1: Roll = dice.parseString("2d8-1");          // some value equal to or between 1 and 15
const roll2 = new Roll(2, 3);                           // some value equal to or between 2 and 6
const roll3 = dice.d(3);                                // some value equal to or between 1 and 3
const value = roll1.value + roll2.value - roll3.value;  // some value equal to or between 0 and 18
```

### As a command-line binary:

Then you can use it on your terminal like so:

```bash
$ dice 2 6          # 2d6
```

OR

```bash
$ dice 2 6 -1       # 2d6-1
```

OR

```bash
$ dice 2d6          # 2d6
```

OR

```bash
$ dice 2d6m-1       # 2d6-1
```